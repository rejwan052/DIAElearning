package info.dia.service;

import java.util.List;

import info.dia.persistence.model.Role;

public interface IRoleService {
	
	List<Role> getAllRoles();
	
	Role findById(long id);

}
