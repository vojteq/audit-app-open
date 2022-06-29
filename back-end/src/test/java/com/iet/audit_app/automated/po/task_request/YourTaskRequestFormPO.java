package com.iet.audit_app.automated.po.task_request;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static com.iet.audit_app.automated.TestUtils.DATE_PATTERN;
import static com.iet.audit_app.automated.TestUtils.clickElementById;
import static com.iet.audit_app.automated.TestUtils.getElementById;
import static com.iet.audit_app.automated.TestUtils.getElementByText;
import static com.iet.audit_app.automated.TestUtils.getSelectById;
import static com.iet.audit_app.automated.TestUtils.waitUntil;

public class YourTaskRequestFormPO {

    private final WebDriver webDriver;

    public YourTaskRequestFormPO(WebDriver webDriver) {
        this.webDriver = webDriver;
    }

    public YourTaskRequestsPO fillAndSendForm(String taskName, String methodology, String type, String typeAdHoc,
                                              LocalDate startDate, LocalDate plannedFinishDate,
                                              List<String> auditedCompanies) {
        waitUntil(webDriver, "taskRequestForm");
        getElementById(webDriver, "taskNameInput").sendKeys(taskName);
        getSelectById(webDriver, "methodologySelect").selectByVisibleText(methodology);
        getSelectById(webDriver, "taskTypeSelect").selectByVisibleText(type);
        getSelectById(webDriver, "taskTypeAdHocSelect").selectByVisibleText(typeAdHoc);
        getElementById(webDriver, "startDateInput").sendKeys(
                startDate.format(DateTimeFormatter.ofPattern(DATE_PATTERN)));
        getElementById(webDriver, "plannedFinishedDateInput").sendKeys(
                plannedFinishDate.format(DateTimeFormatter.ofPattern(DATE_PATTERN)));
        for (String company : auditedCompanies) {
            getElementByText(webDriver, company).click();
        }
        clickElementById(webDriver, "sendRequestButton");
        return new YourTaskRequestsPO(webDriver);
    }
}
