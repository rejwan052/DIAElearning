package info.dia.persistence.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;

import info.dia.persistence.model.Assignment;
import info.dia.persistence.model.AssignmentStudent;

public interface AssignmentStudentRepository extends JpaRepository<AssignmentStudent, Long>,QueryDslPredicateExecutor<AssignmentStudent> {

	AssignmentStudent findByEmailAndAssignment(String email,Assignment assignment);
	
	Page<AssignmentStudent> findAllByAssignment(Assignment assignment,Pageable pageable);
	
	Page<AssignmentStudent> findAllByAssignmentId(long assignmentId,Pageable pageable);
	
	Page<AssignmentStudent> findAllByEmailAndAssignmentStatusTrue(String email,Pageable pageable);
	
	Page<AssignmentStudent> findAllByEmailAndStatusAndAssignmentStatusTrue(String email,boolean status,Pageable pageable);
	
	AssignmentStudent findByEmailAndAssignmentId(String email,Long assignmentId);
	
	AssignmentStudent findByIdAndEmail(Long assignmentStudentId,String email);
	
	AssignmentStudent findByIdAndAssignmentId(long id,long assignmentId);
	
	// Count Student's published Assignment by email
	int countByEmailAndAssignmentStatusTrue(String email);
	
	// Count Student's published Assignment by email and true
	int countByEmailAndStatusTrueAndAssignmentStatusTrue(String email);
	
	// Count Student's published Assignment by email and false
	int countByEmailAndStatusFalseAndAssignmentStatusTrue(String email);
	
	// Count Assignment submit status
	int countByStatusTrueAndAssignmentId(long assignmentId);
	
	// Count Assignment submit status
	int countByAssignmentId(long assignmentId);
	

	List<AssignmentStudent> findAllByAssignmentId(long assignmentId);
	
	
}
