package info.dia.security;

public interface ISecurityUserService {

    String validatePasswordResetToken(long id, String token);

}
