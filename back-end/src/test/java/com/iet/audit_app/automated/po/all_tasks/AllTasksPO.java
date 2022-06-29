package com.iet.audit_app.automated.po.all_tasks;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

import static com.iet.audit_app.automated.TestUtils.getElementById;
import static com.iet.audit_app.automated.TestUtils.waitUntil;

public class AllTasksPO {

    private final WebDriver webDriver;

    public AllTasksPO(WebDriver webDriver) {
        this.webDriver = webDriver;
    }

    public WebElement getTable() {
        return getElementById(webDriver, "allTasksTable");
    }

    public List<WebElement> getRows() {
        return getTable().findElements(By.name("allTasksTableRowCollapsed"));
    }

    public WebElement getLastRow() {
        List<WebElement> rows = getRows();
        return rows.get(rows.size() - 1);
    }

    public List<WebElement> getCellsFromLastRow() {
        return getLastRow().findElements(By.tagName("td"));
    }

    public void waitForLoad() {
        waitUntil(webDriver, "allTasksHeader");
    }
}
