package com.iet.audit_app.model.entity;

import com.iet.audit_app.model.enums.Acceptance;
import com.iet.audit_app.model.enums.TaskType;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table( name = "task_request" )
public class TaskRequest {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY )
    private long id;

//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "Request_Assignment",
//            joinColumns = {@JoinColumn(name = "request_id")},
//            inverseJoinColumns = {@JoinColumn(name = "assignment_id")}
//    )

//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    @JoinColumn(name = "task_assignment_id")
//    private TaskAssignment taskAssignment;

    private String topic;

//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
//    @OneToOne(fetch = FetchType.EAGER)
//    private PlanItem planItem;

    @ManyToOne
    private Employee taskManager;

    private TaskType taskType;

    @ManyToOne
    private Methodology methodology;

    @ManyToMany
    private List<Company> auditedCompanies;

    @ManyToMany
    private List<Employee> teamMembers;

    private LocalDate startDate;

    private LocalDate plannedFinishedDate;

    private Acceptance acceptance;

    private boolean isAdHoc;

    private String externalEmployees;

    public TaskRequest(long id, String topic, Employee taskManager, TaskType taskType, Methodology methodology,
                       List<Company> auditedCompanies, List<Employee> teamMembers, LocalDate startDate,
                       LocalDate plannedFinishedDate, Acceptance acceptance, boolean isAdHoc,
                       String externalEmployees) {
        this.id = id;
        this.topic = topic;
        this.taskManager = taskManager;
        this.taskType = taskType;
        this.methodology = methodology;
        this.auditedCompanies = auditedCompanies;
        this.teamMembers = teamMembers;
        this.startDate = startDate;
        this.plannedFinishedDate = plannedFinishedDate;
        this.acceptance = acceptance;
        this.isAdHoc = isAdHoc;
        this.externalEmployees = externalEmployees;
    }

    public TaskRequest(String topic, Employee taskManager, TaskType taskType, Methodology methodology,
                       List<Company> auditedCompanies, List<Employee> teamMembers, LocalDate startDate,
                       LocalDate plannedFinishedDate, boolean isAdHoc, String externalEmployees) {
        this.topic = topic;
        this.taskManager = taskManager;
        this.taskType = taskType;
        this.methodology = methodology;
        this.auditedCompanies = auditedCompanies;
        this.teamMembers = teamMembers;
        this.startDate = startDate;
        this.plannedFinishedDate = plannedFinishedDate;
        this.acceptance = Acceptance.PENDING;
        this.isAdHoc = isAdHoc;
        this.externalEmployees = externalEmployees;
    }

    public TaskRequest() {
    }

    @Override
    public String toString() {
        return "TaskRequest{" +
                "id=" + id +
                ", topic='" + topic + '\'' +
                ", taskManager=" + taskManager +
                ", taskType=" + taskType +
                ", methodology=" + methodology +
                ", auditedCompanies=" + auditedCompanies +
                ", teamMembers=" + teamMembers +
                ", startDate=" + startDate +
                ", plannedFinishedDate=" + plannedFinishedDate +
                ", acceptance=" + acceptance +
                ", isAdHoc=" + isAdHoc +
                ", externalEmployees='" + externalEmployees + '\'' +
                '}';
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Employee getTaskManager() {
        return taskManager;
    }

    public void setTaskManager(Employee taskManager) {
        this.taskManager = taskManager;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public void setTaskType(TaskType taskType) {
        this.taskType = taskType;
    }

    public Methodology getMethodology() {
        return methodology;
    }

    public void setMethodology(Methodology methodology) {
        this.methodology = methodology;
    }

    public List<Company> getAuditedCompanies() {
        return auditedCompanies;
    }

    public void setAuditedCompanies(List<Company> auditedCompanies) {
        this.auditedCompanies = auditedCompanies;
    }

    public List<Employee> getTeamMembers() {
        return teamMembers;
    }

    public void setTeamMembers(List<Employee> teamMembers) {
        this.teamMembers = teamMembers;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getPlannedFinishedDate() {
        return plannedFinishedDate;
    }

    public void setPlannedFinishedDate(LocalDate plannedFinishedDate) {
        this.plannedFinishedDate = plannedFinishedDate;
    }

    public Acceptance getAcceptance() {
        return acceptance;
    }

    public void setAcceptance(Acceptance acceptance) {
        this.acceptance = acceptance;
    }

    public boolean isAdHoc() {
        return isAdHoc;
    }

    public void setAdHoc(boolean adHoc) {
        isAdHoc = adHoc;
    }

    public String getExternalEmployees() {
        return externalEmployees;
    }

    public void setExternalEmployees(String externalEmployees) {
        this.externalEmployees = externalEmployees;
    }
}
