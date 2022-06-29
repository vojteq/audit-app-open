package com.iet.audit_app.automated.po.all_task_requests;

import com.iet.audit_app.automated.po.ModalPO;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;

import static com.iet.audit_app.automated.TestUtils.clickElementById;
import static com.iet.audit_app.automated.TestUtils.getElementById;
import static com.iet.audit_app.automated.TestUtils.getSelectById;

public class AllTaskRequestsProcessFormPO {

    private final WebDriver webDriver;

    public AllTaskRequestsProcessFormPO(WebDriver webDriver) {
        this.webDriver = webDriver;
    }

    public AllTaskRequestsPO acceptTaskRequestForPlannedTask() {
        Select planItemSelect = getSelectById(webDriver, "planItemSelect");
        if (planItemSelect.getOptions()
                .size() < 2) {
            throw new RuntimeException("Can't accept task - there are no plan items to choose");
        }
        planItemSelect.selectByIndex(2);
        return acceptTaskRequest();
    }

    public AllTaskRequestsPO acceptTaskRequestForAdHocTask() {
        return acceptTaskRequest();
    }

    private AllTaskRequestsPO acceptTaskRequest() {
        setSharepointUrl();
        clickElementById(webDriver, "acceptTaskRequestButton");
        return new AllTaskRequestsPO(webDriver);
    }

    public AllTaskRequestsPO rejectTaskRequest() {
        clickElementById(webDriver, "rejectRequestButton");
        new ModalPO(webDriver).clickConfirmationButton();
        return new AllTaskRequestsPO(webDriver);
    }

    private void setSharepointUrl() {
        getElementById(webDriver, "sharepointUrlInput").sendKeys("https://link.com");
    }
}
