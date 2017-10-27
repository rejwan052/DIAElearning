package info.dia.event.listener;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import info.dia.event.AssignmentEmailNotificationEvent;
import info.dia.persistence.model.User;
import info.dia.service.EmailService;
import info.dia.web.dto.AssignmentDto;

@Component
public class EmailListener implements ApplicationListener<AssignmentEmailNotificationEvent> {

	@Autowired 
	private EmailService emailService;
	
	
	@Override
	public void onApplicationEvent(final AssignmentEmailNotificationEvent event) {
		try {
			this.emailSentEvent(event);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	private void emailSentEvent(final AssignmentEmailNotificationEvent event) throws InterruptedException{
		final List<User> users = event.getUsers();
		final AssignmentDto assignmentDto = event.getAssignmentDto();
		final User assignmentUser = event.getAssignmentUser();
		
		emailService.sendAssignmentNotification(users,assignmentDto,assignmentUser);
		
	}
	
	
}
