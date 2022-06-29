package com.iet.audit_app.api;


import com.iet.audit_app.common.RequestUtils;
import com.iet.audit_app.model.dto.statistics.cover.StatisticsCoverDTO;
import com.iet.audit_app.security.jwt.JwtUtil;
import com.iet.audit_app.service.statistics.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping( value = "/api/statistics" )
public class StatisticsControler {

    private final StatisticsService statisticsService;
    private final JwtUtil jwtUtil;

    @Autowired
    public StatisticsControler(StatisticsService statisticsService, JwtUtil jwtUtil) {
        this.statisticsService = statisticsService;
        this.jwtUtil = jwtUtil;
    }


    @GetMapping(value = "/status")
    ResponseEntity<StatisticsCoverDTO> getTaskStatusStatistics(HttpServletRequest request){
        String token = jwtUtil.getTokenFromRequest(request);
        StatisticsCoverDTO statusStats = this.statisticsService.gatherStatusStatistics(
                RequestUtils.getParameters(request), token);
        return new ResponseEntity<>(statusStats, HttpStatus.OK);
    }

    @GetMapping(value = "/endangered")
    ResponseEntity<StatisticsCoverDTO> getEndangeredTasksStatistics(HttpServletRequest request) {
        String token = jwtUtil.getTokenFromRequest(request);
        StatisticsCoverDTO statusStats = this.statisticsService.gatherTaskStatistics(
                RequestUtils.getParameters(request), token, true);
        return new ResponseEntity<>(statusStats, HttpStatus.OK);
    }

    @GetMapping(value = "")
    ResponseEntity<StatisticsCoverDTO> getTaskStatistics(HttpServletRequest request){
        String token = jwtUtil.getTokenFromRequest(request);
        StatisticsCoverDTO statusStats = this.statisticsService.gatherTaskStatistics(
                RequestUtils.getParameters(request), token, false);
        return new ResponseEntity<>(statusStats, HttpStatus.OK);
    }
}
