package info.dia.web.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import info.dia.authentication.IAuthenticationFacade;
import info.dia.persistence.model.Assignment;
import info.dia.persistence.model.AssignmentStudent;
import info.dia.persistence.model.Document;
import info.dia.persistence.model.User;
import info.dia.service.IAssignmentService;
import info.dia.service.IAssignmentStudentService;
import info.dia.service.IDocumentService;
import info.dia.service.IUserService;
import info.dia.web.dto.SearchDTO;
import info.dia.web.dto.StudentDocumentDto;
import info.dia.web.error.AssignmentDateTimeException;
import info.dia.web.util.HelperUtils;

@Controller
@PreAuthorize("hasAuthority('STUDENT_PRIVILEGE')")
@RequestMapping(value="/student")
public class StudentController {
	
	private final Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	private static final int BUTTONS_TO_SHOW = 9;
	private static final int INITIAL_PAGE = 0;
	private static final int INITIAL_PAGE_SIZE = 10;
	private static final int[] PAGE_SIZES = { 10, 20, 30 };
	private static final String DEFAULT_SORT_STRING = "submitStartDate";
	
	@Autowired
    private IAuthenticationFacade authenticationFacade;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private IAssignmentStudentService assignmentStudentService;
	
	@Autowired
	private IAssignmentService assignmentService;
	
	
	@Autowired
	private IDocumentService uploadService;
	
	
	// The Environment object will be used to read parameters from the 
	// application.properties configuration file
	@Autowired
	private Environment env;
	
	
	
	@RequestMapping(value="/assignment/{id}",method=RequestMethod.GET)
	public String assignment(Model model,@PathVariable("id") long assignmentStudentId){
		Authentication authentication = authenticationFacade.getAuthentication();
		if(!(authentication instanceof AnonymousAuthenticationToken)){
			User currentUser = userService.findUserByEmail(authentication.getName());
			AssignmentStudent assignmentStudent = assignmentStudentService.getAssignmentStudentByIdAndEmail(assignmentStudentId,currentUser.getEmail());
			if (assignmentStudent!=null) {
				List<Document> assignmentsDocuments = uploadService.getAllDocumentsByUserIdAndAssignmentIdAndStatus(assignmentStudent.getAssignment().getUser().getId(),assignmentStudent.getAssignment().getId(),1);
				if (assignmentsDocuments.size()>0) {
					model.addAttribute("assignmentsDocuments",assignmentsDocuments);
				}
				model.addAttribute("assignmentStudent", assignmentStudent);
			}
		}
		return "student/assignment";
	}
	
	
		//Assignment reference Document Download
		@PreAuthorize("hasAuthority('ASSIGNMENT_REFERENCE_DOCUMENT_DOWNLOAD_PRIVILEGE')")
	    @RequestMapping(value = "/downloadAssignmentReferenceDocument/{documentId}/{assignmentId}", method = RequestMethod.GET)
	    public void downloadAssignmentReferenceDocument(HttpServletResponse response,@PathVariable Long documentId,@PathVariable Long assignmentId) {
			
			Authentication authentication = authenticationFacade.getAuthentication();
			
			if (!(authentication instanceof AnonymousAuthenticationToken)) {
				
				Assignment assignment = assignmentService.getAssignmentById(assignmentId);
				
				User assignmentUser = userService.findUserByEmail(assignment.getUser().getEmail());
				
				Document dataFile = uploadService.getDocumentByIdAndAssignmentIdAndUser(documentId,assignmentId,assignmentUser.getId());
				
				if (dataFile!=null) {
					File file = new File(dataFile.getLocation(), dataFile.getName());
					try {
						response.setContentType(dataFile.getType());
						response.setHeader("Content-disposition", "attachment; filename=\"" + dataFile.getName() + "\"");
						FileCopyUtils.copy(FileUtils.readFileToByteArray(file), response.getOutputStream());
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
	    }
	
	
	@RequestMapping(value="/assignments",method=RequestMethod.GET)
	public String assignments(Model model,
			@RequestParam(value = "status", required = false) Boolean status,
			@RequestParam(value = "page", required = false) Integer page,
			@RequestParam(value = "sortString", required = false) String sortString,
			@RequestParam(value = "oldSortString", required = false) String oldSortString,
			@RequestParam(value = "oldDirection", required = false) Direction oldDirection){
		
		/*LOGGER.info("Inside student assignments :");*/
		
		Authentication authentication = authenticationFacade.getAuthentication();
		if(!(authentication instanceof AnonymousAuthenticationToken)){
			
			User currentUser = userService.findUserByEmail(authentication.getName());
			PageRequest pageRequest = HelperUtils.createPageRequest(model,page,sortString,oldSortString,oldDirection,INITIAL_PAGE,INITIAL_PAGE_SIZE,DEFAULT_SORT_STRING);
			Page<AssignmentStudent> studentAssignments = null;
			
			/*LOGGER.info("Status :"+status);*/
			
			if (status!=null) {
				studentAssignments = assignmentStudentService.getAllStudentAssignmentByEmailAndAssignmentStatus(currentUser.getEmail(),status,pageRequest);
				/*LOGGER.info("Status :"+status+" and studentsAssignments :"+studentAssignments.getTotalElements());*/
			}else {
				studentAssignments = assignmentStudentService.getAllStudentAssignmentByEmailAndAssignmentStatusTrue(currentUser.getEmail(),pageRequest);
			}
			
			
			info.dia.web.util.Pager pager = new info.dia.web.util.Pager(studentAssignments.getTotalPages(),studentAssignments.getNumber(),BUTTONS_TO_SHOW);
			
			model.addAttribute("studentAssignments", studentAssignments);
			model.addAttribute("pager", pager);
			model.addAttribute("searchDTO", new SearchDTO());
			
		}
		return "student/assignments";
	}
	
	
	@RequestMapping(value = "/assignments/search",method=RequestMethod.GET)
	public String search(
			Model model,
			HttpSession session,
			@RequestParam(value = "page", required = false) Integer page,
			@RequestParam(value = "sortString", required = false) String sortString,
			@RequestParam(value = "oldSortString", required = false) String oldSortString,
			@RequestParam(value = "oldDirection", required = false) Direction oldDirection,
			@ModelAttribute("searchDTO") SearchDTO searchDTO) {
		
		
		/*LOGGER.info("Search Method Called!"+" with search string :"+searchDTO.getSearchString()+" and boolean value:"+searchDTO.getAssignmentStatus());*/
		
		SearchDTO sessionSearchDTO = (SearchDTO) session.getAttribute("searchDTO");
		
		if (sessionSearchDTO != null && page != null) {
			searchDTO = sessionSearchDTO;
		}
		
		PageRequest pageRequest = HelperUtils.createPageRequest(model, page,sortString, oldSortString, oldDirection,INITIAL_PAGE,INITIAL_PAGE_SIZE,DEFAULT_SORT_STRING);
		
		
		
		return searchAssignment(model, session, searchDTO, pageRequest);
	}
	
	public String searchAssignment(Model model, HttpSession session, SearchDTO searchDTO,PageRequest pageRequest){
		
		Authentication authentication = authenticationFacade.getAuthentication();
		
    	if (!(authentication instanceof AnonymousAuthenticationToken)) {
    		
    		User user = userService.findUserByEmail(authentication.getName());

    		Page<AssignmentStudent> studentAssignments = assignmentStudentService.searchAssignmentStudentByStudent(user.getEmail(),searchDTO,pageRequest);
    		
    		info.dia.web.util.Pager pager = new info.dia.web.util.Pager(studentAssignments.getTotalPages(),studentAssignments.getNumber(),BUTTONS_TO_SHOW);
    		
    		model.addAttribute("studentAssignments", studentAssignments);
			model.addAttribute("pager", pager);
    		model.addAttribute("searchDTO", searchDTO != null ? searchDTO: new AssignmentStudent());
    		model.addAttribute("isSearch", "true");
    		session.setAttribute("searchDTO", searchDTO);
    	}
    	
    	return "student/assignments";
	}
	
	
	//Student Assignment Document
	@RequestMapping(value="/addDocument",method=RequestMethod.GET)
	public String addDocumentsToAssignment(Model model,@RequestParam(value="assignmentId") Long assignmentId){
		
			Authentication authentication = authenticationFacade.getAuthentication();
			StudentDocumentDto studentDocumentDto = null;
			Document document = null;
			AssignmentStudent documentSubmitOnAssignment = null;
			
			if (!(authentication instanceof AnonymousAuthenticationToken)) {
				User user = userService.findUserByEmail(authentication.getName());
				
				/*documentSubmitOnAssignment = assignmentService.getAssignmentById(assignmentId);*/
				documentSubmitOnAssignment = assignmentStudentService.getAssignmentStudentByEmailAndAssignmentId(user.getEmail(),assignmentId);
				if (documentSubmitOnAssignment!=null) {
					studentDocumentDto = new StudentDocumentDto();
					studentDocumentDto.setAssignmentId(documentSubmitOnAssignment.getAssignment().getId());
					studentDocumentDto.setAssignmentStudentId(documentSubmitOnAssignment.getId());
					
					document = uploadService.getDocumentByAssignmentIdAndUserId(assignmentId,user.getId());
					if (document!=null) {
						studentDocumentDto.setId(document.getId());
					}
				}
			}
		model.addAttribute("documentSubmitOnAssignment",documentSubmitOnAssignment);	
		model.addAttribute("studentDocumentDto",studentDocumentDto);
		model.addAttribute("document",document);
			
		return "/student/addDocument";
	}
	
	
	@RequestMapping(value="/assignmentDocument/{assignmentId}",method=RequestMethod.GET)
	public String getAssignmentDocument(@PathVariable("assignmentId") long assignmentId,Model model){
		
		/*LOGGER.info("getAssignmentDocument :"+assignmentId);*/
		
		Authentication authentication = authenticationFacade.getAuthentication();
    	if (!(authentication instanceof AnonymousAuthenticationToken)) {
    		User assignmentUser = userService.findUserByEmail(authentication.getName());
    		Document  document = uploadService.getDocumentByAssignmentIdAndUserId(assignmentId,assignmentUser.getId());
    		/*LOGGER.info("document :"+document);*/
    		if(document!=null){
    			model.addAttribute("document", document);
    		}
    	}
    	return "student/studentAssignmentDocument :: studentAssignmentDocument";
	}
	
	
	@RequestMapping(value = "/uploadStudentAssignmentDocument", method = RequestMethod.POST)
	public @ResponseBody List<StudentDocumentDto> upload(MultipartHttpServletRequest request, HttpServletResponse response,
		   @RequestParam(value = "assignmentId") Long assignmentId,@RequestParam(value="assignmentStudentId") Long assignmentStudentId,@RequestParam(value = "id",required=false) Long id) throws IOException {

		Authentication authentication = authenticationFacade.getAuthentication();
		List<StudentDocumentDto> uploadedFiles = null;
		
		/*LOGGER.info("Student DocumentId :"+id);*/
		
		if (!(authentication instanceof AnonymousAuthenticationToken)) {

			User user = userService.findUserByEmail(authentication.getName());
			
			boolean assignmentDateTimeExpiredOrNot = assignmentDateExpiredOrNot(user.getEmail(),assignmentId);
			if (assignmentDateTimeExpiredOrNot) {
				throw new AssignmentDateTimeException("Assignment submission date expired--->"+user.getEmail());
			}
			
			// Getting uploaded files from the request object
			Map<String, MultipartFile> fileMap = request.getFileMap();

			// Maintain a list to send back the files info. to the client side
			uploadedFiles = new ArrayList<StudentDocumentDto>();

			// Iterate through the map
			for (MultipartFile multipartFile : fileMap.values()) {

				// Save the file to local disk
				saveFileToLocalDisk(multipartFile, user);

				StudentDocumentDto fileInfo = getUploadedFileInfo(multipartFile,user,assignmentStudentId,assignmentId);

				// Save the file info to database
				Document document = saveFileToDatabase(fileInfo);
				
				
				
				// adding the file info to the list
				uploadedFiles.add(fileInfo);
			}

		}
		return uploadedFiles;
	}
	
	
	//Document upload related method
	private void saveFileToLocalDisk(MultipartFile multipartFile,User user) throws IOException, FileNotFoundException {

		String outputFileName = getOutputFilename(multipartFile,user);

		// Get the filename and build the local file path
		String filename = multipartFile.getOriginalFilename();
		String filepath = Paths.get(outputFileName, filename).toString();

		// Save the file locally
		BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filepath)));
		stream.write(multipartFile.getBytes());
		stream.close();
	}

	private String getOutputFilename(MultipartFile multipartFile,User user) {

		return getDestinationLocation(user);
	}
	
	private Document saveFileToDatabase(StudentDocumentDto uploadedFile) {

	    return uploadService.saveStudentDocument(uploadedFile);

	}
	
	private StudentDocumentDto getUploadedFileInfo(MultipartFile multipartFile,User user,Long assignmentStudentId,Long assignmentId) throws IOException {

		 	StudentDocumentDto fileInfo = new StudentDocumentDto();
		 	
		    fileInfo.setName(multipartFile.getOriginalFilename());
		    fileInfo.setSize(multipartFile.getSize());
		    fileInfo.setType(multipartFile.getContentType());
		    fileInfo.setLocation(getDestinationLocation(user));
		    fileInfo.setUserId(user.getId());
		    fileInfo.setAssignmentId(assignmentId);
		    fileInfo.setAssignmentStudentId(assignmentStudentId);
		    fileInfo.setStatus(2);  //Status = 2, student assignment document
		    
		    return fileInfo;
	}
	 
	
	private String getDestinationLocation(User user) {

		/*String parrentDirectory = "D:/file_to_save/";*/
		String parrentDirectory = env.getProperty("diaElearning.paths.uploadedFiles");
		boolean flag = false;

		File file = new File(parrentDirectory + user.getEmail());
		if (!file.exists()) {
			flag = file.mkdirs();
		}

		return file.getAbsolutePath();
	}
	
	
	private boolean assignmentDateExpiredOrNot(String email,long assignmentId){
		
		boolean assignmentDateTimeExpiredOrNot = false;
		
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		
		AssignmentStudent assignmentStudent  = assignmentStudentService.getAssignmentStudentByEmailAndAssignmentId(email,assignmentId);
		
		/*LOGGER.info("assignmentStudent :"+assignmentStudent.getEmail()+" assignmentStudentId :"+assignmentStudent.getId()+" And assignmentId :"+assignmentStudent.getAssignment().getId());
		LOGGER.info("Assignment DateTime Expired Or Not: "+calendar.getTime().before(assignmentStudent.getSubmitEndDate())+ "Date :"+calendar.getTime()+"---->"+assignmentStudent.getSubmitEndDate());*/
		
		if (calendar.getTime().after(assignmentStudent.getSubmitEndDate())) {
			assignmentDateTimeExpiredOrNot = true;
		}
		
		return assignmentDateTimeExpiredOrNot;
	}
	

}
