package info.dia.persistence.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import info.dia.persistence.model.Assignment;
import info.dia.persistence.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {

	List<Document> findAllByAssignment(Assignment assignment);
	
	List<Document> findAllByUserIdAndAssignmentIdAndStatus(Long userId,Long assignmentId,int status);
	
	Document findByIdAndAssignmentAndUserId(Long id,Assignment assignment,Long userId);
	
	Document findByIdAndAssignmentIdAndUserId(Long id,Long assignmentId,Long userId);
	
	Document findByAssignmentIdAndUserId(Long assignmentId,Long userId);
}
