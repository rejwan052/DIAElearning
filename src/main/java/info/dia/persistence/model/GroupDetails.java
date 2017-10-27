package info.dia.persistence.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="groupdetails")
public class GroupDetails {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private String email;
	
	@ManyToOne
    @JoinColumn(name = "group_id")
	@JsonIgnore
	private Group group;
	
	public GroupDetails() {
		
	}
	
	public GroupDetails(String email) {
		super();
		this.email = email;
	}
	@JsonIgnore
	public GroupDetails(String email, Group group) {
		this.email = email;
		this.group = group;
	}



	public long getId() {
		return id;
	}



	public void setId(long id) {
		this.id = id;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public Group getGroup() {
		return group;
	}



	public void setGroup(Group group) {
		this.group = group;
	}

}
