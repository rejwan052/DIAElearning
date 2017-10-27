package info.dia.web.util;

import java.util.ArrayList;
import java.util.List;

import info.dia.persistence.model.Document;
import info.dia.web.dto.DocumentDto;

public class DocumentMapper {

	public static DocumentDto map(Document document){
		
		DocumentDto dto = new DocumentDto();
		
		dto.setId(document.getId());
		dto.setAssignmentId(document.getAssignment().getId());
		dto.setLocation(document.getLocation()+"\\"+document.getName());
		dto.setName(document.getName());
		dto.setSize(document.getSize());
		dto.setStatus(document.getStatus());
		dto.setType(document.getType());
		dto.setUserId(document.getUserId());
		
		return dto;
	}
	
	
	public static List<DocumentDto> map(List<Document> assignments){
		List<DocumentDto> list = new ArrayList<>();
		for (Document document : assignments) {
			list.add(map(document));
		}
		return list;
	}
	
}
