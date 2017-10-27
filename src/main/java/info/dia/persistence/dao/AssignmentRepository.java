package info.dia.persistence.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;

import info.dia.persistence.model.Assignment;
import info.dia.persistence.model.User;

public interface AssignmentRepository extends JpaRepository<Assignment, Long>,QueryDslPredicateExecutor<Assignment>{

	//Assignment by user
	Page<Assignment> findAllByUser(User user,Pageable pageable);
	
	Page<Assignment> findAllByUserAndStatus(User user,boolean status,Pageable pageable);
	
	
	Page<Assignment> findByTitleLikeIgnoreCase(User user,String title,Pageable pageable);
	
	Page<Assignment> findByStatus(User user,boolean status,Pageable pageable);
	
	Assignment findByIdAndUserId(long id,long userId);
	
	Assignment findByUserAndTitleIgnoreCase(User user,String title);
	
	int countByUserId(long userId);
	
	int countByUserIdAndStatusTrue(long userId);
	
	int countByUserIdAndStatusFalse(long userId);
	
}
