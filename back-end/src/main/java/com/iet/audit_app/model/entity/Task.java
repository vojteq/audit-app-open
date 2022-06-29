package com.iet.audit_app.model.entity;

import com.iet.audit_app.model.enums.TaskStatus;
import com.iet.audit_app.model.enums.TaskType;
import com.iet.audit_app.model.utils.YearConverter;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.Year;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Entity
@Table( name = "task" )
public class Task {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    @Column( name = "id" )
    private long id;

    private String wpzID;

    private String topic;

    @Convert( converter = YearConverter.class )
    private Year year;

    private String methodologyName;

    @ManyToOne
    private Employee taskManager;

    @OneToMany( cascade = CascadeType.ALL, orphanRemoval = true )
    List<Milestone> milestones;

    @ManyToMany(fetch = FetchType.EAGER )
    List<Company> auditedCompanies;

    @Enumerated( EnumType.STRING )
    private TaskType taskType;

    private boolean isAdHoc;

    private String description;

    private LocalDate startDate;

    private LocalDate plannedFinishedDate;

    private LocalDate correctedFinishDate;

    private LocalDate finishedDate;

    private String sharepointUrl;

    @Enumerated( EnumType.STRING )
    private TaskStatus status;

    @ManyToMany
    private List<Employee> teamMembers;

    @OneToOne
    private Team team;

    @OneToMany
    private List<Suspension> suspensions = new ArrayList<>();

    private boolean operActionPerformed;

    private String externalEmployees;

    public Task(long id, String wpzID, String topic, Employee taskManager, List<Milestone> milestones,
                List<Company> auditedCompanies, TaskType taskType, String methodologyName, boolean isAdHoc,
                String description, LocalDate startDate, LocalDate plannedFinishedDate, LocalDate correctedFinishDate,
                LocalDate finishedDate, String sharepointUrl, TaskStatus status, List<Employee> teamMembers,
                Team team, String externalEmployees) {
        this.id = id;
        this.wpzID = wpzID;
        this.topic = topic;
        this.taskManager = taskManager;
        this.milestones = milestones;
        this.auditedCompanies = auditedCompanies;
        this.methodologyName = methodologyName;
        this.taskType = taskType;
        this.isAdHoc = isAdHoc;
        this.description = description;
        this.startDate = startDate;
        this.plannedFinishedDate = plannedFinishedDate;
        this.correctedFinishDate = correctedFinishDate;
        this.finishedDate = finishedDate;
        this.sharepointUrl = sharepointUrl;
        this.status = status;
        this.teamMembers = teamMembers;
        this.team = team;
        this.externalEmployees = externalEmployees;
    }

    public Task(String wpzID, String topic, Employee taskManager, List<Milestone> milestones,
                List<Company> auditedCompanies, TaskType taskType, String methodologyName, Year year, boolean isAdHoc,
                String description, LocalDate startDate, LocalDate plannedFinishedDate, LocalDate correctedFinishDate,
                LocalDate finishedDate, String sharepointUrl, TaskStatus status, List<Employee> teamMembers,
                Team team, String externalEmployees) {
        this.wpzID = wpzID;
        this.topic = topic;
        this.taskManager = taskManager;
        this.milestones = milestones;
        this.auditedCompanies = auditedCompanies;
        this.taskType = taskType;
        this.methodologyName = methodologyName;
        this.year = year;
        this.isAdHoc = isAdHoc;
        this.description = description;
        this.startDate = startDate;
        this.plannedFinishedDate = plannedFinishedDate;
        this.correctedFinishDate = correctedFinishDate;
        this.finishedDate = finishedDate;
        this.sharepointUrl = sharepointUrl;
        this.status = status;
        this.teamMembers = teamMembers;
        this.team = team;
        this.externalEmployees = externalEmployees;
    }

    public Task(String wpzID, String topic, Employee taskManager, List<Milestone> milestones,
                List<Company> auditedCompanies, TaskType taskType, String methodologyName, Year year, boolean isAdHoc,
                String description, LocalDate startDate, LocalDate plannedFinishedDate, String sharepointUrl,
                TaskStatus status, List<Employee> teamMembers, Team team, String externalEmployees) {
        this.wpzID = wpzID;
        this.topic = topic;
        this.taskManager = taskManager;
        this.milestones = milestones;
        this.auditedCompanies = auditedCompanies;
        this.taskType = taskType;
        this.methodologyName = methodologyName;
        this.year = year;
        this.isAdHoc = isAdHoc;
        this.description = description;
        this.startDate = startDate;
        this.plannedFinishedDate = plannedFinishedDate;
        this.sharepointUrl = sharepointUrl;
        this.status = status;
        this.teamMembers = teamMembers;
        this.team = team;
        this.externalEmployees = externalEmployees;
    }

    public Task(Task another) {
        this.wpzID = another.wpzID;
        this.topic = another.topic;
        this.taskManager = another.taskManager;
        this.milestones = new ArrayList<>(another.getMilestones());
        this.auditedCompanies = new ArrayList<>(another.getAuditedCompanies());
        this.taskType = another.taskType;
        this.methodologyName = another.methodologyName;
        this.year = another.year;
        this.isAdHoc = another.isAdHoc;
        this.description = another.description;
        this.startDate = another.startDate;
        this.plannedFinishedDate = another.plannedFinishedDate;
        this.sharepointUrl = another.sharepointUrl;
        this.status = another.status;
        this.teamMembers = new ArrayList<>(another.getTeamMembers());
        this.team = another.team;
        this.externalEmployees = another.externalEmployees;
    }

    public Task() {
    }

    public int getPercentageDone() {
        if (getStatus().equals(TaskStatus.NOT_STARTED)) {
            return 0;
        }
        int percentageDone = 0;
        for (Milestone milestone : this.milestones) {
            percentageDone += milestone.getPercentageDone() * milestone.getTaskShare() / 100;
        }
        return percentageDone;
    }

    public List<Milestone> getMilestonesSorted() {
        List<Milestone> milestonesSorted = this.milestones;
        milestonesSorted.sort(Comparator.comparingInt(Milestone::getConsecutiveNumber));
        return milestonesSorted;
    }

    public void addSuspension(Suspension suspension) {
        this.suspensions.add(suspension);
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", wpztID='" + wpzID + '\'' +
                ", topic='" + topic + '\'' +
                ", year=" + year +
                ", methodologyName='" + methodologyName + '\'' +
                ", taskManager=" + taskManager +
                ", milestones=" + milestones +
                ", auditedCompanies=" + auditedCompanies +
                ", taskType=" + taskType +
                ", isAdHoc=" + isAdHoc +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", plannedFinishedDate=" + plannedFinishedDate +
                ", correctedFinishDate=" + correctedFinishDate +
                ", finishedDate=" + finishedDate +
                ", sharepointUrl='" + sharepointUrl + '\'' +
                ", status=" + status +
                ", teamMembers=" + teamMembers +
                ", team=" + team +
                ", suspensions=" + suspensions +
                ", operActionPerformed=" + operActionPerformed +
                ", externalEmployees='" + externalEmployees + '\'' +
                '}';
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getWpzID() {
        return wpzID;
    }

    public void setWpzID(String wpztID) {
        this.wpzID = wpztID;
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

    public List<Milestone> getMilestones() {
        return milestones;
    }

    public void setMilestones(List<Milestone> milestones) {
        this.milestones = milestones;
    }

    public List<Company> getAuditedCompanies() {
        return auditedCompanies;
    }

    public void setAuditedCompanies(List<Company> auditedCompanies) {
        this.auditedCompanies = auditedCompanies;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public void setTaskType(TaskType taskType) {
        this.taskType = taskType;
    }

    public String getMethodologyName() {
        return methodologyName;
    }

    public void setMethodologyName(String methodologyName) {
        this.methodologyName = methodologyName;
    }

    public Year getYear() {
        return year;
    }

    public void setYear(Year year) {
        this.year = year;
    }

    public boolean isAdHoc() {
        return isAdHoc;
    }

    public void setAdHoc(boolean adHoc) {
        isAdHoc = adHoc;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public LocalDate getCorrectedFinishDate() {
        return correctedFinishDate;
    }

    public void setCorrectedFinishDate(LocalDate correctedFinishDate) {
        this.correctedFinishDate = correctedFinishDate;
    }

    public LocalDate getFinishedDate() {
        return finishedDate;
    }

    public void setFinishedDate(LocalDate finishedDate) {
        this.finishedDate = finishedDate;
    }

    public String getSharepointUrl() {
        return sharepointUrl;
    }

    public void setSharepointUrl(String sharepointUrl) {
        this.sharepointUrl = sharepointUrl;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public List<Employee> getTeamMembers() {
        return teamMembers;
    }

    public void setTeamMembers(List<Employee> teamMembers) {
        this.teamMembers = teamMembers;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public boolean isOperActionPerformed() {
        return operActionPerformed;
    }

    public void setOperActionPerformed(boolean operationalActions) {
        this.operActionPerformed = operationalActions;
    }

    public String getExternalEmployees() {
        return externalEmployees;
    }

    public void setExternalEmployees(String externalEmployees) {
        this.externalEmployees = externalEmployees;
    }

    public List<Suspension> getSuspensions() {
        return suspensions;
    }

    public void setSuspensions(List<Suspension> suspensions) {
        this.suspensions = suspensions;
    }
}
