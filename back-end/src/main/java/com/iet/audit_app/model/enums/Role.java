package com.iet.audit_app.model.enums;

public enum Role {
    ADMIN("ADMIN"),
    EMPLOYEE("EMPLOYEE"),
    MANAGER_KW("MANAGER_KW"),
    MANAGER_AW("MANAGER_AW"),
    MANAGER_TD("MANAGER_TD"),
    DIRECTOR("DIRECTOR");

    public final String stringRole;

    Role(String role) {
        this.stringRole = role;
    }

    public boolean isManager() {
        return this.equals(MANAGER_AW) || this.equals(MANAGER_TD) || this.equals(MANAGER_KW);
    }

}
