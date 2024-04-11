package com.gymbackend.repository;

import com.gymbackend.models.Supplements;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SupplementsRepository extends JpaRepository<Supplements, Long> {
        List<Supplements> findByType(String type);
        List<Supplements> findByTypeAndMarque(String type, String marque);

}
