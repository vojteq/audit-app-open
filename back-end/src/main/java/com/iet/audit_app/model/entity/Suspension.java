package com.iet.audit_app.model.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@Entity
public class Suspension {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    @Column( name = "id" )
    private long id;

    private String reason;

    private LocalDate dateFrom;
    private LocalDate dateTo;

    @ManyToOne
    private Task task;

    public Suspension() {
    }

    public Suspension(long id, Task task, String reason, LocalDate suspensionDate) {
        this.id = id;
        this.reason = reason;
        this.dateFrom = suspensionDate;
        this.task = task;
    }

    public Suspension(Task task, String reason, LocalDate suspensionDate) {
        this.reason = reason;
        this.dateFrom = suspensionDate;
        this.task = task;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public void setDateTo(LocalDate suspensionDate) {
        this.dateTo = suspensionDate;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }
}
