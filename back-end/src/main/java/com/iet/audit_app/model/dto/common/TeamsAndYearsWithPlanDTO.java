package com.iet.audit_app.model.dto.common;

import com.iet.audit_app.model.dto.team.TeamInfoReducedDTO;

import java.time.Year;
import java.util.List;
import java.util.Map;

public class TeamsAndYearsWithPlanDTO {

    Map<Year, List<TeamInfoReducedDTO>> yearsWithPlan;
    Map<Long, List<Year>> teamsWithPlan;

    public TeamsAndYearsWithPlanDTO(
            Map<Year, List<TeamInfoReducedDTO>> yearsWithPlan,
            Map<Long, List<Year>> teamsWithPlan) {
        this.yearsWithPlan = yearsWithPlan;
        this.teamsWithPlan = teamsWithPlan;
    }

    public Map<Year, List<TeamInfoReducedDTO>> getYearsWithPlan() {
        return yearsWithPlan;
    }

    public Map<Long, List<Year>> getTeamsWithPlan() {
        return teamsWithPlan;
    }

}
