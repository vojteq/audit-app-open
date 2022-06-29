package com.iet.audit_app.automated.tests;

import com.iet.audit_app.automated.po.LogInPO;
import com.iet.audit_app.automated.po.NavBarPO;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterClass;
import org.testng.annotations.Test;

import static com.iet.audit_app.automated.TestUtils.closeWindow;
import static org.testng.Assert.assertTrue;

public class LogInTest {

    private final WebDriver webDriver;

    private NavBarPO navBarPO;

    public LogInTest() {
        webDriver = new ChromeDriver();
    }

    @AfterClass
    public void after() {
        navBarPO.logOut();
        closeWindow(webDriver);
    }

    @Test
    public void logInTest() {
        navBarPO = new LogInPO(webDriver).logIn();

        assertTrue(navBarPO.getProfileLink()
                .isDisplayed());
    }

}
