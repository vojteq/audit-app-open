package com.iet.audit_app.model.enums;

public enum Acceptance {

    PENDING("Pending"), ACCEPTED("Accepted"), REJECTED("Rejected");

    public final String acceptance;

    Acceptance(String acceptance) {
        this.acceptance = acceptance;
    }
}
