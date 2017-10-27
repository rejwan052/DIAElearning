package info.dia.authentication;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacade implements IAuthenticationFacade{

	public Authentication getAuthentication() {
		// TODO Auto-generated method stub
		return SecurityContextHolder.getContext().getAuthentication();
	}

	

}
