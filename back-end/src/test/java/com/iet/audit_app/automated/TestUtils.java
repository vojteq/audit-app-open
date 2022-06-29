package com.iet.audit_app.automated;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.stream.Collectors;

public final class TestUtils {

    public static final String DATE_PATTERN = "ddMMYYYY";

    public static void waitUntil(WebDriver webDriver, String id) {
        waitUntil(webDriver, 10, ExpectedConditions.presenceOfElementLocated(By.id(id)));
    }

    public static void waitUntil(WebDriver webDriver, By locatedBy) {
        waitUntil(webDriver, 10, ExpectedConditions.presenceOfElementLocated(locatedBy));
    }

    public static void waitUntil(WebDriver webDriver, long seconds, ExpectedCondition<WebElement> condition) {
        try {
            new WebDriverWait(webDriver, seconds).until(condition);
        } catch (Exception e) {
            webDriver.close();
            throw e;
        }
    }

    public static WebElement getElementById(WebDriver webDriver, String id) {
        return getElement(webDriver, By.id(id));
    }

    public static WebElement getElementByName(WebDriver webDriver, String name) {
        return getElement(webDriver, By.name(name));
    }

    public static WebElement getElementByText(WebDriver webDriver, String text) {
        return getElement(webDriver, By.xpath("//*[text()='" + text + "']"));
    }

    private static WebElement getElement(WebDriver webDriver, By locatedBy) {
        waitUntil(webDriver, locatedBy);
        return webDriver.findElement(locatedBy);
    }

    public static Select getSelectById(WebDriver webDriver, String id) {
        return new Select(getElementById(webDriver, id));
    }

    public static void clickElementByName(WebDriver webDriver, String name) {
        clickElement(webDriver, By.name(name));
    }

    public static void clickElementById(WebDriver webDriver, String id) {
        clickElement(webDriver, By.id(id));
    }

    private static void clickElement(WebDriver webDriver, By locatedBy) {
        waitUntil(webDriver, 10, ExpectedConditions.presenceOfElementLocated(locatedBy));
        webDriver.findElement(locatedBy)
                .click();
    }

    public static void closeWindow(WebDriver webDriver) {
        if (webDriver.getWindowHandles() != null && !webDriver.getWindowHandles()
                .isEmpty()) {
            webDriver.close();
        }
    }

    public static List<String> getTextsFromCells(List<WebElement> cells) {
        return cells.stream()
                .map(WebElement::getText)
                .collect(Collectors.toList());
    }
}
