package com.iet.audit_app.repository;

import com.iet.audit_app.model.entity.MilestoneTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MilestoneTemplateRepository extends JpaRepository<MilestoneTemplate, Long> {
}
