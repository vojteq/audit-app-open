package com.iet.audit_app.service;

import com.iet.audit_app.model.dto.plan.PlanStatisticsDTO;
import com.iet.audit_app.model.dto.quarter_stats.QuarterStatsDTO;
import com.iet.audit_app.model.entity.Plan;
import com.iet.audit_app.model.entity.QuarterStats;
import com.iet.audit_app.repository.QuarterStatsRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.time.temporal.IsoFields;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class QuarterStatsService {

    private final QuarterStatsRepository quarterStatsRepository;

    private final PlanService planService;

    private final Logger logger = LogManager.getLogger(this.getClass());

    public QuarterStatsService(QuarterStatsRepository quarterStatsRepository, PlanService planService) {
        this.quarterStatsRepository = quarterStatsRepository;
        this.planService = planService;
    }

    public QuarterStats save(QuarterStats quarterStats) {
        return this.quarterStatsRepository.save(quarterStats);
    }

    public QuarterStats getQuarterStatsByPlanIdAndQuarter(long planId, int quarter) throws NoSuchElementException {
        return this.quarterStatsRepository.getQuarterStatsByPlanIdAndQuarter(planId, quarter)
                .orElseThrow(() -> new NoSuchElementException("Statistics for given quarter do not exist"));
    }

    public QuarterStatsDTO getQuarterStatsDTOByPlanIdAndQuarter(long planId,
                                                                int quarter) throws NoSuchElementException {
        return new QuarterStatsDTO(getQuarterStatsByPlanIdAndQuarter(planId, quarter));
    }

    @Scheduled( cron = "0 0 0 L-1 MAR,JUN,SEP,DEC *" )
//    @Scheduled(cron = "*/60 * * * * *")
    private void createPlanStatisticsForQuarter() {
        List<Plan> plans = planService.getPlansByYear(Year.now());
        for (Plan plan : plans) {
            PlanStatisticsDTO planStatisticsDTO = planService.getPlanStatistics(plan.getId());
            int quarter = LocalDate.now()
                    .get(IsoFields.QUARTER_OF_YEAR);
            if (!quarterStatsRepository.existsByPlanIdAndQuarter(plan.getId(), quarter)) {
                QuarterStats quarterStats = new QuarterStats(plan.getYear(), quarter, plan, planStatisticsDTO);
                save(quarterStats);
                logger.info("Quarter statistics for {}({}) saved", plan.getName(), plan.getId());
            } else {
                logger.info("Quarter statistics for {}({}) already exists", plan.getName(), plan.getId());
            }
        }
    }
}
