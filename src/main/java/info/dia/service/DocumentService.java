package info.dia.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import info.dia.persistence.dao.AssignmentRepository;
import info.dia.persistence.dao.AssignmentStudentRepository;
import info.dia.persistence.dao.DocumentRepository;
import info.dia.persistence.model.Assignment;
import info.dia.persistence.model.AssignmentStudent;
import info.dia.persistence.model.Document;
import info.dia.persistence.model.User;
import info.dia.web.dto.DocumentDto;
import info.dia.web.dto.StudentDocumentDto;

@Service
@Transactional
public class DocumentService implements IDocumentService {
	
	@Autowired
	private DocumentRepository documentRepository;
	
	@Autowired
	private AssignmentRepository assignmentRepository;
	
	@Autowired
	private AssignmentStudentRepository assignmentStudentRepository;
	
	@Autowired
	private IUserService userService;
	
	@Autowired 
	private EmailService emailService;

	@Override
	public Document saveOrUpdate(DocumentDto documentDto) {
		
		Document document = new Document();
		
		document.setName(documentDto.getName());
		document.setLocation(documentDto.getLocation());
		document.setSize(documentDto.getSize());
		document.setStatus(documentDto.getStatus());
		document.setType(documentDto.getType());
		document.setUserId(documentDto.getUserId());
		document.setCreateOn(new Date());
		
		Assignment assignment = assignmentRepository.findOne(documentDto.getAssignmentId());
		
		document.setAssignment(assignment);
		
		return documentRepository.save(document);
	}

	@Override
	public List<Document> getAllDocumentsByAssignmenmt(Assignment assignment) {
		return documentRepository.findAllByAssignment(assignment);
	}

	@Override
	public Document findById(long id) {
		return documentRepository.getOne(id);
	}

	@Override
	public Document getDocumentByIdAndAssignmentAndUser(Long id, Assignment assignment, Long userId) {
		return documentRepository.findByIdAndAssignmentAndUserId(id, assignment, userId);
	}

	@Override
	public Document getDocumentByIdAndAssignmentIdAndUser(Long id, Long assignmentId, Long userId) {
		return documentRepository.findByIdAndAssignmentIdAndUserId(id, assignmentId, userId);
	}

	@Override
	public Document saveStudentDocument(StudentDocumentDto studentDocumentDto) {
		
		Document document = null;
		if (studentDocumentDto.getId()!=null) {
			
			document = documentRepository.findOne(studentDocumentDto.getId());
			
			document.setName(studentDocumentDto.getName());
			document.setLocation(studentDocumentDto.getLocation());
			document.setSize(studentDocumentDto.getSize());
			document.setStatus(studentDocumentDto.getStatus());
			document.setType(studentDocumentDto.getType());
			document.setUserId(studentDocumentDto.getUserId());
			document.setCreateOn(new Date());
			Assignment assignment = assignmentRepository.findOne(studentDocumentDto.getAssignmentId());
			document.setAssignment(assignment);
			
		}else {
			
			document = documentRepository.findByAssignmentIdAndUserId(studentDocumentDto.getAssignmentId(),studentDocumentDto.getUserId());
			if (document!=null) {
				
				document.setName(studentDocumentDto.getName());
				document.setLocation(studentDocumentDto.getLocation());
				document.setSize(studentDocumentDto.getSize());
				document.setStatus(studentDocumentDto.getStatus());
				document.setType(studentDocumentDto.getType());
				document.setUserId(studentDocumentDto.getUserId());
				document.setCreateOn(new Date());
				
				Assignment assignment = assignmentRepository.findOne(studentDocumentDto.getAssignmentId());
				document.setAssignment(assignment);
				
			}else {
				
				document = new Document();
				
				document.setName(studentDocumentDto.getName());
				document.setLocation(studentDocumentDto.getLocation());
				document.setSize(studentDocumentDto.getSize());
				document.setStatus(studentDocumentDto.getStatus());
				document.setType(studentDocumentDto.getType());
				document.setUserId(studentDocumentDto.getUserId());
				document.setCreateOn(new Date());
				
				Assignment assignment = assignmentRepository.findOne(studentDocumentDto.getAssignmentId());
				document.setAssignment(assignment);
				
				User assignmentUser = userService.findUserByEmail(assignment.getUser().getEmail());
				User uploadUser = userService.getUserByID(studentDocumentDto.getUserId());
				emailService.sendDocumentUploadEmail(uploadUser, assignmentUser,assignment.getTitle());
				
			}
		}
		AssignmentStudent assignmentStudent = assignmentStudentRepository.findOne(studentDocumentDto.getAssignmentStudentId());
		assignmentStudent.setStatus(true);
		assignmentStudent.setSubmitDate(new Date());
		
		assignmentStudentRepository.saveAndFlush(assignmentStudent);
		
		
		return documentRepository.save(document);
	}

	@Override
	public Document getDocumentByAssignmentIdAndUserId(Long assignmentId, Long userId) {
		return documentRepository.findByAssignmentIdAndUserId(assignmentId, userId);
	}

	@Override
	public List<Document> getAllDocumentsByUserIdAndAssignmentIdAndStatus(Long userId, Long assignmentId, int status) {
		return documentRepository.findAllByUserIdAndAssignmentIdAndStatus(userId, assignmentId, status);
	}
	
	private String getAppUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }

}
