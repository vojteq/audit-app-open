package com.iet.audit_app.model.dto.statistics.cover;

import com.iet.audit_app.model.dto.statistics.IStatisticsDTO;

import java.util.List;

public class StatisticsCoverDTO {

    private final List<IStatisticsDTO> statistics;

    public StatisticsCoverDTO(List<IStatisticsDTO> statistics) {
        this.statistics = statistics;
    }

    public List<IStatisticsDTO> getStatistics() {
        return statistics;
    }
}
