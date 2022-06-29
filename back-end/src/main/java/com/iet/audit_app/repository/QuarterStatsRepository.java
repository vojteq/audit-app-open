package com.iet.audit_app.repository;

import com.iet.audit_app.model.entity.QuarterStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuarterStatsRepository extends JpaRepository<QuarterStats, Long> {

    Optional<QuarterStats> getQuarterStatsByPlanIdAndQuarter(long plan, int quarter);

    boolean existsByPlanIdAndQuarter(long planId, int quarter);
}
