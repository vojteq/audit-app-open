package com.iet.audit_app.automated.tests;

import com.iet.audit_app.automated.po.LogInPO;
import com.iet.audit_app.automated.po.NavBarPO;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import static com.iet.audit_app.automated.TestUtils.closeWindow;
import static org.testng.Assert.assertTrue;

public class LogOutTest {

    private final WebDriver webDriver;

    private NavBarPO navBarPO;

    public LogOutTest() {
        webDriver = new ChromeDriver();
    }

    @BeforeTest
    public void before() {
        navBarPO = new LogInPO(webDriver).logIn();
    }

    @AfterClass
    public void after() {
        closeWindow(webDriver);
    }

    @Test
    public void logOutTest() {
        LogInPO logInPO = navBarPO.logOut();
        WebElement logInButton = logInPO.getLogInButton();
        assertTrue(logInButton.isDisplayed());
    }
}
