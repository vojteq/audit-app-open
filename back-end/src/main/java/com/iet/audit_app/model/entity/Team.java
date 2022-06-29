package com.iet.audit_app.model.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table( name = "team" )
public class Team {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    private long id;

    private String name;

    private String acronym;

    public Team(long id, String name, String acronym) {
        this.id = id;
        this.name = name;
        this.acronym = acronym;
    }

    public Team(String name, String acronym, boolean active) {
        this.name = name;
        this.acronym = acronym;
    }

    public Team(String name, String acronym) {
        this.name = name;
        this.acronym = acronym;
    }

    public Team() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAcronym() {
        return acronym;
    }

    public void setAcronym(String acronym) {
        this.acronym = acronym;
    }
}
