package com.iet.audit_app.service.quarter_task_stats;


import com.iet.audit_app.model.dto.quarter_stats.pojo.QuarterTaskStatsForTableDPOJO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterTaskStatsForReportsADTO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterTaskStatsForReportsDDTO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterTaskStatsForReportsEDTO;
import com.iet.audit_app.model.entity.Plan;
import com.iet.audit_app.model.entity.PlanItem;
import com.iet.audit_app.model.entity.QuarterTaskStats;
import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.repository.QuarterTaskStatsRepository;
import com.iet.audit_app.service.PlanItemService;
import com.iet.audit_app.service.PlanService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.time.temporal.IsoFields;
import java.util.List;

@Service
public class QuarterTaskStatsService {

    private final QuarterTaskStatsRepository quarterTaskStatsRepository;

    private final PlanService planService;

    private final PlanItemService planItemService;

    private final QuarterTaskStatsAssembler assembler;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @Autowired
    public QuarterTaskStatsService(QuarterTaskStatsRepository quarterTaskStatsRepository,
                                   QuarterTaskStatsAssembler quarterTaskStatsAssembler, PlanService planService,
                                   PlanItemService planItemService) {
        this.quarterTaskStatsRepository = quarterTaskStatsRepository;
        this.assembler = quarterTaskStatsAssembler;
        this.planService = planService;
        this.planItemService = planItemService;
    }

    public QuarterTaskStats save(QuarterTaskStats quarterTaskStats) {
        return this.quarterTaskStatsRepository.save(quarterTaskStats);
    }

    public List<QuarterTaskStats> getQuarterTaskStatsByPlanAndQuarter(Plan plan, int quarter) {
        return this.quarterTaskStatsRepository.getQuarterTaskStatsByPlanAndQuarter(plan, quarter);
    }

    public QuarterTaskStatsForReportsDDTO getQuarterTaskStatsForReportDDTOByPlanAndQuarter(Plan plan, int quarter,
                                                                                           String directory) {
        List<QuarterTaskStatsForTableDPOJO> stats = this.quarterTaskStatsRepository.getCountedQuarterStatsByYearAndQuarter(
                plan.getId(), quarter);
        return assembler.createDTOsForTableDReports(stats, directory, plan.getYear()
                .getValue(), quarter);
    }

    public QuarterTaskStatsForReportsADTO getQuarterTaskStatsForReportADTOByPlanAndQuarter(Plan plan, int quarter,
                                                                                           String directory) {
        List<QuarterTaskStats> stats = getQuarterTaskStatsByPlanAndQuarter(plan, quarter);
        return assembler.createDTOsForTableAReports(stats, directory, plan.getYear()
                .getValue(), quarter);
    }


    public QuarterTaskStatsForReportsEDTO getQuarterTaskStatsForReportEDTOByPlanAndQuarter(Plan plan, int quarter,
                                                                                           String directory) {
        List<QuarterTaskStats> stats = getQuarterTaskStatsByPlanAndQuarter(plan, quarter);
        return assembler.createDTOsForTableEReports(stats, directory, plan.getYear()
                .getValue(), quarter);
    }


        @Scheduled( cron = "0 0 0 L-1 MAR,JUN,SEP,DEC *" )
//    @Scheduled( cron = "*/10 * * * * *" )
    private void createTaskStatisticsForQuarter() {
        Year year = Year.now();
        List<Plan> plans = this.planService.getPlansByYear(year);
        for (Plan plan : plans) {
            List<PlanItem> planItems = this.planItemService.getPlanItemsByPlanId(plan.getId());
            for (PlanItem planItem : planItems) {
                Task task = planItem.getTask();
                if (task != null) {
                    int quarter = LocalDate.now()
                            .get(IsoFields.QUARTER_OF_YEAR);
                    if (!quarterTaskStatsRepository.existsByTaskAndQuarter(task, quarter)) {
                        QuarterTaskStats quarterTaskStats = new QuarterTaskStats(quarter, task, plan);
                        save(quarterTaskStats);
                    }
                }
            }
        }
    }


}
