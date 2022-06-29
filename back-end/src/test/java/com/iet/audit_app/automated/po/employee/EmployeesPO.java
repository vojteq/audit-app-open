package com.iet.audit_app.automated.po.employee;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

import static com.iet.audit_app.automated.TestUtils.clickElementById;
import static com.iet.audit_app.automated.TestUtils.getElementById;
import static com.iet.audit_app.automated.TestUtils.waitUntil;

public class EmployeesPO {

    private static final String EMPLOYEE_TABLE_ID = "employeesTable";

    private final WebDriver webDriver;

    public EmployeesPO(WebDriver webDriver) {
        this.webDriver = webDriver;
    }

    public EmployeesCreationForm openEmployeeCreationForm() {
        clickElementById(webDriver, "addEmployeeButton");
        return new EmployeesCreationForm(webDriver);
    }

    public WebElement getTable() {
        waitUntil(webDriver, EMPLOYEE_TABLE_ID);
        return getElementById(webDriver, EMPLOYEE_TABLE_ID);
    }

    public List<WebElement> getRows() {
        return getTable().findElements(By.name("employeesTableRow"));
    }

    public WebElement getLastRow() {
        List<WebElement> rows = getRows();
        if (rows.isEmpty()) {
            return null;
        }
        return getRows().get(rows.size() - 1);
    }
}
