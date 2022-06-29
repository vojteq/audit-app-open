package com.iet.audit_app.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.iet.audit_app.model.utils.YearConverter;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.time.Year;

@Entity
@Table(name = "plan")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    @Convert(converter = YearConverter.class)
    private Year year;

    private boolean unfinishedTasksMoved = false;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    private Team auditingTeam;

    public Plan(long id, String name, Year year, Team auditingTeam) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.auditingTeam = auditingTeam;
    }

    public Plan(String name, Year year, Team auditingTeam) {
        this.name = name;
        this.year = year;
        this.auditingTeam = auditingTeam;
    }

    public Plan() {
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

    public Year getYear() {
        return year;
    }

    public void setYear(Year year) {
        this.year = year;
    }

    @Transactional
    public Team getAuditingTeam() {
        return auditingTeam;
    }

    public void setAuditingTeam(Team auditingTeam) {
        this.auditingTeam = auditingTeam;
    }

    public boolean isUnfinishedTasksMoved() {
        return unfinishedTasksMoved;
    }

    public void setUnfinishedTasksMoved(boolean unfinishedTasksMoved) {
        this.unfinishedTasksMoved = unfinishedTasksMoved;
    }
}
