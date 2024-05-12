package com.gymbackend.repository;

import com.gymbackend.models.Paiements;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
@Repository
public interface PaimentsRepository extends JpaRepository<Paiements, Long> {
    @Query(value = "SELECT DISTINCT * FROM paiements p " +
                   "WHERE p.date_expiration < ? " +
                   "ORDER BY p.date_expiration DESC"
    , nativeQuery = true)
     List<Paiements> findExpiredPayments(Date date);

    void deleteById(Long id);
}
