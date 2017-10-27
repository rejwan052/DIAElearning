package info.dia.web.util;

import info.dia.persistence.model.Assignment;
import info.dia.persistence.model.AssignmentStudent;
import info.dia.web.dto.AssignmentInfoDto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import java.util.ArrayList;
import java.util.List;


public class AssignmentMapper {


    public static AssignmentInfoDto map(Assignment assignment){

        AssignmentInfoDto infoDto = new AssignmentInfoDto();

        infoDto.setId(assignment.getId());
        infoDto.setTitle(assignment.getTitle());
        infoDto.setSession(assignment.getSession());
        infoDto.setSubmitStartDate(assignment.getSubmitStartDate());
        infoDto.setSubmitEndDate(assignment.getSubmitEndDate());
        infoDto.setEmails(assignment.getAssignmentStudents());
        infoDto.setStatus(assignment.getStatus());

        if (assignment.getAssignmentStudents().size()>0){
        	
            infoDto.setTotalNumberOfStudent(assignment.getAssignmentStudents().size());

            int count=0;

            for (AssignmentStudent a: assignment.getAssignmentStudents() ) {
                if (a.isStatus()){
                    count ++;
                }
            }
            infoDto.setTotalNumberOfSubmittedStudent(count);
        }
        
        if (assignment.getAssignmentDocuments().size()>0) {
        	infoDto.setAssignmentDocuments(assignment.getAssignmentDocuments().size());
		}
        
        return infoDto;
    }


    public static List<AssignmentInfoDto> map(Page<Assignment> assignments) {
        List<AssignmentInfoDto> dtos = new ArrayList<AssignmentInfoDto>();
        for (Assignment assignment: assignments) {
            dtos.add(map(assignment));
        }
        return dtos;
    }

}
