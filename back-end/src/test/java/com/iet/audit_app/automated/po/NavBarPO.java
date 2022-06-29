package com.iet.audit_app.automated.po;

import com.iet.audit_app.automated.TestUtils;
import com.iet.audit_app.automated.po.all_task_requests.AllTaskRequestsPO;
import com.iet.audit_app.automated.po.all_tasks.AllTasksPO;
import com.iet.audit_app.automated.po.employee.EmployeesPO;
import com.iet.audit_app.automated.po.task_request.YourTaskRequestsPO;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import static com.iet.audit_app.automated.TestUtils.clickElementById;
import static com.iet.audit_app.automated.TestUtils.getElementById;

public class NavBarPO {

    private final WebDriver webDriver;

    public NavBarPO(WebDriver webDriver) {
        this.webDriver = webDriver;
    }

    public YourTaskRequestsPO openYourTaskRequestsTab() {
        openExecutionDropdown();
        clickElementById(webDriver, "yourRequestsLink");
        return new YourTaskRequestsPO(webDriver);
    }

    public AllTaskRequestsPO openAllTaskRequestsTab() {
        openExecutionDropdown();
        clickElementById(webDriver, "allRequestsLink");
        return new AllTaskRequestsPO(webDriver);
    }

    public AllTasksPO openAllTasksTab() {
        openMonitoringDropdown();
        clickElementById(webDriver, "allTasksLink");
        return new AllTasksPO(webDriver);
    }

    public EmployeesPO openEmployeesTab() {
        openManagementDropdown();
        clickElementById(webDriver, "employees");
        return new EmployeesPO(webDriver);
    }

    public LogInPO logOut() {
        clickElementById(webDriver, "logOutLink");
        return new LogInPO(webDriver);
    }

    public WebElement getProfileLink() {
        return getElementById(webDriver, "profileLink");
    }

    private void openExecutionDropdown() {
        clickElementById(webDriver, "execution");
    }

    private void openMonitoringDropdown() {
        clickElementById(webDriver, "monitoring");
    }

    private void openManagementDropdown() {
        clickElementById(webDriver, "management");
    }
}
