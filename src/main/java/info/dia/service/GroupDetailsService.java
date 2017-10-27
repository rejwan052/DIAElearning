package info.dia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import info.dia.persistence.dao.GroupDetailsRepository;
import info.dia.persistence.model.Group;
import info.dia.persistence.model.GroupDetails;

@Service
@Transactional
public class GroupDetailsService implements IGroupDetailsService {
	
	
	@Autowired
	private GroupDetailsRepository groupDetailsRepository;
	

	@Override
	public GroupDetails getGroupDetailsByEmailAndGroup(String email, Group group) {
		return groupDetailsRepository.findByEmailAndGroup(email, group);
	}

}
