package com.iet.audit_app.service;


import com.iet.audit_app.model.entity.Suspension;
import com.iet.audit_app.repository.SuspensionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SuspensionService {

    private SuspensionRepository suspensionRepository;

    @Autowired
    public SuspensionService(SuspensionRepository suspensionRepository) {
        this.suspensionRepository = suspensionRepository;
    }

    public Suspension save(Suspension suspension) { return this.suspensionRepository.save(suspension);}

    public List<Suspension> getAll() { return this.suspensionRepository.findAll(); }

    public List<Suspension> getAllByTaskId(long taskId) {
        return this.suspensionRepository.findSuspensionsByTaskId(taskId);
    }

    public Suspension getCurrentSuspension(long taskId) {
        List<Suspension> suspensions = getAllByTaskId(taskId);
        return suspensions.stream()
                          .filter(suspension -> suspension.getDateTo() == null)
                          .findFirst()
                          .orElseThrow(() -> new NoSuchElementException("There are no current suspensions"));
    }

}
