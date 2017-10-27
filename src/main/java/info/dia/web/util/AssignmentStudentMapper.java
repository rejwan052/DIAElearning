package info.dia.web.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import info.dia.persistence.model.AssignmentStudent;
import info.dia.persistence.model.User;
import info.dia.service.IUserService;
import info.dia.web.dto.AssignmentStudentInfo;

public class AssignmentStudentMapper {
	

	public static AssignmentStudentInfo map(AssignmentStudent assignmentStudent){
		
		AssignmentStudentInfo assignmentStudentInfo = new AssignmentStudentInfo();
		
		assignmentStudentInfo.setAssignmentId(assignmentStudent.getAssignment().getId());
		assignmentStudentInfo.setAssignmentStudentId(assignmentStudent.getId());
		assignmentStudentInfo.setEmail(assignmentStudent.getEmail());
		assignmentStudentInfo.setStatus(assignmentStudent.isStatus());
		assignmentStudentInfo.setStartDate(assignmentStudent.getSubmitStartDate());
		assignmentStudentInfo.setLastDateOfSubmission(assignmentStudent.getSubmitEndDate());
		assignmentStudentInfo.setSubmitedDate(assignmentStudent.getSubmitDate());
		
		
		return assignmentStudentInfo;
		
	}
	
	public static List<AssignmentStudentInfo> map(Page<AssignmentStudent> assignmentStudents){
		
		List<AssignmentStudentInfo> assignmentStudentInfos = new ArrayList<>();
		
		for (AssignmentStudent assignmentStudent : assignmentStudents) {
			assignmentStudentInfos.add(map(assignmentStudent));
		}
		
		return assignmentStudentInfos;
	}
	

}
