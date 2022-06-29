package com.iet.audit_app.api;


import com.iet.audit_app.model.dto.quarter_stats.QuarterStatsDTO;
import com.iet.audit_app.common.stats.StatsGenerator;
import com.iet.audit_app.service.QuarterStatsService;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;

@RestController
@RequestMapping( value = "/api/quarter/stats" )
public class QuarterStatsController {

    private final QuarterStatsService quarterStatsService;

    private final StatsGenerator statsGenerator;

    @Autowired
    public QuarterStatsController(QuarterStatsService quarterStatsService, StatsGenerator statsGenerator) {
        this.quarterStatsService = quarterStatsService;
        this.statsGenerator = statsGenerator;
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @GetMapping
    public ResponseEntity<QuarterStatsDTO> getQuarterStatistics(
            @RequestParam long planId,
            @RequestParam int quarter
    ) {
        QuarterStatsDTO quarterStatsDTO = this.quarterStatsService.getQuarterStatsDTOByPlanIdAndQuarter(planId,
                quarter);
        return new ResponseEntity<>(quarterStatsDTO, HttpStatus.OK);
    }

    @GetMapping( value = "/download", produces = "application/zip" )
    public void downloadQuarterStats(HttpServletResponse response, @RequestParam long planId,
                                 @RequestParam int quarter) throws IOException, InterruptedException {
        String directory = null;
        try {
            directory = statsGenerator.generateDirectory(planId, quarter);
            FileInputStream inputStream = statsGenerator.getQuarterStatsStream(planId, quarter, directory);
            ServletOutputStream outputStream = response.getOutputStream();

            String header = "attachment; filename=\"" + directory + ".zip\"";
            response.setHeader("Content-Disposition", header);
            response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
            IOUtils.copy(inputStream, outputStream);

            outputStream.close();
            inputStream.close();
        } finally {
            if (directory != null) {
                statsGenerator.deleteGeneratedData(directory);
            }
        }
    }
}
