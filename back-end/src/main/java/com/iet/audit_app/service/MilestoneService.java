package com.iet.audit_app.service;

import com.iet.audit_app.model.dto.milestone.MilestoneUpdateDTO;
import com.iet.audit_app.model.entity.Milestone;
import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.repository.MilestoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;

    @Autowired
    public MilestoneService(MilestoneRepository milestoneRepository) {
        this.milestoneRepository = milestoneRepository;
    }

    public void saveAll(List<Milestone> milestones) {
        this.milestoneRepository.saveAll(milestones);
    }

    public void save(Milestone milestone) {
        this.milestoneRepository.save(milestone);
    }

    public void update(MilestoneUpdateDTO milestoneUpdateDTO, Task task) throws IllegalArgumentException {
        Milestone milestoneToBeUpdated = this.milestoneRepository.findById(milestoneUpdateDTO.getMilestoneId())
                .orElseThrow();
        if (milestoneToBeUpdated.getConsecutiveNumber() > 1) {
            for (Milestone milestone : task.getMilestones()) {
                if (milestone.getConsecutiveNumber() + 1 == milestoneToBeUpdated.getConsecutiveNumber() && !milestone.isDone()) {
                    throw new IllegalArgumentException("Previous milestone is not completed");
                }
            }
        }
        if (!milestoneToBeUpdated.isDivisible() && milestoneUpdateDTO.getPercentageDone() != 100) {
            throw new IllegalArgumentException("Milestone is not divisible");
        }
        milestoneToBeUpdated.setPercentageDone(milestoneUpdateDTO.getPercentageDone());
        if (milestoneToBeUpdated.getPercentageDone() == 100) {
            milestoneToBeUpdated.setDone(true);
        }
        this.milestoneRepository.save(milestoneToBeUpdated);
    }

    public List<Milestone> copyMilestones(List<Milestone> milestones) {
        List<Milestone> finalMilestones = new ArrayList<>();
        for (Milestone milestone : milestones) {
            finalMilestones.add(new Milestone(milestone));
        }
        return finalMilestones;
    }

}
