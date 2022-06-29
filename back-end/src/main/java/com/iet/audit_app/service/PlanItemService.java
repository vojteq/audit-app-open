package com.iet.audit_app.service;

import com.iet.audit_app.model.dto.plan_item.PlanItemCreateDTO;
import com.iet.audit_app.model.entity.Plan;
import com.iet.audit_app.model.entity.PlanItem;
import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.model.enums.TaskStatus;
import com.iet.audit_app.repository.PlanItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PlanItemService {

    private final PlanItemRepository planItemRepository;

    @Autowired
    public PlanItemService(PlanItemRepository planItemRepository) {
        this.planItemRepository = planItemRepository;
    }

    public void save(PlanItem planItem) {
        this.planItemRepository.save(planItem);
    }

    public PlanItem findPlanItemById(Long id) {
        return planItemRepository.getPlanItemById(id)
                .orElseThrow(() -> new NoSuchElementException("PlanItem does not exist"));
    }

    public PlanItem create(PlanItemCreateDTO planItemCreateDTO, Plan plan) throws NoSuchElementException {
        PlanItem planItem = new PlanItem(
                planItemCreateDTO.getPlanItemTitle(),
                null,
                plan,
                TaskStatus.NOT_STARTED,
                planItemCreateDTO.isAdHoc()
        );
        return this.planItemRepository.save(planItem);
    }

    public void update(PlanItem planItem) {
        this.planItemRepository.save(planItem);
    }

    public void delete(long planItemId) {
        PlanItem planItem = getPlanItemById(planItemId);
        if (planItem.getTask() != null) {
            throw new IllegalArgumentException("Cannot delete plan item connected with task");
        }
        planItemRepository.delete(planItem);
    }

    public List<PlanItem> getPlanItemsByPlanId(long planId) {
        return this.planItemRepository.getAllByPlan_Id(planId);
    }

    public List<PlanItem> getPlanItemsByPlanYear(Year year) {
        return this.planItemRepository.getAllByPlanYear(year);
    }

    public PlanItem getPlanItemById(long id) {
        return this.planItemRepository.getPlanItemById(id)
                .orElseThrow();
    }

    public List<PlanItem> getAll() {
        return this.planItemRepository.findAll();
    }

    public PlanItem getPlanItemByTaskId(long taskId) {
        Optional<PlanItem> optional = this.planItemRepository.getPlanItemByTaskId(taskId);
        return optional.orElse(null);
    }

    public void copyPlanItemToNewPlan(PlanItem oldPlanItem, Task newTask, Plan newPlan) {
        PlanItem newPlanItem = new PlanItem();
        newPlanItem.setPlanItemTitle(oldPlanItem.getPlanItemTitle());
        newPlanItem.setPlan(newPlan);
        newPlanItem.setTask(newTask);
        newPlanItem.setAdHoc(oldPlanItem.isAdHoc());
        newPlanItem.setStatus(oldPlanItem.getStatus());
        oldPlanItem.setStatus(TaskStatus.MOVED);
        this.planItemRepository.save(newPlanItem);
    }

    public void managePlanItemStatus(long taskId, TaskStatus taskStatus) {
        PlanItem planItem = getPlanItemByTaskId(taskId);
        planItem.setStatus(taskStatus);
        this.planItemRepository.save(planItem);
    }

}
