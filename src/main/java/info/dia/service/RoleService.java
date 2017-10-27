package info.dia.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import info.dia.persistence.dao.RoleRepository;
import info.dia.persistence.model.Role;

@Service
@Transactional
public class RoleService implements IRoleService{
	
	@Autowired
	private RoleRepository roleRepository;

	@Override
	public List<Role> getAllRoles() {
		return roleRepository.findAll();
	}

	@Override
	public Role findById(long id) {
		return roleRepository.findOne(id);
	}

	
}
