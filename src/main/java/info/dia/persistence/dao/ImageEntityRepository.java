package info.dia.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import info.dia.persistence.model.ImageEntity;
import info.dia.persistence.model.User;

public interface ImageEntityRepository extends JpaRepository<ImageEntity, Long> {
	
	ImageEntity findByUser(User user);

}
