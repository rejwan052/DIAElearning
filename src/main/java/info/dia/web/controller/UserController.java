package info.dia.web.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Iterator;
import java.util.Locale;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import info.dia.authentication.IAuthenticationFacade;
import info.dia.persistence.model.ImageEntity;
import info.dia.persistence.model.User;
import info.dia.security.ActiveUserStore;
import info.dia.security.ISecurityUserService;
import info.dia.service.EmailService;
import info.dia.service.IImageService;
import info.dia.service.IUserService;
import info.dia.web.dto.PasswordDto;
import info.dia.web.dto.ProfileDto;
import info.dia.web.error.InvalidOldPasswordException;
import info.dia.web.error.UserNotFoundException;
import info.dia.web.util.GenericResponse;

@Controller
public class UserController {

	
	private final Logger LOGGER = LoggerFactory.getLogger(getClass());
	
    @Autowired
    ActiveUserStore activeUserStore;
    
    @Autowired
    private IUserService userService;
    
    @Autowired
    private ISecurityUserService securityUserService;
    
    @Autowired
    private IAuthenticationFacade authenticationFacade;
    
    
    @Autowired
    private MessageSource messages;
    
    @Autowired 
    protected EmailService emailService;
    
	
	@Autowired
	private IImageService imageService;
	

    @RequestMapping(value = "/loggedUsers", method = RequestMethod.GET)
    public String getLoggedUsers(final Locale locale, final Model model) {
    	
        model.addAttribute("users", activeUserStore.getUsers());
        
        return "users";
    }
    
    

    
    @RequestMapping(value="/userProfile",method=RequestMethod.GET)
    public String userProfilePage(Model model) {
		
    	Authentication authentication = authenticationFacade.getAuthentication();
    	if (!(authentication instanceof AnonymousAuthenticationToken)) {
    	    
    		User user = userService.findUserByEmail(authentication.getName());
    		ImageEntity imageEntity = imageService.findByUser(user);
    		if (imageEntity!=null) {
    			model.addAttribute("imageEntity",imageEntity);
			}
    		model.addAttribute("imageEntity","");
    	    model.addAttribute("userProfile",user);
    	}
    	
		return "/user/profile";
    }

    // Reset password
    @RequestMapping(value = "/user/resetPassword", method = RequestMethod.POST)
    @ResponseBody
    public GenericResponse resetPassword(final HttpServletRequest request, @RequestParam("email") final String userEmail) {
        final User user = userService.findUserByEmail(userEmail);
        if (user == null) {
            throw new UserNotFoundException();
        }
        final String token = UUID.randomUUID().toString();
        userService.createPasswordResetTokenForUser(user, token);
        
        final String url = getAppUrl(request) + "/user/changePassword?id=" + user.getId() + "&token=" + token;
        emailService.sendPasswordResetEmail(user,url);
        
        return new GenericResponse(messages.getMessage("message.resetPasswordEmail", null, request.getLocale()));
    }
    
    // Change password page
    @RequestMapping(value = "/user/changePassword", method = RequestMethod.GET)
    public String showChangePasswordPage(final Locale locale, final Model model, @RequestParam("id") final long id, @RequestParam("token") final String token) {
        final String result = securityUserService.validatePasswordResetToken(id, token);
        LOGGER.info("Result :"+result);
        if (result != null) {
        	LOGGER.info("Result not null:"+result);
            model.addAttribute("message", messages.getMessage("auth.message." + result, null, locale));
            return "redirect:/login?lang=" + locale.getLanguage();
        }
        return "redirect:/updatePassword?lang=" + locale.getLanguage();
    }
    
    // Save password
    @RequestMapping(value = "/user/savePassword", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('CHANGE_PASSWORD_PRIVILEGE')")
    @ResponseBody
    public GenericResponse savePassword(final Locale locale, @Valid PasswordDto passwordDto) {
        final User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.changeUserPassword(user, passwordDto.getNewPassword());
        return new GenericResponse(messages.getMessage("message.resetPasswordSuc", null, locale));
    }
    
    // Update Password
    @RequestMapping(value = "/user/updatePassword", method = RequestMethod.POST)
    @PreAuthorize("hasAuthority('CHANGE_PASSWORD_PRIVILEGE')")
    @ResponseBody
    public GenericResponse changeUserPassword(final Locale locale, @Valid PasswordDto passwordDto) {
        final User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        if (!userService.checkIfValidOldPassword(user, passwordDto.getOldPassword())) {
            throw new InvalidOldPasswordException();
        }
        userService.changeUserPassword(user, passwordDto.getNewPassword());
        return new GenericResponse(messages.getMessage("message.updatePasswordSuc", null, locale));
    }
    
    // Update User Personal Info
    @RequestMapping(value = "/user/updatePersonalInfo", method = RequestMethod.POST)
    @ResponseBody
    public GenericResponse updateUserPersonalInformation(final Locale locale, @Valid ProfileDto profileDto) {
    	
        final User user = userService.findUserByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        
        user.setFirstName(profileDto.getFirstName());
        user.setLastName(profileDto.getLastName());
        user.setGender(profileDto.getGender());
        user.setBloodGroup(profileDto.getBloodGroup());
        
        userService.saveRegisteredUser(user);
        
        return new GenericResponse(messages.getMessage("message.updateUserSuc", null, locale));
    }
    
    
    @RequestMapping(
            value = "/upload",
            method = RequestMethod.POST
    )
    public ResponseEntity<String> uploadFile(MultipartHttpServletRequest request) {

    	Authentication authentication = authenticationFacade.getAuthentication();
    	if (!(authentication instanceof AnonymousAuthenticationToken)) {
    		User user = userService.findUserByEmail(authentication.getName());
    		try {
    			
                Iterator<String> itr = request.getFileNames();

                while (itr.hasNext()) {
                	
                    String uploadedFile = itr.next();
                    MultipartFile file = request.getFile(uploadedFile);
                    String mimeType = file.getContentType();
                    String filename = file.getOriginalFilename();
                    byte[] bytes = file.getBytes();
                    
                    ImageEntity imageEntity = imageService.findByUser(user);
                    if (imageEntity!=null) {
                    	imageEntity.setFilename(filename);
                    	imageEntity.setMimeType(mimeType);
                    	imageEntity.setImage(bytes);
                    	imageEntity.setUser(user);
					}else {
						imageEntity = new ImageEntity(filename,mimeType,bytes,user);
					}
                    imageService.uploadImage(imageEntity);
                }
            }
            catch (Exception e) {
                return new ResponseEntity<>("{}", HttpStatus.INTERNAL_SERVER_ERROR);
            }
    	}
        return new ResponseEntity<>("{}", HttpStatus.OK);
    }
    
    
    @RequestMapping(value = "/user/avatar/image", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<byte[]> viewsUserAvatarImage() {
    	
    	Authentication authentication = authenticationFacade.getAuthentication();
    	ImageEntity imageEntity = null;
    	byte[] avatarImage = null;
    	
    	if (!(authentication instanceof AnonymousAuthenticationToken)) {
    		User user = userService.findUserByEmail(authentication.getName());
    		imageEntity = imageService.findByUser(user);
            if (imageEntity!=null) {
            	avatarImage = imageEntity.getImage();
			}else {
				try {
					File file = new ClassPathResource("static/assets/img/avatar-big.png").getFile();
					LOGGER.info("file :"+file.getName());
					byte[] defaultAvatarImage = Files.readAllBytes(file.toPath());
					avatarImage = defaultAvatarImage;
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
    	}
    	
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);

        return new ResponseEntity<byte[]> (avatarImage, headers, HttpStatus.CREATED);
        
    }

    
    // ============== NON-API ============
    private String getAppUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }
    
}
