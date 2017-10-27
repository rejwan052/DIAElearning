package info.dia.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import info.dia.authentication.IAuthenticationFacade;
import info.dia.persistence.model.Role;
import info.dia.persistence.model.User;
import info.dia.service.IAssignmentService;
import info.dia.service.IAssignmentStudentService;
import info.dia.service.IUserService;

@Controller
public class HomeController {
	
	private final Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private IAuthenticationFacade authenticationFacade;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private IAssignmentStudentService assignmentStudentService;
	
	@Autowired
	private IAssignmentService assignmentService;
	
	
    @RequestMapping(value="/home",method=RequestMethod.GET)
    public String homePage(Model model) {
		
    	Authentication authentication = authenticationFacade.getAuthentication();
		if(!(authentication instanceof AnonymousAuthenticationToken)){
			User user = userService.findUserByEmail(authentication.getName());
			for (Role role : user.getRoles()) {
				if (role.getName().equals("ROLE_ADMIN")) {
					
					model.addAttribute("total",userService.countAllUser());
					
				}else if(role.getName().equals("ROLE_TEACHER")){
					
					model.addAttribute("total",assignmentService.countByUserId(user.getId()));
					model.addAttribute("publish",assignmentService.countByUserIdAndStatusTrue(user.getId()));
					model.addAttribute("saved", assignmentService.countByUserIdAndStatusFalse(user.getId()));
					
				}else if(role.getName().equals("ROLE_STUDENT")){
					
					model.addAttribute("total",assignmentStudentService.countByEmail(user.getEmail()));
					model.addAttribute("submitted",assignmentStudentService.countByEmailAndStatusTrue(user.getEmail()));
					model.addAttribute("notSubmitted", assignmentStudentService.countByEmailAndStatusFalse(user.getEmail()));
					
				}
			}
			
		}

		return "index";
    }
	
}
