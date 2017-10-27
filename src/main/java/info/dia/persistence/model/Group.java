package info.dia.persistence.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "group_")
public class Group {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private String name;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat ( pattern="M/dd/yyyy hh:mm:ss a")
	private Date createDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat ( pattern="M/dd/yyyy hh:mm:ss a")
	private Date modifiedDate;
	
	
	@OneToMany(mappedBy = "group", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private Set<GroupDetails> groupDetails;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private User user;
	

	public Group() {
		
	}
	
	public Group(String name) {
		this.name = name;
	}


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

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public Set<GroupDetails> getGroupDetails() {
		return groupDetails;
	}

	public void setGroupDetails(Set<GroupDetails> groupDetails) {
		this.groupDetails = groupDetails;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	
	
	@Override
	public String toString() {
		String result = String.format("Group[id=%d, name='%s']%n",id, name);
        if (groupDetails != null) {
            for(GroupDetails groupDetails : groupDetails) {
                result += String.format("GroupDetails[id=%d, email='%s']%n",groupDetails.getId(), groupDetails.getEmail());
            }
        }
        
        return result;
	}

	


}
