package info.dia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import info.dia.persistence.dao.ImageEntityRepository;
import info.dia.persistence.model.ImageEntity;
import info.dia.persistence.model.User;

@Service
@Transactional
public class ImageService implements IImageService{
	
	@Autowired
	private ImageEntityRepository  imageEntityRepository;

	@Override
	public void uploadImage(ImageEntity image) {
		imageEntityRepository.save(image);
	}

	@Override
	public ImageEntity findByUser(User user) {
		return imageEntityRepository.findByUser(user);
	}

}
