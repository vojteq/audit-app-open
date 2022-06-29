package com.iet.audit_app.model.dto.team;

import com.iet.audit_app.model.entity.Team;

import java.util.Objects;

public class TeamInfoReducedDTO {

    private long teamId;
    private String teamName;

    public TeamInfoReducedDTO(long teamId, String teamName) {
        this.teamId = teamId;
        this.teamName = teamName;
    }

    public TeamInfoReducedDTO(Team team) {
        this.teamId = team.getId();
        this.teamName = team.getName();
    }

    public long getTeamId() {
        return teamId;
    }

    public void setTeamId(long teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TeamInfoReducedDTO teamInfo = (TeamInfoReducedDTO) o;
        return teamId == teamInfo.teamId && Objects.equals(teamName, teamInfo.teamName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(teamId, teamName);
    }

    @Override
    public String toString() {
        return teamId + "," + teamName;
    }

}
