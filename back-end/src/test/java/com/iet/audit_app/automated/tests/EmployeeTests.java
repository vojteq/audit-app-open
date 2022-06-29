package com.iet.audit_app.automated.tests;

import com.iet.audit_app.automated.po.LogInPO;
import com.iet.audit_app.automated.po.NavBarPO;
import com.iet.audit_app.automated.po.employee.EmployeesCreationForm;
import com.iet.audit_app.automated.po.employee.EmployeesPO;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import static com.iet.audit_app.automated.TestUtils.closeWindow;
import static org.testng.Assert.assertEquals;

public class EmployeeTests {

    private final WebDriver webDriver;

    private NavBarPO navBarPO;

    public EmployeeTests() {
        this.webDriver = new ChromeDriver();
    }

    @BeforeClass
    public void before() {
        LogInPO logInPO = new LogInPO(webDriver);
        navBarPO = logInPO.logIn();
    }

    @AfterClass
    public void after() {
        navBarPO.logOut();
        closeWindow(webDriver);
    }

    @Test
    public void createEmployeeTest() {
        String firstName = "Adam";
        String lastName = "Kostka";
        String email = "adam.kostka" + Instant.now()
                .toString()
                .replace(":", ".") + "@auditApp.audit";
        String role = "Administrator";
        String company = "Towary Dystrybucja S.A.";
        String team = "TWD";
        EmployeesPO employeesPO = navBarPO.openEmployeesTab();
        int employeesTableSize = employeesPO.getRows()
                .size();
        EmployeesCreationForm employeesCreationForm = employeesPO.openEmployeeCreationForm();
        employeesPO = employeesCreationForm.fillAndSendForm(firstName, lastName, email, role, company, team);

        assertEquals(employeesPO.getRows()
                .size(), employeesTableSize + 1);

        List<String> cells = employeesPO.getLastRow()
                .findElements(By.tagName("td"))
                .stream()
                .map(WebElement::getText)
                .collect(Collectors.toList());

        assertEquals(cells.get(0), firstName);
        assertEquals(cells.get(1), lastName);
        assertEquals(cells.get(2), email);
        assertEquals(cells.get(3), "Aktywny");
        assertEquals(cells.get(4), role);
    }
}
