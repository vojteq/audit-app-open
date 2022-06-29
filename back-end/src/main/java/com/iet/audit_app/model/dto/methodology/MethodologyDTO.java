package com.iet.audit_app.model.dto.methodology;

public class MethodologyDTO {

    private long methodologyId;
    private String methodologyName;

    public MethodologyDTO(long methodologyId, String methodologyName) {
        this.methodologyId = methodologyId;
        this.methodologyName = methodologyName;
    }

    public long getMethodologyId() {
        return methodologyId;
    }

    public String getMethodologyName() {
        return methodologyName;
    }
}
