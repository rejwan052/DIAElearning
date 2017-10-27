package info.dia.persistence.dao;

import info.dia.persistence.model.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {

    Privilege findByName(String name);

    void delete(Privilege privilege);

}
