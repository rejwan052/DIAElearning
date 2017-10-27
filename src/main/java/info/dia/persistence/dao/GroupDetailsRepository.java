package info.dia.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import info.dia.persistence.model.Group;
import info.dia.persistence.model.GroupDetails;

public interface GroupDetailsRepository extends JpaRepository<GroupDetails, Long>{

	GroupDetails findByEmailAndGroup(String email,Group group);
	
}
