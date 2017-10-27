package info.dia.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.mysema.query.BooleanBuilder;

import info.dia.authentication.IAuthenticationFacade;
import info.dia.event.AssignmentEmailNotificationEvent;
import info.dia.persistence.dao.AssignmentRepository;
import info.dia.persistence.dao.AssignmentStudentRepository;
import info.dia.persistence.dao.GroupRepository;
import info.dia.persistence.dao.RoleRepository;
import info.dia.persistence.dao.UserRepository;
import info.dia.persistence.model.Assignment;
import info.dia.persistence.model.AssignmentStudent;
import info.dia.persistence.model.QAssignment;
import info.dia.persistence.model.Role;
import info.dia.persistence.model.User;
import info.dia.web.dto.AssignmentDto;
import info.dia.web.dto.AssignmentInfoDto;
import info.dia.web.dto.SearchDTO;
import info.dia.web.error.AssignmentTitleAlreadyExistsByUserException;
import info.dia.web.util.AssignmentMapper;



@Service
@Transactional
public class AssignmentService implements IAssignmentService{
	
	private final Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private AssignmentRepository assignmentRepository;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
    private IAuthenticationFacade authenticationFacade;
	
	@Autowired
	private GroupRepository groupRepository;
	
	@Autowired
	private AssignmentStudentRepository  assignmentStudentRepository;
	
	
	@Autowired 
	private EmailService emailService;
	
	
	@Autowired
	private ApplicationEventPublisher eventPublisher;
	
	
	@Autowired
    private RoleRepository roleRepository;
	
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	
	@Autowired
    private UserRepository userRepository;
	

	@Override
	public void saveAssignment(AssignmentDto assignmentDto) {
		
		Authentication authentication = authenticationFacade.getAuthentication();
		
    	if (!(authentication instanceof AnonymousAuthenticationToken)) {
    		
    		User assignmentUser = userService.findUserByEmail(authentication.getName());
    		
    		if (assignmentDto.getId()!=0) {
    			
    			Assignment assignment = assignmentRepository.findOne(assignmentDto.getId());
    			
    			/*LOGGER.info("assignment status :"+assignment.getStatus());*/
    			
    			List<User> sendEmailUserList = new ArrayList<User>();
    			
    			List<User> newEmailUserList = new ArrayList<User>();
    			
    			assignment.setTitle(assignmentDto.getTitle());
    			assignment.setSession(assignmentDto.getSession());
    			assignment.setInstructions(assignmentDto.getInstructions());
    			assignment.setUser(assignmentUser);
    			assignment.setSubmitStartDate(assignmentDto.getSubmitStartDate());
    			assignment.setSubmitEndDate(assignmentDto.getSubmitEndDate());
    			
    			Set<AssignmentStudent>  assignmentStudents= new HashSet<AssignmentStudent>();
    			
    			if (!StringUtils.isEmpty(assignmentDto.getEmailsTo())) {
    				
    				List<String> emailList = Arrays.asList(assignmentDto.getEmailsTo().split("\\s*,\\s*"));
        			
        			for (String email : emailList) {
        				
        				AssignmentStudent existsAssignmentStudent = assignmentStudentRepository.findByEmailAndAssignmentId(email,assignmentDto.getId());
        				
        				if (existsAssignmentStudent!=null) {
        					
        					User existsAssignmentUser = userService.findUserByEmail(existsAssignmentStudent.getEmail());
        					sendEmailUserList.add(existsAssignmentUser);
        					
        					if (!existsAssignmentStudent.isDateChange()) {
        						existsAssignmentStudent.setSubmitStartDate(assignmentDto.getSubmitStartDate());
        						existsAssignmentStudent.setSubmitEndDate(assignmentDto.getSubmitEndDate());
							}
        					assignmentStudents.add(existsAssignmentStudent);
						}else {
							
							AssignmentStudent assignmentStudent = new AssignmentStudent();
	        				
	        				User user = userService.findUserByEmail(email);
							if (user!=null) {
								sendEmailUserList.add(user);
								assignmentStudent.setEmail(user.getEmail());
							}else {
								User createUser = createUserIfNotFound(email);
								sendEmailUserList.add(createUser);
								assignmentStudent.setEmail(createUser.getEmail());
							}
							
							assignmentStudent.setAssignment(assignment);
	        				assignmentStudent.setSubmitStartDate(assignmentDto.getSubmitStartDate());
	        				assignmentStudent.setSubmitEndDate(assignmentDto.getSubmitEndDate());
	        				
	        				AssignmentStudent student = assignmentStudentRepository.findByEmailAndAssignment(email, assignment);
	        				if (student!=null) {
	        					assignmentStudent.setId(student.getId());
	    					}
	        				
	        				assignmentStudents.add(assignmentStudent);
						}
        				
    				}
    			}
    			
    			Set<AssignmentStudent>  deletedAssignmentStudents= new HashSet<AssignmentStudent>();
    			
    			for (AssignmentStudent existsAssignmentStudent : assignment.getAssignmentStudents()) {
    				
    				boolean result = isObjectInSet(existsAssignmentStudent,assignmentStudents);
    				/*LOGGER.info("Contains :"+existsAssignmentStudent.getEmail()+"--->"+result);*/
    				if (!result) {
    					AssignmentStudent deletedAssignmentStudent = assignmentStudentRepository.findByEmailAndAssignment(existsAssignmentStudent.getEmail(),assignment);
    					/*LOGGER.info("deletedAssignmentStudent :"+deletedAssignmentStudent.getId()+"--->"+deletedAssignmentStudent.getEmail());*/
    					deletedAssignmentStudents.add(deletedAssignmentStudent);
					}
				}
    			
    			/*LOGGER.info("Deleted AssignmentStudents Size :"+deletedAssignmentStudents.size());*/
    			for (AssignmentStudent deletedAssignmentStudent : deletedAssignmentStudents) {
    				assignmentStudentRepository.delete(deletedAssignmentStudent);
				}
    			
    			
    			assignment.setStatus(assignmentDto.getStatus());
    			assignment.setAssignmentStudents(assignmentStudents);
    			assignmentRepository.save(Arrays.asList(assignment));
    			LOGGER.info(" Update assignment "+assignment.getTitle());
    			
    			// Sent email
    			if (assignment.getStatus()==false && assignmentDto.getStatus()==true) {
    				
    				/*LOGGER.info("Assignment Status in 1st: "+assignmentDto.getStatus()+"---->"+assignment.getStatus());*/
					try {
						emailService.sendAssignmentNotification(sendEmailUserList,assignmentDto,assignmentUser);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
    				/*eventPublisher.publishEvent(new AssignmentEmailNotificationEvent(sendEmailUserList, assignmentDto, assignmentUser));*/
					
				}else if (assignment.getStatus()==true) {
					
					LOGGER.info("Assignment Status in 2nd:"+assignmentDto.getStatus());
					
					for (AssignmentStudent assignmentStudent : assignmentStudents) {
						
						/*LOGGER.info("Assignment Status: "+assignmentStudent.getEmail());*/
						
	    				boolean result = isObjectInSet(assignmentStudent,assignment.getAssignmentStudents());
	    				
	    				if (!result) {
							User newEmailuser = userService.findUserByEmail(assignmentStudent.getEmail());
							LOGGER.info("Newly sent email user :"+newEmailuser.getEmail()+"--->"+result);
							if (newEmailuser!=null) {
								newEmailUserList.add(newEmailuser);
							}
						}
					}
					
					if (newEmailUserList.size()>0) {
						LOGGER.info("New Entry Email size :"+newEmailUserList.size());
						try {
							emailService.sendAssignmentNotification(newEmailUserList,assignmentDto,assignmentUser);
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						/*eventPublisher.publishEvent(new AssignmentEmailNotificationEvent(newEmailUserList, assignmentDto, assignmentUser));*/
					}
				}
    			
			}else {
				
				if (assignmentTitleByUserExist(assignmentUser, assignmentDto.getTitle())) {
					throw new AssignmentTitleAlreadyExistsByUserException("Assignment title already exists with "+assignmentUser.getEmail());
				}
				
				
				Assignment assignment = new Assignment();
				
				assignment.setTitle(assignmentDto.getTitle());
				assignment.setSession(assignmentDto.getSession());
				assignment.setSubmitStartDate(assignmentDto.getSubmitStartDate());
				assignment.setSubmitEndDate(assignmentDto.getSubmitEndDate());
				assignment.setInstructions(assignmentDto.getInstructions());
				assignment.setCreateDate(new Date());
				assignment.setUser(assignmentUser);
				assignment.setStatus(assignmentDto.getStatus());
				
				List<User> sendEmailUserList = new ArrayList<User>();
				
				
				Set<AssignmentStudent> assignmentEmails = new HashSet<AssignmentStudent>();
				
				if (!StringUtils.isEmpty(assignmentDto.getEmailsTo())) {
					
					List<String> emailList = Arrays.asList(assignmentDto.getEmailsTo().split("\\s*,\\s*"));
					
					for (String email : emailList) {
						
						AssignmentStudent assignmentStudent = new AssignmentStudent();
						
						User user = userService.findUserByEmail(email);
						
						if (user!=null) {
							sendEmailUserList.add(user);
							assignmentStudent.setEmail(user.getEmail());
						}else {
							
							User createUser = createUserIfNotFound(email);
							sendEmailUserList.add(createUser);
							assignmentStudent.setEmail(createUser.getEmail());
							
						}
						
						assignmentStudent.setAssignment(assignment);
						assignmentStudent.setSubmitStartDate(assignmentDto.getSubmitStartDate());
						assignmentStudent.setSubmitEndDate(assignmentDto.getSubmitEndDate());
						
						assignmentEmails.add(assignmentStudent);
						
					}
					
				}
				assignment.setAssignmentStudents(assignmentEmails);
				assignmentRepository.save(Arrays.asList(assignment));
				LOGGER.info(" Add assignment "+assignment.getTitle());
				
				// Sent email
				if (assignmentDto.getStatus()==true) {
					try {
						emailService.sendAssignmentNotification(sendEmailUserList,assignmentDto,assignmentUser);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					/*eventPublisher.publishEvent(new AssignmentEmailNotificationEvent(sendEmailUserList,assignmentDto,assignmentUser));*/
				}
			}
    	}
	}
	

	@Override
	public List<AssignmentInfoDto> findByUser(User user, Pageable pageable) {

		Authentication authentication = authenticationFacade.getAuthentication();

		List<AssignmentInfoDto> assignmentInfoDtos = null;

    	if (!(authentication instanceof AnonymousAuthenticationToken)) {
    		
    		User assignmentUser = userService.findUserByEmail(authentication.getName());
    		
    		Page<Assignment> assignments = assignmentRepository.findAllByUser(assignmentUser,pageable);

			assignmentInfoDtos = AssignmentMapper.map(assignments);

    	}

		return assignmentInfoDtos;
	}


		
	boolean isObjectInSet(AssignmentStudent object, Set<AssignmentStudent> set) {
		
		   boolean result = false;

		   for(AssignmentStudent o : set) {
		     if(o.getEmail().equalsIgnoreCase(object.getEmail())) {
		       result = true;
		       break;
		     }
		   }

		   return result;
	}

	@Override
	public Page<Assignment> searchRequests(User user, SearchDTO searchDTO, Pageable p) {
		
		BooleanBuilder b = new BooleanBuilder();

		QAssignment qAssignment = QAssignment.assignment;

		if (searchDTO != null) {
			
			if (!StringUtils.isEmpty(searchDTO.getSearchString()) && searchDTO.getAssignmentStatus()!=null) {
				b = b.and(qAssignment.title.containsIgnoreCase(searchDTO.getSearchString())
						.or(qAssignment.session.containsIgnoreCase(searchDTO.getSearchString()))
						.or(qAssignment.status.eq(searchDTO.getAssignmentStatus()))
						.and(qAssignment.user.id.eq(user.getId())));
				/*LOGGER.info(" String and Boolean.............");*/
			}else if (!StringUtils.isEmpty(searchDTO.getSearchString())) {
				b = b.and(qAssignment.title.containsIgnoreCase(searchDTO.getSearchString())
						.or(qAssignment.session.containsIgnoreCase(searchDTO.getSearchString()))
						.and(qAssignment.user.id.eq(user.getId())));
				/*LOGGER.info("String.............");*/
			}else if (searchDTO.getAssignmentStatus()!=null) {
				b = b.and(qAssignment.status.eq(searchDTO.getAssignmentStatus()))
						.and(qAssignment.user.id.eq(user.getId()));
				
				/*LOGGER.info("Boolean.............");*/
				
			}else {
				/*LOGGER.info("Nothing.............");*/
				b = b.and(qAssignment.user.id.eq(user.getId()));
			}
		}
		
		LOGGER.info("user email :"+user.getEmail()+" Search Find :"+assignmentRepository.findAll(b, p).getTotalElements());
		
		return assignmentRepository.findAll(b, p);
	}
	
	private User createUserIfNotFound(String email){
		
		final Role studentRole = roleRepository.findByName("ROLE_STUDENT");
        final User user = new User();
        /*user.setFirstName("Student");*/
        /*user.setLastName("Test");*/
        user.setPassword(passwordEncoder.encode(email));
        user.setEmail(email);
        user.setRoles(Arrays.asList(studentRole));
        user.setEnabled(true);
        userRepository.save(user);
		
		return user;
	}
	
	
	private boolean emailExist(final String email) {
        final User user = userService.findUserByEmail(email);
        if (user != null) {
            return true;
        }
        return false;
    }
	
	private boolean assignmentTitleByUserExist(User user,final String title){
    	final Assignment assignment = assignmentRepository.findByUserAndTitleIgnoreCase(user, title);
    	if (assignment!=null) {
			return true;
		}
    	return false;
    }


	@Override
	public Assignment getAssignmentByIdAndUser(long id, long userId) {
		return assignmentRepository.findByIdAndUserId(id, userId);
	}


	@Override
	public Assignment findByUserAndTitleIgnoreCase(User user, String title) {
		return assignmentRepository.findByUserAndTitleIgnoreCase(user, title);
	}


	@Override
	public Assignment getAssignmentById(long assignmentId) {
		return assignmentRepository.findOne(assignmentId);
	}


	@Override
	public int countByUserId(long userId) {
		// TODO Assignment count by user
		return assignmentRepository.countByUserId(userId);
	}


	@Override
	public int countByUserIdAndStatusTrue(long userId) {
		// TODO Assignment count by user and true
		return assignmentRepository.countByUserIdAndStatusTrue(userId);
	}


	@Override
	public int countByUserIdAndStatusFalse(long userId) {
		// TODO Assignment count by user and false
		return assignmentRepository.countByUserIdAndStatusFalse(userId);
	}


	@Override
	public Page<Assignment> getAllAssignmentByUserAndStatus(User user, boolean status, Pageable pageable) {
		// TODO Assignments by User and Status
		return assignmentRepository.findAllByUserAndStatus(user, status, pageable);
	}

}
