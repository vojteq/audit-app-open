package com.iet.audit_app.model.entity;

import com.iet.audit_app.model.enums.Role;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table( name = "employee" )
public class Employee {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    private long id;

    private String firstName;

    private String lastName;

    private boolean isActive;

    private String email;

    private String password;

    //    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
//    @JoinTable(name = "roles", joinColumns = @JoinColumn(name = "id"))
//    @Column(name = "roles", nullable = false)
    @Enumerated( EnumType.STRING )
    private Role role;

    @ManyToOne
    private Team team;


    public Employee() {
    }

    public Employee(long id, String firstName, String lastName, boolean isActive, String email, String password,
                    Role role, Team team) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = isActive;
        this.email = email;
        this.password = password;
        this.role = role;
        this.team = team;
    }

    public Employee(String firstName, String lastName, boolean isActive, String email, String password,
                    Role role, Team team) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = isActive;
        this.email = email;
        this.password = password;
        this.role = role;
        this.team = team;
    }

    public String getFullName() {
        return this.firstName + " " + this.lastName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
}
