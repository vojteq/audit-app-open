package com.iet.audit_app.automated.po.all_task_requests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

import static com.iet.audit_app.automated.TestUtils.getElementById;
import static com.iet.audit_app.automated.TestUtils.waitUntil;

public class AllTaskRequestsPO {

    private static final String ALL_REQUESTS_TABLE = "allRequestsTable";

    private final WebDriver webDriver;

    public AllTaskRequestsPO(WebDriver webDriver) {
        this.webDriver = webDriver;
    }

    public AllTaskRequestsProcessFormPO openTaskRequestProcessForm(String taskName) {
        waitUntil(webDriver, ALL_REQUESTS_TABLE);
        WebElement row = getRowByTaskName(taskName);
        row.findElement(By.name("processRequestButton"))
                .click();
        return new AllTaskRequestsProcessFormPO(webDriver);
    }

    private WebElement getTable() {
        return getElementById(webDriver, "allRequestsTable");
    }

    private List<WebElement> getRows() {
        return getTable().findElements(By.name("allRequestsTableRow"));
    }

    private WebElement getRowByTaskName(String taskName) {
        return getRows().stream()
                .filter(row -> {
                    List<WebElement> cells = row.findElements(By.tagName("td"));
                    if (cells.isEmpty()) {
                        return false;
                    }
                    return cells.get(0)
                            .getText()
                            .equals(taskName);
                })
                .findFirst()
                .orElse(null);
    }

    private WebElement getLastRow() {
        List<WebElement> rows = getRows();
        return rows.get(rows.size() - 1);
    }

    public void waitForLoad() {
        waitUntil(webDriver, "allTaskRequests");
    }
}
