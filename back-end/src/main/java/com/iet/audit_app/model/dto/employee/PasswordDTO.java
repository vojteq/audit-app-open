package com.iet.audit_app.model.dto.employee;

public class PasswordDTO {

    private final String oldPassword;

    private final String newPassword;

    public PasswordDTO(String oldPassword, String newPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }
}
