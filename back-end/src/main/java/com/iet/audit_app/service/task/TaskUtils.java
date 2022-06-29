package com.iet.audit_app.service.task;

import com.iet.audit_app.model.dto.task.TaskProgressDTO;
import com.iet.audit_app.model.dto.task_request.TaskRequestAcceptDTO;
import com.iet.audit_app.model.entity.Milestone;
import com.iet.audit_app.model.entity.Plan;
import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.model.enums.TaskStatus;
import com.iet.audit_app.model.enums.TaskType;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public final class TaskUtils {

    public static String generateWpzId(TaskRequestAcceptDTO taskRequestAcceptDTO, Plan plan, List<Task> tasks) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("WPZ");
        if (taskRequestAcceptDTO.getTaskType()
                .equals(TaskType.AUDIT)) {
            stringBuilder.append("A");
        } else {
            stringBuilder.append("K");
        }
        if (taskRequestAcceptDTO.isAdHoc()) {
            stringBuilder.append("D_");
        } else {
            stringBuilder.append("P_");
        }

        stringBuilder.append(tasks.size() + 1);
        stringBuilder.append("/");
        stringBuilder.append(plan.getYear());
        stringBuilder.append("/");
        stringBuilder.append(plan.getAuditingTeam()
                .getAcronym());

        return stringBuilder.toString();
    }

    static boolean checkTask(Task task, String key, List<String> values) {
        String qualifier;
        switch (key) {
            case "manager":
                qualifier = String.valueOf(task.getTaskManager()
                        .getId());
                break;
            case "team":
                qualifier = String.valueOf(task.getTeam()
                        .getId());
                break;
            case "status":
                qualifier = task.getStatus()
                        .name();
                break;
            case "type":
                qualifier = task.getTaskType()
                        .name();
                break;
            case "methodology":
                qualifier = task.getMethodologyName();
                break;
            case "adHoc":
                qualifier = String.valueOf(task.isAdHoc());
                break;
            case "auditedCompanies":
                return verifyAuditedCompanies(task, values);
            case "maxDays":
                return verifyMultipleMaxDaysFilters(task, values);
            default:
                qualifier = null;
        }
        return qualifier != null && values.contains(qualifier);
    }

    private static boolean verifyAuditedCompanies(Task task, List<String> companies) {
        List<String> qualifiers = task.getAuditedCompanies()
                                      .stream()
                                      .map(company -> String.valueOf(company.getId()))
                                      .collect(Collectors.toList());
        for (String id : qualifiers) {
            if (companies.contains(id)) {
                return true;
            }
        }
        return false;
    }

    private static boolean verifyMultipleMaxDaysFilters(Task task, List<String> maxDays) {
        for(String days : maxDays) {
            if(verifyDaysToPlannedFinishedDate(task, days)) {
                return true;
            }
        }
        return false;
    }

    private static boolean verifyDaysToPlannedFinishedDate(Task task, String maxDays) {
        /*we should return only unfinished tasks, that are < maxDays to finishedDate
          or are late > maxDays if given maxDays is negative*/
        if (task.getStatus()
                .equals(TaskStatus.FINISHED)) {
            return false;
        }
        int days = Integer.parseInt(maxDays);
        if(days >= 0) {
            LocalDate newDate = LocalDate.now()
                                         .plusDays(days);
            /*example: between 22.11 and 23.11 returns 1, but between 22.11 and 21.11 returns -1 */
            return ChronoUnit.DAYS.between(task.getPlannedFinishedDate(), newDate) >= 0;
        }
        else {
            days *= -1;
            LocalDate tmpFinishedDate = task.getPlannedFinishedDate().plusDays(days);
            return ChronoUnit.DAYS.between(tmpFinishedDate, LocalDate.now()) >= 0;
        }


    }

    public static TaskProgressDTO getTaskProgress(Task task) {
        int currentMilestoneNumber = task.getMilestones()
                .size() + 1;
        for (Milestone milestone : task.getMilestones()) {
            if (milestone.getConsecutiveNumber() < currentMilestoneNumber && !milestone.isDone()) {
                currentMilestoneNumber = milestone.getConsecutiveNumber();
            }
        }
        return new TaskProgressDTO(
                task.getPercentageDone(),
                currentMilestoneNumber,
                task.getMilestones()
                        .size(),
                task.getMilestonesSorted(),
                task.getStatus(),
                task.getTeam().getId(),
                task.isAdHoc()
        );
    }

    public static String externalEmployeesListToString(List<String> externalEmployees) {
        if (externalEmployees == null || externalEmployees.isEmpty()) {
            return "";
        }
        StringBuilder builder = new StringBuilder();
        for (String externalEmployee : externalEmployees) {
            builder.append(externalEmployee)
                    .append("|");
        }
        return builder.toString();
    }

    public static List<String> externalEmployeesStringToList(String employees) {
        if (employees == null || employees.isEmpty()) {
            return new ArrayList<>();
        }
        return Arrays.asList(employees.split("\\|"));
    }
}
