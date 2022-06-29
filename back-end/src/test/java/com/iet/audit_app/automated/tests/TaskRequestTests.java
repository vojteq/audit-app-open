package com.iet.audit_app.automated.tests;

import com.iet.audit_app.automated.po.LogInPO;
import com.iet.audit_app.automated.po.NavBarPO;
import com.iet.audit_app.automated.po.all_task_requests.AllTaskRequestsPO;
import com.iet.audit_app.automated.po.all_task_requests.AllTaskRequestsProcessFormPO;
import com.iet.audit_app.automated.po.task_request.YourTaskRequestFormPO;
import com.iet.audit_app.automated.po.task_request.YourTaskRequestsPO;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.iet.audit_app.automated.TestUtils.closeWindow;
import static com.iet.audit_app.automated.TestUtils.getTextsFromCells;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertNotNull;
import static org.testng.Assert.assertTrue;

public class TaskRequestTests {

    private final WebDriver webDriver;

    private NavBarPO navBarPO;

    public TaskRequestTests() {
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

    @Test( singleThreaded = true, priority = 0 )
    public void createTaskRequestTest() {
        String taskName = "test_task_1";
        String methodology = "Agile";
        String type = "Kontrolne";
        String typeAdHoc = "Doraźne";
        LocalDate startDate = LocalDate.now();
        LocalDate plannedFinishDate = startDate.plusDays(30);
        List<String> auditedCompanies = new ArrayList<>() {{
            add("Towary Wydobycie S.A.");
            add("Towary Polska Energia S.A.");
        }};

        YourTaskRequestsPO yourTaskRequestsPO = navBarPO.openYourTaskRequestsTab();

        YourTaskRequestFormPO yourTaskRequestFormPO = yourTaskRequestsPO.openRequestCreationForm();

        yourTaskRequestFormPO.fillAndSendForm(taskName, methodology, type, typeAdHoc, startDate, plannedFinishDate,
                auditedCompanies);

        yourTaskRequestsPO.waitForLoad();

        yourTaskRequestsPO = navBarPO.openYourTaskRequestsTab();

        List<WebElement> lastRowCells = yourTaskRequestsPO.getCellsFromLastRow();
        assertNotNull(lastRowCells);
        assertFalse(lastRowCells.isEmpty());

        List<String> lastRowCellsText = getTextsFromCells(lastRowCells);
        assertFalse(lastRowCellsText.isEmpty());
        assertEquals(lastRowCellsText.size(), 6);

        assertEquals(taskName, lastRowCellsText.get(0));
        assertEquals(lastRowCellsText.get(1), type);
        assertEquals(lastRowCellsText.get(2), methodology);
        assertEquals(lastRowCellsText.get(3), typeAdHoc);
        String auditedCompaniesText = lastRowCellsText.get(4);
        for (String company : auditedCompanies) {
            assertTrue(auditedCompaniesText.contains(company));
        }
        assertEquals(lastRowCellsText.get(5), "Oczekujący");
    }

    @Test( singleThreaded = true, priority = 1 )
    public void acceptTaskRequestTest() {
        String taskName = "test_task_2";
        String methodology = "Agile";
        String type = "Kontrolne";
        String typeAdHoc = "Doraźne";
        LocalDate startDate = LocalDate.now();
        LocalDate plannedFinishDate = startDate.plusDays(30);
        List<String> auditedCompanies = new ArrayList<>() {{
            add("Towary Wydobycie S.A.");
            add("Towary Polska Energia S.A.");
        }};

        YourTaskRequestsPO yourTaskRequestsPO = navBarPO.openYourTaskRequestsTab();

        YourTaskRequestFormPO yourTaskRequestFormPO = yourTaskRequestsPO.openRequestCreationForm();

        yourTaskRequestsPO = yourTaskRequestFormPO.fillAndSendForm(taskName, methodology, type, typeAdHoc, startDate,
                plannedFinishDate, auditedCompanies);

        yourTaskRequestsPO.waitForLoad();

        AllTaskRequestsPO allTaskRequestsPO = navBarPO.openAllTaskRequestsTab();

        AllTaskRequestsProcessFormPO allTaskRequestsProcessFormPO = allTaskRequestsPO.openTaskRequestProcessForm(taskName);

        allTaskRequestsPO = allTaskRequestsProcessFormPO.acceptTaskRequestForAdHocTask();

        allTaskRequestsPO.waitForLoad();

        yourTaskRequestsPO = navBarPO.openYourTaskRequestsTab();

        yourTaskRequestsPO.waitForLoad();

        WebElement lastRow = yourTaskRequestsPO.getLastRow();
        assertNotNull(lastRow);

        List<WebElement> lastRowCells = yourTaskRequestsPO.getCellsFromLastRow();
        assertNotNull(lastRowCells);
        assertFalse(lastRowCells.isEmpty());

        List<String> lastRowCellsText = getTextsFromCells(lastRowCells);
        assertEquals(lastRowCellsText.get(0), taskName);
        assertEquals(lastRowCellsText.get(1), type);
        assertEquals(lastRowCellsText.get(2), methodology);
        assertEquals(lastRowCellsText.get(3), typeAdHoc);
        String companies = lastRowCellsText.get(4);
        for (String company : auditedCompanies) {
            assertTrue(companies.contains(company));
        }
        assertEquals(lastRowCellsText.get(5), "Zaakceptowany");
    }

    @Test( singleThreaded = true, priority = 2 )
    public void rejectTaskRequestTest() {
        String taskName = "test_task_3";
        String methodology = "Agile";
        String type = "Kontrolne";
        String typeAdHoc = "Doraźne";
        LocalDate startDate = LocalDate.now();
        LocalDate plannedFinishDate = startDate.plusDays(30);
        List<String> auditedCompanies = new ArrayList<>() {{
            add("Towary Wydobycie S.A.");
            add("Towary Polska Energia S.A.");
        }};

        YourTaskRequestsPO yourTaskRequestsPO = navBarPO.openYourTaskRequestsTab();

        YourTaskRequestFormPO yourTaskRequestFormPO = yourTaskRequestsPO.openRequestCreationForm();

        yourTaskRequestFormPO.fillAndSendForm(taskName, methodology, type, typeAdHoc, startDate, plannedFinishDate,
                auditedCompanies);

        AllTaskRequestsPO allTaskRequestsPO = navBarPO.openAllTaskRequestsTab();

        AllTaskRequestsProcessFormPO allTaskRequestsProcessFormPO = allTaskRequestsPO.openTaskRequestProcessForm(taskName);

        allTaskRequestsPO = allTaskRequestsProcessFormPO.rejectTaskRequest();

        allTaskRequestsPO.waitForLoad();

        yourTaskRequestsPO = navBarPO.openYourTaskRequestsTab();

        WebElement lastRow = yourTaskRequestsPO.getLastRow();
        assertNotNull(lastRow);

        List<WebElement> lastRowCells = yourTaskRequestsPO.getCellsFromLastRow();
        assertNotNull(lastRowCells);
        assertFalse(lastRowCells.isEmpty());

        List<String> lastRowCellsText = getTextsFromCells(lastRowCells);

        assertEquals(lastRowCellsText.get(0), taskName);
        assertEquals(lastRowCellsText.get(1), type);
        assertEquals(lastRowCellsText.get(2), methodology);
        assertEquals(lastRowCellsText.get(3), typeAdHoc);
        String auditedCompaniesCellText = lastRowCellsText.get(4);
        for (String company : auditedCompanies) {
            assertTrue(auditedCompaniesCellText.contains(company));
        }
        assertEquals(lastRowCellsText.get(5), "Odrzucony");
    }
}
