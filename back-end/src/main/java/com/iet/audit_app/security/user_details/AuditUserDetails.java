package com.iet.audit_app.security.user_details;

import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.enums.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class AuditUserDetails implements UserDetails {

    private Employee employee;
    private Collection<? extends GrantedAuthority> authorities;

    public AuditUserDetails(Employee employee, Collection<? extends GrantedAuthority> authorities) {
        this.employee = employee;
        this.authorities = authorities;
    }

    public Employee getEmployee() {
        return this.employee;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.employee.getPassword();
    }

    @Override
    public String getUsername() {
        return this.employee.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.employee.isActive();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.employee.isActive();
    }
}
