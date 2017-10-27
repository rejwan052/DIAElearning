package info.dia.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.mysema.query.BooleanBuilder;

import info.dia.persistence.dao.AssignmentStudentRepository;
import info.dia.persistence.model.Assignment;
import info.dia.persistence.model.AssignmentStudent;
import info.dia.persistence.model.QAssignmentStudent;
import info.dia.web.dto.SearchDTO;

@Service
@Transactional
public class AssignmentStudentService implements IAssignmentStudentService {
	
	private final Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private AssignmentStudentRepository assignmentStudentRepository;
	

	@Override
	public Page<AssignmentStudent> findAllByAssignment(Assignment assignment, Pageable pageable) {
		return assignmentStudentRepository.findAllByAssignment(assignment, pageable);
	}


	@Override
	public Page<AssignmentStudent> searchAssignmentStudent(Assignment assignment, SearchDTO dto, Pageable pageable) {
		
		BooleanBuilder b = new BooleanBuilder();
		
		QAssignmentStudent qAssignmentStudent = QAssignmentStudent.assignmentStudent;
		
		if (dto!=null) {
			
			if (!StringUtils.isEmpty(dto.getSearchString()) && dto.getAssignmentStatus()!=null) {
				b = b.and(qAssignmentStudent.email.containsIgnoreCase(dto.getSearchString())
						.or(qAssignmentStudent.status.eq(dto.getAssignmentStatus()))
						.and(qAssignmentStudent.assignment.id.eq(assignment.getId())));
			}else if (!StringUtils.isEmpty(dto.getSearchString())) {
				b = b.and(qAssignmentStudent.email.containsIgnoreCase(dto.getSearchString())
						.and(qAssignmentStudent.assignment.id.eq(assignment.getId())));
			}else if (dto.getAssignmentStatus()!=null) {
				b = b.and(qAssignmentStudent.status.eq(dto.getAssignmentStatus())
						.and(qAssignmentStudent.assignment.id.eq(assignment.getId())));
			}else {
				b = b.and(qAssignmentStudent.assignment.id.eq(assignment.getId()));
			}
		}
		return assignmentStudentRepository.findAll(b, pageable);
	}


	@Override
	public AssignmentStudent findByAssignmentStudentId(long assignmentStudentId) {
		return assignmentStudentRepository.findOne(assignmentStudentId);
	}


	@Override
	public Page<AssignmentStudent> getAllStudentAssignmentByEmailAndAssignmentStatusTrue(String email,Pageable pageable) {
		return assignmentStudentRepository.findAllByEmailAndAssignmentStatusTrue(email,pageable);
	}


	@Override
	public AssignmentStudent saveOrUpdate(AssignmentStudent assignmentStudent) {
		return assignmentStudentRepository.saveAndFlush(assignmentStudent);
	}


	@Override
	public AssignmentStudent getAssignmentStudentByEmailAndAssignmentId(String email, Long assignmentId) {
		return assignmentStudentRepository.findByEmailAndAssignmentId(email, assignmentId);
	}


	@Override
	public AssignmentStudent getAssignmentStudentByIdAndEmail(Long assignmentStudentId, String email) {
		return assignmentStudentRepository.findByIdAndEmail(assignmentStudentId, email);
	}


	@Override
	public Page<AssignmentStudent> searchAssignmentStudentByStudent(String email, SearchDTO searchDTO, Pageable p) {
		
		BooleanBuilder b = new BooleanBuilder();
		
		QAssignmentStudent qAssignmentStudent = QAssignmentStudent.assignmentStudent;
		
		if (searchDTO!=null) {
			
			if (!StringUtils.isEmpty(searchDTO.getSearchString()) && searchDTO.getAssignmentStatus()!=null) {
				b = b.and(qAssignmentStudent.assignment.title.containsIgnoreCase(searchDTO.getSearchString())
						.or(qAssignmentStudent.status.eq(searchDTO.getAssignmentStatus()))
						.or(qAssignmentStudent.assignment.session.containsIgnoreCase(searchDTO.getSearchString()))
						.and(qAssignmentStudent.email.eq(email))
						.and(qAssignmentStudent.assignment.status.eq(true)));
			}else if (!StringUtils.isEmpty(searchDTO.getSearchString())) {
				b = b.and(qAssignmentStudent.assignment.title.containsIgnoreCase(searchDTO.getSearchString())
						.or(qAssignmentStudent.assignment.session.containsIgnoreCase(searchDTO.getSearchString()))
						.and(qAssignmentStudent.email.eq(email))
						.and(qAssignmentStudent.assignment.status.eq(true)));
			}else if (searchDTO.getAssignmentStatus()!=null) {
				b = b.and(qAssignmentStudent.status.eq(searchDTO.getAssignmentStatus())
						.and(qAssignmentStudent.email.eq(email))
						.and(qAssignmentStudent.assignment.status.eq(true)));
			}else {
				b = b.and(qAssignmentStudent.email.eq(email)
					  .and(qAssignmentStudent.assignment.status.eq(true)));
			}
		}
		
		return assignmentStudentRepository.findAll(b, p);
	}


	@Override
	public int countByEmail(String email) {
		// TODO Count Student's published Assignment by email
		return assignmentStudentRepository.countByEmailAndAssignmentStatusTrue(email);
	}


	@Override
	public int countByEmailAndStatusTrue(String email) {
		// TODO Count Student's published Assignment by email and true
		return assignmentStudentRepository.countByEmailAndStatusTrueAndAssignmentStatusTrue(email);
	}


	public int countByEmailAndStatusFalse(String email) {
		// TODO Count Student's published Assignment by email and false
		return assignmentStudentRepository.countByEmailAndStatusFalseAndAssignmentStatusTrue(email);
	}


	@Override
	public Page<AssignmentStudent> getAllStudentAssignmentByEmailAndAssignmentStatus(String email,boolean status,Pageable pageable) {
		// TODO Assignment student by email and status
		return assignmentStudentRepository.findAllByEmailAndStatusAndAssignmentStatusTrue(email,status,pageable);
	}


	@Override
	public List<AssignmentStudent> findAllByAssignmentId(long assignmentId) {
		return assignmentStudentRepository.findAllByAssignmentId(assignmentId);
	}


	@Override
	public AssignmentStudent getAssignmentStudentByIdAndAssignmentId(long id, long assignmentId) {
		return assignmentStudentRepository.findByIdAndAssignmentId(id, assignmentId);
	}


	@Override
	public int countByStatusTrueAndAssignmentId(long assignmentId) {
		return assignmentStudentRepository.countByStatusTrueAndAssignmentId(assignmentId);
	}


	@Override
	public Page<AssignmentStudent> findAllByAssignmentId(long assignmentId, Pageable pageable) {
		return assignmentStudentRepository.findAllByAssignmentId(assignmentId, pageable);
	}


	@Override
	public int countByAssignmentId(long assignmentId) {
		return assignmentStudentRepository.countByAssignmentId(assignmentId);
	}


	@Override
	public Page<AssignmentStudent> getAssignmentStudentsByAssignment(Assignment assignment, Pageable pageable) {
		
		BooleanBuilder b = new BooleanBuilder();
		
		QAssignmentStudent qAssignmentStudent = QAssignmentStudent.assignmentStudent;
		if (assignment!=null) {
			b = b.and(qAssignmentStudent.assignment.eq(assignment));
		}
		
		/*LOGGER.info("Assignment Student :"+assignmentStudentRepository.findAll(b, pageable).getTotalElements()+" Slice :"+assignmentStudentRepository.findAll(b, pageable).getNumberOfElements());
		
		for (AssignmentStudent assignmentStudent : assignmentStudentRepository.findAll(b, pageable).getContent()) {
			LOGGER.info("Slice assignment student :"+assignmentStudent.toString());
		}*/
		
		
		return assignmentStudentRepository.findAll(b, pageable);
	}


	

}
