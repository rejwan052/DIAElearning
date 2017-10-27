package info.dia.service;

import info.dia.persistence.model.Group;
import info.dia.persistence.model.GroupDetails;

public interface IGroupDetailsService {
	
	GroupDetails getGroupDetailsByEmailAndGroup(String email,Group group);

}
