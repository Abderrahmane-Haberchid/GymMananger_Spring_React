package com.gymbackend.services.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.gymbackend.models.Membre;
import com.gymbackend.repository.MembreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3 s3Client;
    private final MembreRepository membreRepository;

    @Value("${application.bucket.name}")
    private String bucketName;
    public void uploadtos3(MultipartFile file, Long id) throws IOException {

        Membre membre = membreRepository.findById(id).get();
        String imgName = file.getOriginalFilename();
        String imageName = System.currentTimeMillis() + "_" +imgName;

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        objectMetadata.setContentLength(file.getSize());

        PutObjectRequest request = new PutObjectRequest(bucketName, imageName, file.getInputStream(), objectMetadata);
        s3Client.putObject(request);

        membre.setImage(imageName);
        membreRepository.save(membre);
    }

//    public byte [] downloadfroms3(Long id) throws IOException {
//
//        Membre membre = membreRepository.findById(id).get();
//        String imageName = membre.getImage();
//
//        S3Object s3Object = s3Client.getObject(bucketName, imageName);
//        S3ObjectInputStream s3ObjectInputStream = s3Object.getObjectContent();
//
//        return IOUtils.toByteArray(s3ObjectInputStream);
//    }
}
