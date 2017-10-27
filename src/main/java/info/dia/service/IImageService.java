package info.dia.service;

import info.dia.persistence.model.ImageEntity;
import info.dia.persistence.model.User;

public interface IImageService {
	
	void uploadImage(ImageEntity image);
	ImageEntity findByUser(User user);

}
