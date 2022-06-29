package com.iet.audit_app.model.dto.common;

import java.time.LocalDate;

public class DateDTO {
    private LocalDate date;

    public DateDTO(LocalDate date) {
        this.date = date;
    }

    public DateDTO() {
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
