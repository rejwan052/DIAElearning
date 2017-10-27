package info.dia.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import info.dia.persistence.model.Assignment;
import info.dia.persistence.model.User;
import info.dia.web.dto.AssignmentDto;
import info.dia.web.dto.AssignmentInfoDto;
import info.dia.web.dto.SearchDTO;

public interface IAssignmentService {
	
	Assignment getAssignmentById(long assignmentId);
	
	void saveAssignment(AssignmentDto assignmentDto);
	
	List<AssignmentInfoDto> findByUser(User user, Pageable pageable);
	
	Page<Assignment> getAllAssignmentByUserAndStatus(User user,boolean status,Pageable pageable);
	
	
	Page<Assignment> searchRequests(User user,SearchDTO searchDTO, Pageable p);
	
	Assignment getAssignmentByIdAndUser(long id,long userId);
	
	Assignment findByUserAndTitleIgnoreCase(User user,String title);
	
	//Assignment Count By User
	int countByUserId(long userId);
	
	//Assignment Count By User and true
	int countByUserIdAndStatusTrue(long userId);
	
	//Assignment Count By User and false
	int countByUserIdAndStatusFalse(long userId);
	
	
	
}
