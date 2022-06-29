package com.iet.audit_app.common.stats;

import com.iet.audit_app.model.dto.quarter_stats.reports.IQuarterStatsDTO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterStatsForReportsDTO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterTaskStatsForReportsADTO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterTaskStatsForReportsDDTO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterTaskStatsForReportsEDTO;
import com.iet.audit_app.model.enums.TaskType;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;
import org.springframework.util.FileSystemUtils;
import org.zeroturnaround.zip.ZipUtil;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

public final class StatsGeneratorUtils {

    private static final Logger logger = LogManager.getLogger(StatsGeneratorUtils.class);

    public static String generateDirectory(String teamAcronym, int year, int quarter) {
        String name = "raport_kwartalny_" + teamAcronym + "_" + quarter + "_" + year;
        String path = String.valueOf(Paths.get("generatedData/" + name)
                .toAbsolutePath());
        new File(path).mkdir();
        new File(path + "/tabele").mkdir();
        return name;
    }

    public static String zipDirectory(String directory) {
        String path = getPathString(directory);
        String zipPath = path + ".zip";
        ZipUtil.pack(new File(path), new File(zipPath));
        return zipPath;
    }

    private static String getPathString(String fileName) {
        String path = Paths.get("generatedData")
                .toAbsolutePath()
                .toString();
        return String.join(File.separator, new String[] { path, fileName });
    }

    public static void deleteGeneratedData(String directoryName) {
        String path = getPathString(directoryName);
        if (!FileSystemUtils.deleteRecursively(new File(path))) {
            logger.error("Something went wrong - could not delete directory {}", path);
        }
        if (!new File(path + ".zip").delete()) {
            logger.error("Something went wrong - could not delete file {}.zip", path);
        }
    }

    public static void generateDiagram(QuarterStatsForReportsDTO dto) throws IOException, InterruptedException {
        generate("quartalReports.py", createReportParameters(dto));
    }

    public static void generateTableA(QuarterTaskStatsForReportsADTO dto) throws IOException, InterruptedException {
        generate("tableA.py", createReportParametersA(dto, TaskType.AUDIT));
        generate("tableA.py", createReportParametersA(dto, TaskType.CONTROL));
    }

    public static void generateTableD(QuarterTaskStatsForReportsDDTO dto) throws IOException, InterruptedException {
        generate("tableD.py", createReportParameters(dto));
    }

    public static void generateTableE(QuarterTaskStatsForReportsEDTO dto) throws IOException, InterruptedException {
        generate("tableE.py", createReportParameters(dto));
    }

    private static JSONObject createReportParameters(IQuarterStatsDTO dto) {
        return new JSONObject(dto);
    }

    private static JSONObject createReportParametersA(QuarterTaskStatsForReportsADTO dto, TaskType taskType) {
        JSONObject jsonObject = new JSONObject(dto);
        jsonObject.put("taskType", taskType);
        jsonObject.put("content", dto.getStatsByType(taskType));
        return jsonObject;
    }

    private static void generate(String fileName, JSONObject parameters) throws IOException, InterruptedException {
        Path filePath = Paths.get("reportsGenerator/" + fileName)
                .toAbsolutePath();
        String parametersString = parameters.toString()
                .replace("\"", "\\\"");
        String command = "python " + filePath + " " + parametersString;
        Process process = Runtime.getRuntime()
                .exec(command);

//        String error = CharStreams.toString(new InputStreamReader(process.getErrorStream()));
//        System.out.println(error);
//        String result = CharStreams.toString(new InputStreamReader(process.getInputStream()));
//        System.out.println(result);

        process.waitFor();
    }
}
