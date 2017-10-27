package info.dia.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.mysema.query.BooleanBuilder;
import com.mysema.query.types.Predicate;
import com.mysema.query.types.path.PathBuilder;

import info.dia.persistence.dao.PasswordResetTokenRepository;
import info.dia.persistence.dao.RoleRepository;
import info.dia.persistence.dao.UserRepository;
import info.dia.persistence.dao.VerificationTokenRepository;
import info.dia.persistence.model.PasswordResetToken;
import info.dia.persistence.model.QUser;
import info.dia.persistence.model.Role;
import info.dia.persistence.model.User;
import info.dia.persistence.model.VerificationToken;
import info.dia.web.dto.UserDto;
import info.dia.web.dto.UserSearchDTO;
import info.dia.web.dto.UserStatusDto;
import info.dia.web.dto.UsersDto;
import info.dia.web.error.UserAlreadyExistException;



@Service
@Transactional
public class UserService implements IUserService {

	
	private final Logger LOGGER = LoggerFactory.getLogger(getClass());
	
    @Autowired
    private UserRepository repository;

    @Autowired
    private VerificationTokenRepository tokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    public static final String TOKEN_INVALID = "invalidToken";
    public static final String TOKEN_EXPIRED = "expired";
    private static final String TOKEN_VALID = "valid";
    
    
   
    // API
    @Override
    public User registerNewUserAccount(final UserDto accountDto) {
    	
        if (emailExist(accountDto.getEmail())) {
            throw new UserAlreadyExistException("There is an account with that email adress: " + accountDto.getEmail());
        }
        
        final User user = new User();

        user.setFirstName(accountDto.getFirstName());
        user.setLastName(accountDto.getLastName());
        user.setPassword(passwordEncoder.encode(accountDto.getPassword()));
        user.setEmail(accountDto.getEmail());
        user.setRoles(Arrays.asList(roleRepository.findByName("ROLE_STUDENT")));
        
        return repository.save(user);
    }

    @Override
    public User getUser(final String verificationToken) {
        final VerificationToken token = tokenRepository.findByToken(verificationToken);
        if (token != null) {
            return token.getUser();
        }
        return null;
    }

    @Override
    public VerificationToken getVerificationToken(final String VerificationToken) {
        return tokenRepository.findByToken(VerificationToken);
    }

    @Override
    public void saveRegisteredUser(final User user) {
        repository.save(user);
    }

    @Override
    public void deleteUser(final User user) {
        final VerificationToken verificationToken = tokenRepository.findByUser(user);

        if (verificationToken != null) {
            tokenRepository.delete(verificationToken);
        }

        final PasswordResetToken passwordToken = passwordTokenRepository.findByUser(user);

        if (passwordToken != null) {
            passwordTokenRepository.delete(passwordToken);
        }

        repository.delete(user);
    }

    @Override
    public void createVerificationTokenForUser(final User user, final String token) {
        final VerificationToken myToken = new VerificationToken(token, user);
        tokenRepository.save(myToken);
    }

    @Override
    public VerificationToken generateNewVerificationToken(final String existingVerificationToken) {
        VerificationToken vToken = tokenRepository.findByToken(existingVerificationToken);
        vToken.updateToken(UUID.randomUUID().toString());
        vToken = tokenRepository.save(vToken);
        return vToken;
    }

    @Override
    public void createPasswordResetTokenForUser(final User user, final String token) {
        final PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordTokenRepository.save(myToken);
    }

    @Override
    public User findUserByEmail(final String email) {
        return repository.findByEmail(email);
    }

    @Override
    public PasswordResetToken getPasswordResetToken(final String token) {
        return passwordTokenRepository.findByToken(token);
    }

    @Override
    public User getUserByPasswordResetToken(final String token) {
        return passwordTokenRepository.findByToken(token).getUser();
    }

    @Override
    public User getUserByID(final long id) {
        return repository.findOne(id);
    }

    @Override
    public void changeUserPassword(final User user, final String password) {
        user.setPassword(passwordEncoder.encode(password));
        repository.save(user);
    }

    @Override
    public boolean checkIfValidOldPassword(final User user, final String oldPassword) {
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }

    @Override
    public String validateVerificationToken(String token) {
    	
        final VerificationToken verificationToken = tokenRepository.findByToken(token);
        
        
        if (verificationToken == null) {
            return TOKEN_INVALID;
        }

        final User user = verificationToken.getUser();
        final Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            /*tokenRepository.delete(verificationToken);*/
            return TOKEN_EXPIRED;
        }

        user.setEnabled(true);
        // tokenRepository.delete(verificationToken);
        repository.save(user);
        return TOKEN_VALID;
    }
    
    private boolean emailExist(final String email) {
        final User user = repository.findByEmail(email);
        if (user != null) {
            return true;
        }
        return false;
    }
	

	@Override
	public List<User> findByRoles(String name) {
		return repository.findByRolesName(name);
	}

	@Override
	public List<User> findByRolesNameAndEmailIgnoreCaseContainingOrFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContaining(
			String roleName, String email, String firstName, String lastName) {
		return repository.findByRolesNameAndEmailIgnoreCaseContainingOrFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContaining(roleName, email, firstName, lastName);
	}

	@Override
	public Iterable<User> searchEmail(String filter) {
		
		QUser qUser = QUser.user;
		Predicate predicate = qUser.email.containsIgnoreCase(filter)
				   .and(qUser.roles.any().name.eq("ROLE_STUDENT"));
		
		
		return repository.findAll(predicate);
	}

	@Override
	public List<UserStatusDto> registerNewUserAccounts(UsersDto usersDto) {
		List<UserStatusDto> users = null;
		if (!StringUtils.isEmpty(usersDto.getEmails())) {
			users = new ArrayList<>();
			List<String> emailList = Arrays.asList(usersDto.getEmails().split("\\s*,\\s*"));
			for (String email : emailList) {
				UserStatusDto usersDtoStatus = new UserStatusDto();
				usersDtoStatus.setEmail(email);
				if (!emailExist(email)) {
					User user = new User();
					user.setEmail(email);
					for (Role role : usersDto.getRoles()) {
						user.setRoles(Arrays.asList(roleRepository.findByName(role.getName())));
						usersDtoStatus.setRoleName(role.getName());
					}
					user.setPassword(passwordEncoder.encode(email));
					user.setEnabled(true);
					repository.save(user);
					usersDtoStatus.setUserCreateOrNot(true);
		        }else {
		        	usersDtoStatus.setRoleName("");
					usersDtoStatus.setUserCreateOrNot(false);
				}
				users.add(usersDtoStatus);
			}
		}
		return users;
	}

	@Override
	public Page<User> getAllUser(Pageable pageable) {
		return repository.findAll(pageable);
	}

	@Override
	public Page<User> searchUser(UserSearchDTO searchDTO, Pageable pageable) {
		// TODO User search method
		
		LOGGER.info("UserSearchDTO :"+searchDTO.getSearchString());
		final String[] parts = searchDTO.getSearchString().split("\\s+");
		LOGGER.info("search string parts length:"+parts.length);
		BooleanBuilder b = new BooleanBuilder();
		QUser qUser = QUser.user;
		
		BooleanBuilder firstNameBooleanBuilder = new BooleanBuilder();
		if(parts.length >= 2){
			for (String string : parts) {
				firstNameBooleanBuilder = firstNameBooleanBuilder.or(qUser.firstName.containsIgnoreCase(string));
			}
		}else{
			firstNameBooleanBuilder = firstNameBooleanBuilder.or(qUser.firstName.containsIgnoreCase(searchDTO.getSearchString()));
		}
		
		
		
		BooleanBuilder lastNameBooleanBuilder = new BooleanBuilder();
		if(parts.length >= 2){
			for (String string : parts) {
				lastNameBooleanBuilder = lastNameBooleanBuilder.or(qUser.lastName.containsIgnoreCase(string));
			}
		}else{
			lastNameBooleanBuilder = firstNameBooleanBuilder.or(qUser.lastName.containsIgnoreCase(searchDTO.getSearchString()));
		}
		
		if (searchDTO!=null) {
			if (!StringUtils.isEmpty(searchDTO.getSearchString()) && searchDTO.getStatus()!=null) {
				b = b.and(qUser.email.containsIgnoreCase(searchDTO.getSearchString())
						.or(firstNameBooleanBuilder)
						.or(lastNameBooleanBuilder)
						.or(qUser.enabled.eq(searchDTO.getStatus())));
			}else if (!StringUtils.isEmpty(searchDTO.getSearchString())) {
				b = b.and(qUser.email.containsIgnoreCase(searchDTO.getSearchString())
							.or(firstNameBooleanBuilder)
							.or(lastNameBooleanBuilder));
			}else if (searchDTO.getStatus()!=null) {
				b = b.and(qUser.enabled.eq(searchDTO.getStatus()));
			}
		}
		return repository.findAll(b,pageable);
	}

	@Override
	public long countAllUser() {
		// TODO Count all user
		return repository.count();
	}

}