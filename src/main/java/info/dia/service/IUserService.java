package info.dia.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import info.dia.persistence.model.PasswordResetToken;
import info.dia.persistence.model.User;
import info.dia.persistence.model.VerificationToken;
import info.dia.web.dto.UserDto;
import info.dia.web.dto.UserSearchDTO;
import info.dia.web.dto.UserStatusDto;
import info.dia.web.dto.UsersDto;
import info.dia.web.error.UserAlreadyExistException;

public interface IUserService {

    User registerNewUserAccount(UserDto accountDto) throws UserAlreadyExistException;
    
    List<UserStatusDto> registerNewUserAccounts(UsersDto usersDto);

    User getUser(String verificationToken);

    void saveRegisteredUser(User user);

    void deleteUser(User user);

    void createVerificationTokenForUser(User user, String token);

    VerificationToken getVerificationToken(String VerificationToken);

    VerificationToken generateNewVerificationToken(String token);

    void createPasswordResetTokenForUser(User user, String token);

    User findUserByEmail(String email);

    PasswordResetToken getPasswordResetToken(String token);

    User getUserByPasswordResetToken(String token);

    User getUserByID(long id);

    void changeUserPassword(User user, String password);

    boolean checkIfValidOldPassword(User user, String password);

    String validateVerificationToken(String token);

    List<User> findByRoles(String name);
    
    List<User> findByRolesNameAndEmailIgnoreCaseContainingOrFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContaining(String roleName,String email,String firstName,String lastName);
    
    Iterable<User> searchEmail(String filter);
    
    Page<User> getAllUser(Pageable pageable);
    
    Page<User> searchUser(UserSearchDTO searchDTO,Pageable pageable);
    
    //Count all user
    long countAllUser();
    
}

