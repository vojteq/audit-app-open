package com.iet.audit_app.service;

import com.iet.audit_app.model.entity.MilestoneTemplate;
import com.iet.audit_app.repository.MilestoneTemplateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MilestoneTemplateService {

    private final MilestoneTemplateRepository milestoneTemplateRepository;

    public MilestoneTemplateService(MilestoneTemplateRepository milestoneTemplateRepository) {
        this.milestoneTemplateRepository = milestoneTemplateRepository;
    }

    public List<MilestoneTemplate> getAll() {
        return this.milestoneTemplateRepository.findAll();
    }

    public void saveAll(List<MilestoneTemplate> milestoneTemplates) {
        this.milestoneTemplateRepository.saveAll(milestoneTemplates);
    }
}
