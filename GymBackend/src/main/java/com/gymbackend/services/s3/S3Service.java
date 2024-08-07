package com.gymbackend.services.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.gymbackend.models.Membre;
import com.gymbackend.repository.MembreRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;

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

        // Checking if membre already have an image in s3 then delete it
        checkIfImageExistThenDeleteIt(bucketName,membre);

        PutObjectRequest request = new PutObjectRequest(bucketName, imageName, file.getInputStream(), objectMetadata);
        s3Client.putObject(request);


        membre.setImage(imageName);
        membreRepository.save(membre);
    }

    public void checkIfImageExistThenDeleteIt(String bucketName, Membre membre){
        if (!membre.getImage().isEmpty()){
            DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucketName, membre.getImage());
            s3Client.deleteObject(deleteObjectRequest);
        }
    }
}
