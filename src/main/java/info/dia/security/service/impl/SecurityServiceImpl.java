package info.dia.security.service.impl;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import info.dia.security.service.SecurityService;

@Service
public class SecurityServiceImpl implements SecurityService {

	@Override
	public Boolean hasTeacherPrivilage() {
		return (SecurityContextHolder.getContext().getAuthentication().getAuthorities().
				contains(new SimpleGrantedAuthority("TEACHER_PRIVILEGE")));
	}

}
