package info.dia.event;

import java.util.List;

import org.springframework.context.ApplicationEvent;

import info.dia.persistence.model.User;
import info.dia.web.dto.AssignmentDto;

public class AssignmentEmailNotificationEvent extends ApplicationEvent {


	private static final long serialVersionUID = 2397961244247087481L;
	
	private final List<User> users;
	private final AssignmentDto assignmentDto;
	private final User assignmentUser;
	
	
	public AssignmentEmailNotificationEvent(final List<User> users,final AssignmentDto assignmentDto,final User assignmentUser) {
		 super(users);
		 this.users = users;
		 this.assignmentDto = assignmentDto;
		 this.assignmentUser = assignmentUser;
	}


	public List<User> getUsers() {
		return users;
	}


	public AssignmentDto getAssignmentDto() {
		return assignmentDto;
	}


	public User getAssignmentUser() {
		return assignmentUser;
	}
}
