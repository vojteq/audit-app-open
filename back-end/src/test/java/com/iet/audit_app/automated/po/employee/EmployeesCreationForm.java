package com.iet.audit_app.automated.po.employee;

import org.openqa.selenium.WebDriver;

import static com.iet.audit_app.automated.TestUtils.clickElementById;
import static com.iet.audit_app.automated.TestUtils.getElementById;
import static com.iet.audit_app.automated.TestUtils.getSelectById;
import static com.iet.audit_app.automated.TestUtils.waitUntil;

public class EmployeesCreationForm {

    private final WebDriver webDriver;

    public EmployeesCreationForm(WebDriver webDriver) {
        this.webDriver = webDriver;
    }

    public EmployeesPO fillAndSendForm(String firstName, String lastName, String email, String role, String companyName,
                                       String teamName) {
        waitUntil(webDriver, "newEmployeeForm");
        fillInput("firstNameInput", firstName);
        fillInput("lastNameInput", lastName);
        fillInput("emailInput", email);
        fillSelect("roleSelect", role);
        fillSelect("companySelect", companyName);
        fillSelect("teamSelect", teamName);
        clickElementById(webDriver, "addEmployeeButton");
        return new EmployeesPO(webDriver);
    }

    private void fillInput(String id, String value) {
        getElementById(webDriver, id).sendKeys(value);
    }

    private void fillSelect(String id, String value) {
        getSelectById(webDriver, id).selectByVisibleText(value);
    }
}
