package info.dia.service;

import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import info.dia.persistence.model.User;
import info.dia.web.dto.AssignmentDto;


@Component
@Service
public class EmailService {
	
	private final Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	
	private static final String BACKGROUND_IMAGE = "email-templates/images/background.png";
    private static final String LOGO_BACKGROUND_IMAGE = "email-templates/images/logo-background.png";
    private static final String ELEARNING_BANNER_IMAGE = "email-templates/images/eLearning_Banner.png";
    private static final String ELEARNING_LOGO_IMAGE = "email-templates/images/eLearning_Logo.png";
    
    private static final String PNG_MIME = "image/png";
	
	@Autowired
	private JavaMailSender mailSender;
	 
	@Autowired
	private Environment env;
	 
	@Autowired 
	private TemplateEngine templateEngine;
	
	@Async
	public void sendPasswordResetEmail(final User user, final String url)
		{
	        try
			{
	        	
	            final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
	            final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true /* multipart */, "UTF-8");
	            message.setSubject("Password Reset Link");
	            message.setFrom(env.getProperty("support.email"));
	            message.setTo(user.getEmail());
	            
	            final Locale locale = new Locale(Locale.ENGLISH.toString());
	            
                final Context ctx = new Context(locale);
                ctx.setVariable("resetUserName", user.getFirstName()+" "+(user.getLastName()!=null?user.getLastName():" "));
                ctx.setVariable("passResetLink", url);
                
                
                final String htmlContent = templateEngine.process("resetPasswordEmail",ctx);
                
                message.setText(htmlContent, true /* isHtml */);
	            
	            message.addInline("background", new ClassPathResource(BACKGROUND_IMAGE), PNG_MIME);
	            message.addInline("logo-background", new ClassPathResource(LOGO_BACKGROUND_IMAGE), PNG_MIME);
	            message.addInline("eLearning_Banner", new ClassPathResource(ELEARNING_BANNER_IMAGE), PNG_MIME);
	            message.addInline("eLearning_Logo", new ClassPathResource(ELEARNING_LOGO_IMAGE), PNG_MIME);
	            
	            
	            mailSender.send(message.getMimeMessage());
			} 
	        catch (MailException | MessagingException e)
			{
	        	LOGGER.error(e.toString());
			}
		}
	 
	 @Async
	 public void sendAssignmentNotification(final List<User> users, final AssignmentDto assignmentDto,User assignmentUser) throws InterruptedException 
     {
		 
		 	LOGGER.info("Sleeping now...");
			Thread.sleep(10000);
	        LOGGER.info("Sending email...");
	        
         MimeMessagePreparator[] preparators = new MimeMessagePreparator[users.size()];
         int i = 0;
         for (final User user: users) 
         {
        	 LOGGER.info("Mail preparators count--->"+i);
             preparators[i++] =  new MimeMessagePreparator() 
             {
                 public void prepare(MimeMessage mimeMessage) throws Exception 
                 {
                	 LOGGER.info("Prepare Mail for sent..."+user.getEmail());
                	 
                     final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                     message.setSubject("New assignment has been created:#"+assignmentDto.getTitle());
                     message.setTo(user.getEmail());
                     message.setFrom(env.getProperty("support.email"));
                     
                     
                     final Locale locale = new Locale(Locale.ENGLISH.toString());
                     
                     final Context ctx = new Context(locale);
                     
                     ctx.setVariable("assignmentCreator", assignmentUser.getFirstName()+" "+assignmentUser.getLastName());
                     ctx.setVariable("name", user.getFirstName()+" "+user.getLastName());
                     ctx.setVariable("title", assignmentDto.getTitle());
                     ctx.setVariable("session", assignmentDto.getSession());
                     ctx.setVariable("startDate", assignmentDto.getSubmitStartDate());
                     ctx.setVariable("endDate", assignmentDto.getSubmitEndDate());
                     
                     
                    final String htmlContent = templateEngine.process("assignmentInformationEmail",ctx);
                     
                    message.setText(htmlContent, true /* isHtml */);
                     
                    message.addInline("background", new ClassPathResource(BACKGROUND_IMAGE), PNG_MIME);
     	            message.addInline("logo-background", new ClassPathResource(LOGO_BACKGROUND_IMAGE), PNG_MIME);
     	            message.addInline("eLearning_Banner", new ClassPathResource(ELEARNING_BANNER_IMAGE), PNG_MIME);
     	            message.addInline("eLearning_Logo", new ClassPathResource(ELEARNING_LOGO_IMAGE), PNG_MIME);
     	            LOGGER.info("Mail prepare complete  for sent..."+user.getEmail());
                 }
             };
         }
         mailSender.send(preparators);
         LOGGER.info("Mail sent to "+preparators.length+" person(s)");
     }
	 
	 @Async
	 public void sendDocumentUploadEmail(final User uploadUser,User assignmentUser,String title)
		{
	        try
			{
	        	
	         final MimeMessage mimeMessage = this.mailSender.createMimeMessage();
	         final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true /* multipart */, "UTF-8");
	         
	         StringBuilder studentName = new StringBuilder();
	         
	         studentName.append(uploadUser.getFirstName());
	         studentName.append(" ");
	         studentName.append(uploadUser.getLastName());
	         
	         StringBuilder teacherName = new StringBuilder();
	         
	         teacherName.append(assignmentUser.getFirstName());
	         teacherName.append(" ");
	         teacherName.append(assignmentUser.getLastName());
	         
	         
	         message.setSubject("Assignment Uploaded By " +studentName);
	         message.setFrom(env.getProperty("support.email"));
	         message.setTo(assignmentUser.getEmail());
	            
	         final Locale locale = new Locale(Locale.ENGLISH.toString());
	            
             final Context ctx = new Context(locale);
             ctx.setVariable("assignmentCreator",teacherName.toString());
             ctx.setVariable("studentName",studentName.toString());
             ctx.setVariable("studentEmail",uploadUser.getEmail());
             ctx.setVariable("title",title);
             ctx.setVariable("todayDate", new Date());
             
             final String htmlContent = templateEngine.process("studentDocumentUploadEmail",ctx);
             
             message.setText(htmlContent, true /* isHtml */);
	            
	         message.addInline("background", new ClassPathResource(BACKGROUND_IMAGE), PNG_MIME);
	         message.addInline("logo-background", new ClassPathResource(LOGO_BACKGROUND_IMAGE), PNG_MIME);
	         message.addInline("eLearning_Banner", new ClassPathResource(ELEARNING_BANNER_IMAGE), PNG_MIME);
	         message.addInline("eLearning_Logo", new ClassPathResource(ELEARNING_LOGO_IMAGE), PNG_MIME);
	            
	            
	         mailSender.send(message.getMimeMessage());
			} 
	        catch (MailException | MessagingException e)
			{
	        	LOGGER.error(e.toString());
			}
		}
	 
}
