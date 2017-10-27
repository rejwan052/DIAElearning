package info.dia.web.dto;

import java.io.Serializable;
import java.util.List;

public class AssignmentStudentListDto implements Serializable {

	private static final long serialVersionUID = 3687940768799677823L;
	
	private Long assignmentId;
	private String submitEndDate;
	private List<AssignmentStudentInfo> assignmentStudents;
	
	
	public Long getAssignmentId() {
		return assignmentId;
	}
	public void setAssignmentId(Long assignmentId) {
		this.assignmentId = assignmentId;
	}
	public List<AssignmentStudentInfo> getAssignmentStudents() {
		return assignmentStudents;
	}
	public void setAssignmentStudents(List<AssignmentStudentInfo> assignmentStudents) {
		this.assignmentStudents = assignmentStudents;
	}
	public String getSubmitEndDate() {
		return submitEndDate;
	}
	public void setSubmitEndDate(String submitEndDate) {
		this.submitEndDate = submitEndDate;
	}
	
	

}
