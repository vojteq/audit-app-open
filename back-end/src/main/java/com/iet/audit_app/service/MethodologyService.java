package com.iet.audit_app.service;

import com.iet.audit_app.model.dto.methodology.MethodologyDTO;
import com.iet.audit_app.model.entity.Methodology;
import com.iet.audit_app.model.entity.Milestone;
import com.iet.audit_app.model.entity.MilestoneTemplate;
import com.iet.audit_app.repository.MethodologyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MethodologyService {

    private final MethodologyRepository repository;

    private final MilestoneService milestoneService;

    @Autowired
    public MethodologyService(MethodologyRepository repository, MilestoneService milestoneService) {
        this.repository = repository;
        this.milestoneService = milestoneService;
    }

    public List<MethodologyDTO> getAllMethodologyNames() {
        List<Methodology> methodologies = this.repository.findAll();
        List<MethodologyDTO> methodologyDTOS = new ArrayList<>();
        for (Methodology methodology : methodologies) {
            methodologyDTOS.add(new MethodologyDTO(methodology.getId(), methodology.getName()));
        }
        return methodologyDTOS;
    }

    public Methodology getMethodologyById(long id) {
        return this.repository.findById(id)
                .orElseThrow();
    }

    public List<Methodology> getAllMethodologies() {
        return this.repository.findAll();
    }

    public Methodology getMethodologyByName(String name) {
        return this.repository.findByName(name)
                .orElseThrow();
    }

    //    @Transactional(propagation= Propagation.REQUIRED, readOnly=true, noRollbackFor=Exception.class)
    public List<Milestone> getMilestonesForMethodology(long methodologyId) {
        List<Milestone> milestones = new ArrayList<>();


        List<MilestoneTemplate> milestoneTemplates = this.repository.findById(methodologyId)
                .orElseThrow()
                .getMilestoneTemplates();
        for (MilestoneTemplate template : milestoneTemplates) {
            milestones.add(new Milestone(
                    template.getName(),
                    template.getConsecutiveNumber(),
                    template.getTaskShare(),
                    template.isDivisible()
            ));
        }
        return milestones;
    }

    public void save(Methodology methodology) {
        this.repository.save(methodology);
    }
}
