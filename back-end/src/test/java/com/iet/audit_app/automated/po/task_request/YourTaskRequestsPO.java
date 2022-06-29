package com.iet.audit_app.automated.po.task_request;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.List;

import static com.iet.audit_app.automated.TestUtils.clickElementById;
import static com.iet.audit_app.automated.TestUtils.waitUntil;

public class YourTaskRequestsPO {

    private final WebDriver webDriver;

    public YourTaskRequestsPO(WebDriver webDriver) {
        this.webDriver = webDriver;
    }

    public YourTaskRequestFormPO openRequestCreationForm() {
        clickElementById(webDriver, "openTaskRequestFormButton");
        return new YourTaskRequestFormPO(webDriver);
    }

    public WebElement getTable() {
        By taskRequestsTable = By.id("taskRequestsTable");
        waitUntil(webDriver, 10, ExpectedConditions.presenceOfElementLocated(taskRequestsTable));
        return webDriver.findElement(taskRequestsTable);
    }

    public List<WebElement> getRows() {
        return getTable().findElements(By.name("taskRequestRow"));
    }

    public WebElement getLastRow() {
        List<WebElement> requests = getRows();
        if (requests.isEmpty()) {
            return null;
        }
        return requests.get(requests.size() - 1);
    }

    public List<WebElement> getCellsFromLastRow() {
        return getLastRow().findElements(By.tagName("td"));
    }

    public void waitForLoad() {
        waitUntil(webDriver, "yourRequests");
    }
}
