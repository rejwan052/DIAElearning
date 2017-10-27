package info.dia.service;

import java.util.List;

import info.dia.persistence.model.Group;
import info.dia.persistence.model.User;
import info.dia.web.dto.GroupDto;

public interface IGroupService {
	
	void saveGroup(GroupDto groupDto);
	
	List<Group> findByUser(User user);
	
	Group getByGroupId(long groupId);
	
	List<Group> findAllByUser(User user);

}
