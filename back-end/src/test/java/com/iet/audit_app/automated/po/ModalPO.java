package com.iet.audit_app.automated.po;

import org.openqa.selenium.WebDriver;

import static com.iet.audit_app.automated.TestUtils.clickElementById;

public class ModalPO {

    private final WebDriver webDriver;

    public ModalPO(WebDriver webDriver) {
        this.webDriver = webDriver;
    }

    public void clickConfirmationButton() {
        clickElementById(webDriver, "modalConfirmButton");
    }

    public void clickCancellationButton() {
        clickElementById(webDriver, "modalCancelButton");
    }
}
