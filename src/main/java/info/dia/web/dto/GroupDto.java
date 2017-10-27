package info.dia.web.dto;

import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import info.dia.persistence.model.User;

public class GroupDto {
	
	
	private long id;
	
	
	@NotNull(message="{NotNull.groupDto.name}")
    @Size(min = 1,max=30,message="{Size.groupDto.name}")
	private String name;
	
	private List<User> groupDetailsForm;
	
	@NotNull(message="{NotNull.groupDto.groupDetailsTo}")
    @Size(min = 1,message="{Size.groupDto.groupDetailsTo}")
	private List<User> groupDetailsTo;
    
	
	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public List<User> getGroupDetailsForm() {
		return groupDetailsForm;
	}


	public void setGroupDetailsForm(List<User> groupDetailsForm) {
		this.groupDetailsForm = groupDetailsForm;
	}


	public List<User> getGroupDetailsTo() {
		return groupDetailsTo;
	}


	public void setGroupDetailsTo(List<User> groupDetailsTo) {
		this.groupDetailsTo = groupDetailsTo;
	}

}
