package info.dia.service;

import java.util.List;

import info.dia.persistence.model.Assignment;
import info.dia.persistence.model.Document;
import info.dia.web.dto.DocumentDto;
import info.dia.web.dto.StudentDocumentDto;

public interface IDocumentService {
	
	Document saveOrUpdate(DocumentDto documentDto);
	
	Document saveStudentDocument(StudentDocumentDto studentDocumentDto);
	
	List<Document> getAllDocumentsByAssignmenmt(Assignment assignment);
	
	List<Document> getAllDocumentsByUserIdAndAssignmentIdAndStatus(Long userId,Long assignmentId,int status);
	
	Document findById(long id);
	
	Document getDocumentByIdAndAssignmentAndUser(Long id,Assignment assignment,Long userId);
	
	Document getDocumentByIdAndAssignmentIdAndUser(Long id,Long assignmentId,Long userId);
	
	Document getDocumentByAssignmentIdAndUserId(Long assignmentId,Long userId);
	
}
