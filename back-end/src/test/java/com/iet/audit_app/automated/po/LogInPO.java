package com.iet.audit_app.automated.po;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import static com.iet.audit_app.automated.TestUtils.clickElementById;
import static com.iet.audit_app.automated.TestUtils.getElementById;
import static com.iet.audit_app.automated.TestUtils.waitUntil;

public class LogInPO {

    private static final String LOG_IN_URL = "http://localhost:3000/zaloguj";

    private static final String USERNAME = "test@user.com";

    private static final String PASSWORD = "test";

    private static final String LOG_IN_BUTTON = "logInButton";

    private final WebDriver webDriver;

    public LogInPO(WebDriver webDriver) {
        this.webDriver = webDriver;
    }

    public NavBarPO logIn() {
        webDriver.get(LOG_IN_URL);
        waitUntil(webDriver, LOG_IN_BUTTON);
        getElementById(webDriver, "emailInput").sendKeys(USERNAME);
        getElementById(webDriver, "passwordInput").sendKeys(PASSWORD);
        clickElementById(webDriver, LOG_IN_BUTTON);
        return new NavBarPO(webDriver);
    }

    public WebElement getLogInButton() {
        return getElementById(webDriver, LOG_IN_BUTTON);
    }
}
