package com.iet.audit_app.repository;

import com.iet.audit_app.model.dto.quarter_stats.pojo.QuarterTaskStatsForTableDPOJO;
import com.iet.audit_app.model.entity.Plan;
import com.iet.audit_app.model.entity.QuarterTaskStats;
import com.iet.audit_app.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuarterTaskStatsRepository extends JpaRepository<QuarterTaskStats, Long> {


    List<QuarterTaskStats> getQuarterTaskStatsByPlanAndQuarter(Plan plan, int quarter);

    boolean existsByTaskAndQuarter(Task task, int quarter);

    @Query("SELECT new com.iet.audit_app.model.dto.quarter_stats.pojo.QuarterTaskStatsForTableDPOJO( " +
            "count(stats.taskStatus), stats.team.id, stats.taskStatus) FROM QuarterTaskStats stats " +
            "WHERE stats.plan.id = ?1 and stats.quarter = ?2 " +
            "GROUP BY stats.taskStatus, stats.team.id")
    List<QuarterTaskStatsForTableDPOJO>  getCountedQuarterStatsByYearAndQuarter(long planId, int quarter);

}
