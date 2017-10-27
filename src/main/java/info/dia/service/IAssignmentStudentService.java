package info.dia.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import info.dia.persistence.model.Assignment;
import info.dia.persistence.model.AssignmentStudent;
import info.dia.web.dto.SearchDTO;

public interface IAssignmentStudentService {
	
	Page<AssignmentStudent> findAllByAssignment(Assignment assignment,Pageable pageable);
	
	Page<AssignmentStudent> findAllByAssignmentId(long assignmentId,Pageable pageable);
	
	Page<AssignmentStudent> searchAssignmentStudent(Assignment assignment,SearchDTO dto,Pageable pageable);
	
	Page<AssignmentStudent> getAssignmentStudentsByAssignment(Assignment assignment,Pageable pageable);
	
	
	AssignmentStudent findByAssignmentStudentId(long assignmentStudentId);
	
	Page<AssignmentStudent> getAllStudentAssignmentByEmailAndAssignmentStatusTrue(String email,Pageable pageable);
	
	Page<AssignmentStudent> getAllStudentAssignmentByEmailAndAssignmentStatus(String email,boolean status,Pageable pageable);
	
	AssignmentStudent saveOrUpdate(AssignmentStudent assignmentStudent);
	
	AssignmentStudent getAssignmentStudentByEmailAndAssignmentId(String email,Long assignmentId);
	
	AssignmentStudent getAssignmentStudentByIdAndEmail(Long assignmentStudentId,String email);
	
	AssignmentStudent getAssignmentStudentByIdAndAssignmentId(long id,long assignmentId);
	
	Page<AssignmentStudent> searchAssignmentStudentByStudent(String email,SearchDTO searchDTO, Pageable p);
	
	// Count Student Assignment by email
	int countByEmail(String email);

	// Count Student Assignment by email and true
	int countByEmailAndStatusTrue(String email);

	// Count Student Assignment by email and false
	int countByEmailAndStatusFalse(String email);
	
	// Count Assignment submit status
	int countByStatusTrueAndAssignmentId(long assignmentId);
	
	int countByAssignmentId(long assignmentId);
	
	List<AssignmentStudent> findAllByAssignmentId(long assignmentId);

}
