package com.iet.audit_app.model.dto.suspension;


import com.iet.audit_app.model.entity.Suspension;

import java.time.LocalDate;

public class SuspensionDTO {

    private final LocalDate dateFrom;
    private final LocalDate dateTo;
    private final String reason;

    public SuspensionDTO(LocalDate dateFrom, LocalDate dateTo, String reason) {
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.reason = reason;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public String getReason() {
        return reason;
    }

    public SuspensionDTO(Suspension suspension) {
        this.dateFrom = suspension.getDateFrom();
        this.dateTo = suspension.getDateTo();
        this.reason = suspension.getReason();
    }
}
