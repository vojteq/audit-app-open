package com.iet.audit_app.common.stats;

import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterStatsForReportsDTO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterTaskStatsForReportsADTO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterTaskStatsForReportsDDTO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterTaskStatsForReportsEDTO;
import com.iet.audit_app.model.entity.Plan;
import com.iet.audit_app.service.PlanService;
import com.iet.audit_app.service.QuarterStatsService;
import com.iet.audit_app.service.quarter_task_stats.QuarterTaskStatsService;
import org.springframework.stereotype.Component;

import java.io.FileInputStream;
import java.io.IOException;

@Component
public class StatsGenerator {

    private final PlanService planService;

    private final QuarterStatsService quarterStatsService;

    private final QuarterTaskStatsService quarterTaskStatsService;

    public StatsGenerator(PlanService planService, QuarterStatsService quarterStatsService,
                          QuarterTaskStatsService quarterTaskStatsService) {
        this.planService = planService;
        this.quarterStatsService = quarterStatsService;
        this.quarterTaskStatsService = quarterTaskStatsService;
    }

    public String generateDirectory(long planId, int quarter) {
        Plan plan = planService.getById(planId);
        return StatsGeneratorUtils.generateDirectory(plan.getAuditingTeam()
                .getAcronym(), plan.getYear()
                .getValue(), quarter);
    }

    public FileInputStream getQuarterStatsStream(long planId, int quarter,
                                                 String directory) throws IOException, InterruptedException {
        generateQuarterReports(planId, quarter, directory);
        String zipPath = StatsGeneratorUtils.zipDirectory(directory);
        return new FileInputStream(zipPath);
    }

    public void deleteGeneratedData(String directoryName) {
        StatsGeneratorUtils.deleteGeneratedData(directoryName);
    }

    private void generateQuarterReports(long planId, int quarter,
                                        String directory) throws IOException, InterruptedException {
        Plan plan = planService.getById(planId);

        QuarterStatsForReportsDTO dto = new QuarterStatsForReportsDTO(
                quarterStatsService.getQuarterStatsByPlanIdAndQuarter(planId, quarter), directory);
        StatsGeneratorUtils.generateDiagram(dto);

        QuarterTaskStatsForReportsADTO dtoA = quarterTaskStatsService.getQuarterTaskStatsForReportADTOByPlanAndQuarter(
                plan, quarter, directory);
        StatsGeneratorUtils.generateTableA(dtoA);

        QuarterTaskStatsForReportsDDTO dtoD = quarterTaskStatsService.getQuarterTaskStatsForReportDDTOByPlanAndQuarter(
                plan, quarter, directory);
        StatsGeneratorUtils.generateTableD(dtoD);

        QuarterTaskStatsForReportsEDTO dtoE = quarterTaskStatsService.getQuarterTaskStatsForReportEDTOByPlanAndQuarter(
                plan, quarter, directory);
        StatsGeneratorUtils.generateTableE(dtoE);
    }
}
