package com.iet.audit_app.model.entity;

import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "methodology")
public class Methodology {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    List<MilestoneTemplate> milestoneTemplates;

    public Methodology(long id, String name, List<MilestoneTemplate> milestoneTemplates) {
        this.id = id;
        this.name = name;
        this.milestoneTemplates = milestoneTemplates;
    }

    public Methodology(String name, List<MilestoneTemplate> milestoneTemplates) {
        this.name = name;
        this.milestoneTemplates = milestoneTemplates;
    }

    public Methodology() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MilestoneTemplate> getMilestoneTemplates() {
        return milestoneTemplates;
    }

    public void setMilestoneTemplates(List<MilestoneTemplate> milestoneTemplates) {
        this.milestoneTemplates = milestoneTemplates;
    }
}
