package com.iet.audit_app.repository;

import com.iet.audit_app.model.entity.Methodology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MethodologyRepository extends JpaRepository<Methodology, Long> {

    Optional<Methodology> findByName(String name);
}
