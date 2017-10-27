package info.dia.service;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import info.dia.authentication.IAuthenticationFacade;
import info.dia.persistence.dao.GroupDetailsRepository;
import info.dia.persistence.dao.GroupRepository;
import info.dia.persistence.model.Group;
import info.dia.persistence.model.GroupDetails;
import info.dia.persistence.model.User;
import info.dia.web.dto.GroupDto;
import info.dia.web.error.GroupNameAlreadyExistsException;

@Service
@Transactional
public class GroupService implements IGroupService{
	
	private final Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private GroupRepository groupRepository;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private GroupDetailsRepository groupDetailsRepository;
	
	
	@Autowired
    private IAuthenticationFacade authenticationFacade;

	@Override
	public void saveGroup(GroupDto groupDto) {
		
		Authentication authentication = authenticationFacade.getAuthentication();
		
    	if (!(authentication instanceof AnonymousAuthenticationToken)) {
    		
    		User groupUser = userService.findUserByEmail(authentication.getName());
    		
    		if (groupDto.getId()!=0) {
    			
    			/*if (groupNameExist(groupUser,groupDto.getName())) {
					throw new GroupNameAlreadyExistsException("Group name already exists in user "+groupUser.getEmail());
				}*/
    			
    			Group group = groupRepository.findOne(groupDto.getId());
    			group.setName(groupDto.getName());
    			group.setModifiedDate(new Date());
    			group.setUser(groupUser);
    			
    			Set<GroupDetails>  groupDetails= new HashSet<GroupDetails>();
    			
    			for (User user : groupDto.getGroupDetailsTo()) {
    				GroupDetails details = new GroupDetails(user.getEmail(),group);
    				GroupDetails gp = groupDetailsRepository.findByEmailAndGroup(user.getEmail(), group);
    				if (gp!=null) {
    					details.setId(gp.getId());
					}
    				groupDetails.add(details);
				}
    				
    			Set<GroupDetails>  deletedgroupDetails= new HashSet<GroupDetails>();
    			
    			for (GroupDetails exist : group.getGroupDetails()) {
    				boolean result = isObjectInSet(exist,groupDetails);
    				LOGGER.info("Contains :"+exist.getEmail()+"--->"+result);
    				if (!result) {
    					GroupDetails deletedGroupDetails = groupDetailsRepository.findByEmailAndGroup(exist.getEmail(),group);
    					LOGGER.info("deletedGroupDetails :"+deletedGroupDetails.getId()+"--->"+deletedGroupDetails.getEmail());
    					deletedgroupDetails.add(deletedGroupDetails);
					}
				}
    			
    			LOGGER.info("Deleted Group Details Size :"+deletedgroupDetails.size());
    			for (GroupDetails deletedGroupDetail : deletedgroupDetails) {
    				groupDetailsRepository.delete(deletedGroupDetail);
				}	
    				
    			group.setGroupDetails(groupDetails);
    			groupRepository.save(Arrays.asList(group));
				
			}else {
				
				LOGGER.info("GroupDto Id:..................."+groupDto.getId());
				
				if (groupNameExist(groupUser, groupDto.getName())) {
					throw new GroupNameAlreadyExistsException("Group name already exists in user "+groupUser.getEmail());
				}
				
				Group group = new Group(groupDto.getName());
	    		
	    		Set<GroupDetails> groupDetails = new HashSet<GroupDetails>();
	    		
	    		for (User user : groupDto.getGroupDetailsTo()) {
	    			
	    			GroupDetails details = new GroupDetails(user.getEmail(), group);
	    			
	    			groupDetails.add(details);
	    		}
	    		
	    		group.setUser(groupUser);
	    		group.setGroupDetails(groupDetails);
	    		group.setCreateDate(new Date());
	    		
	    		/*groupRepository.save(new HashSet<Group>() {{
	    	            add(group);
	    	    }});*/    		
	    		groupRepository.save(Arrays.asList(group));
			}
    		
    	}		
	}

	@Override
	public List<Group> findByUser(User user) {
		return groupRepository.findByUser(user);
	}

	@Override
	public Group getByGroupId(long groupId) {
		return groupRepository.findOne(groupId);
	}
	
	
	boolean isObjectInSet(GroupDetails object, Set<GroupDetails> set) {
		
		   boolean result = false;

		   for(GroupDetails o : set) {
		     if(o.getEmail().equalsIgnoreCase(object.getEmail())) {
		       result = true;
		       break;
		     }
		   }

		   return result;
	}
	
	
	private boolean groupNameExist(User user,final String groupName){
    	final Group group = groupRepository.findByUserAndNameIgnoreCase(user,groupName);
    	if (group!=null) {
			return true;
		}
    	return false;
    }

	@Override
	public List<Group> findAllByUser(User user) {
		return groupRepository.findAllByUser(user);
	}
	

}
