package info.dia.web.controller;

import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import info.dia.authentication.IAuthenticationFacade;
import info.dia.persistence.model.Role;
import info.dia.persistence.model.User;
import info.dia.service.IRoleService;
import info.dia.service.IUserService;
import info.dia.web.dto.UserSearchDTO;
import info.dia.web.dto.UserStatusDto;
import info.dia.web.dto.UsersDto;
import info.dia.web.util.GenericResponse;
import info.dia.web.util.HelperUtils;

@Controller
@PreAuthorize("hasAuthority('ADMIN_PRIVILEGE')")
@RequestMapping(value="/admin")
public class AdminController {

	private final Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	private static final int BUTTONS_TO_SHOW = 9;
	private static final int INITIAL_PAGE = 0;
	private static final int INITIAL_PAGE_SIZE = 10;
	private static final int[] PAGE_SIZES = { 10, 20, 30 };
	private static final String DEFAULT_SORT_STRING = "id";
	
	
	@Autowired
	private IRoleService roleService;
	
	
	@Autowired
	private IUserService userService;
	
	
	@Autowired
	private MessageSource messages;
	
	
	@Autowired
    private IAuthenticationFacade authenticationFacade;
	
	
	
	@RequestMapping(value="/allUsers",method=RequestMethod.GET)
	public String getAllUsers(Model model,
			@RequestParam(value = "status", required = false) Boolean status,
			@RequestParam(value = "page", required = false) Integer page,
			@RequestParam(value = "sortString", required = false) String sortString,
			@RequestParam(value = "oldSortString", required = false) String oldSortString,
			@RequestParam(value = "oldDirection", required = false) Direction oldDirection){
		
		PageRequest pageRequest = HelperUtils.createPageRequest(model,page,sortString,oldSortString,oldDirection,INITIAL_PAGE,INITIAL_PAGE_SIZE,DEFAULT_SORT_STRING);
		Page<User> users = userService.getAllUser(pageRequest);
		info.dia.web.util.Pager pager = new info.dia.web.util.Pager(users.getTotalPages(),users.getNumber(),BUTTONS_TO_SHOW);
		
		model.addAttribute("users", users);
		model.addAttribute("pager", pager);
		model.addAttribute("searchDTO", new UserSearchDTO());
		
		return "admin/users";
	}
	
	
	@RequestMapping(value="/allUsersFragments",method=RequestMethod.GET)
	public String getAllUsersFragment(Model model,
			@RequestParam(value = "status", required = false) Boolean status,
			@RequestParam(value = "page", required = false) Integer page,
			@RequestParam(value = "sortString", required = false) String sortString,
			@RequestParam(value = "oldSortString", required = false) String oldSortString,
			@RequestParam(value = "oldDirection", required = false) Direction oldDirection){
		
		PageRequest pageRequest = HelperUtils.createPageRequest(model,page,sortString,oldSortString,oldDirection,INITIAL_PAGE,INITIAL_PAGE_SIZE,DEFAULT_SORT_STRING);
		Page<User> users = userService.getAllUser(pageRequest);
		info.dia.web.util.Pager pager = new info.dia.web.util.Pager(users.getTotalPages(),users.getNumber(),BUTTONS_TO_SHOW);
		
		model.addAttribute("users", users);
		model.addAttribute("pager", pager);
		
		return "fragments/admin/users :: users";
	}
	
	@RequestMapping(value = "/allUsers/search",method=RequestMethod.GET)
	public String search(
			Model model,
			HttpSession session,
			@RequestParam(value = "page", required = false) Integer page,
			@RequestParam(value = "sortString", required = false) String sortString,
			@RequestParam(value = "oldSortString", required = false) String oldSortString,
			@RequestParam(value = "oldDirection", required = false) Direction oldDirection,
			@ModelAttribute("searchDTO") UserSearchDTO searchDTO) {
		
		
		/*LOGGER.info("Search Method Called!"+" with search string :"+searchDTO.getSearchString()+" and boolean value:"+searchDTO.getAssignmentStatus());*/
		
		UserSearchDTO sessionSearchDTO = (UserSearchDTO) session.getAttribute("searchDTO");
		
		if (sessionSearchDTO != null && page != null) {
			searchDTO = sessionSearchDTO;
		}
		
		PageRequest pageRequest = HelperUtils.createPageRequest(model, page,sortString, oldSortString, oldDirection,INITIAL_PAGE,INITIAL_PAGE_SIZE,DEFAULT_SORT_STRING);
		
		return searchUser(model, session, searchDTO, pageRequest);
	}
	
	
	public String searchUser(Model model, HttpSession session, UserSearchDTO searchDTO,PageRequest pageRequest){
		
    		
		Page<User> users = userService.searchUser(searchDTO, pageRequest);	
		info.dia.web.util.Pager pager = new info.dia.web.util.Pager(users.getTotalPages(),users.getNumber(),BUTTONS_TO_SHOW);	
    	
		model.addAttribute("users", users);
		model.addAttribute("pager", pager);
		model.addAttribute("searchDTO", searchDTO != null ? searchDTO: new User());
		model.addAttribute("isSearch", "true");
		session.setAttribute("searchDTO", searchDTO);
		
    	return "admin/users";
	}

	
	
	@RequestMapping(value="/createUser",method=RequestMethod.GET)
	public String createUser(Model model){
		
		UsersDto usersDto = new UsersDto();
		usersDto.setRoles(roleService.getAllRoles());
		
		model.addAttribute("usersDto",usersDto);
		
		
		return "admin/user";
	}
	
	@RequestMapping(value="/createUser",method=RequestMethod.POST)
	public @ResponseBody List<UserStatusDto> createUser(@Valid UsersDto usersDto){
		
		List<UserStatusDto> users = userService.registerNewUserAccounts(usersDto);
    	
		return users;
	}
	
	
	//User account deactivate modal page
	@RequestMapping(value="/updateUser/{id}",method=RequestMethod.GET)
	public String updateUserModal(Model model,@PathVariable Long id,@RequestParam(value = "page", required = false) Integer page){
		
		Authentication authentication = authenticationFacade.getAuthentication();
    	if (!(authentication instanceof AnonymousAuthenticationToken)) {
    		
    		User updateUser = userService.getUserByID(id);
    		
    		model.addAttribute("updateUser", updateUser);
    		model.addAttribute("roles", roleService.getAllRoles());
    		model.addAttribute("page", page);
    	}
		
		return "admin/updateUser";
	}
	
	
	@RequestMapping(value="/updateUser/{id}",method=RequestMethod.POST)
	@ResponseBody
	public GenericResponse updateUser(Model model,final Locale locale,@PathVariable Long id,@RequestParam Map<String, String> reqPar,@RequestParam("roles") Collection<Role> roles){
		
		User updateUser = userService.getUserByID(id);
		
		String firstName = reqPar.get("firstName");
		String lastName = reqPar.get("lastName");
		String email = reqPar.get("email");
		
		
		Boolean active = Boolean.valueOf(reqPar.get("enabled"));
		boolean accountIsenabledOrNot = active.booleanValue();
		
		updateUser.setFirstName(firstName);
		updateUser.setLastName(lastName);
		updateUser.setEmail(email);
		updateUser.setEnabled(accountIsenabledOrNot);
		updateUser.setRoles(roles);
		
		userService.saveRegisteredUser(updateUser);
		
		return new GenericResponse(messages.getMessage("message.userUpdateSucc", null,locale));
	}
	
	
	
	
}
