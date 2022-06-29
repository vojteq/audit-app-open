package com.iet.audit_app.common;

import java.nio.file.Paths;

public final class MailStringUtils {

    public enum MailType {
        PASSWORD_GENERATION_NOTIFICATION,
        TASK_REQUEST_ACCEPTANCE_NOTIFICATION,
        TASK_REPORT_REMINDER_NOTIFICATION
    }

    public static final String TYPE = "text/html; charset=utf-8";

    public static final String CONTENT_ID = "Content-ID";

    public static final String RESOURCES_PATH = Paths.get(".")
            .toAbsolutePath()
            .normalize() + "\\src\\main\\resources\\";

    //    HTML FILE PATHS
    public static final String TASK_ACCEPTANCE_FILE_PATH = "templates/mail/wpzMailTemplate.html";

    public static final String PASSWORD_GENERATION_FILE_PATH = "templates/mail/passwordMailTemplate.html";

    public static final String TASK_REPORT_REMINDER_FILE_PATH = "templates/mail/taskReportMailTemplate.html";

    //    IMAGE PATHS
    public static final String BANNER_IMAGE_PATH = "templates/mail/images/banner.png";

    public static final String WPZ_INFO_IMAGE_PATH = "templates/mail/images/wpzInfo.png";

    public static final String PASSWORD_GENERATION_INFO_IMAGE_PATH = "templates/mail/images/passwordGenerationInfo.png";

    public static final String TASK_REPORT_REMINDER_IMAGE_PATH = "templates/mail/images/taskReportReminder.png";

    //    TEXT PLACEHOLDERS
    public static final String WPZ_PLACEHOLDER = "{wpz placeholder}";

    public static final String TOPIC_PLACEHOLDER = "{topic placeholder}";

    public static final String PASSWORD_PLACEHOLDER = "{password placeholder}";

    public static final String SHAREPOINT_PLACEHOLDER = "{sharepoint placeholder}";

    //    SUBJECTS
    public static final String TASK_ACCEPTANCE_SUBJECT = "Aplikacja audytowa - akceptacja wniosku";

    public static final String TASK_REJECTION_SUBJECT = "Aplikacja audytowa - odrzucenie wniosku";

    public static final String PASSWORD_GENERATION_SUBJECT = "Aplikacja audytowa - generacja hasła";

    public static final String TASK_REPORT_REMINDER_SUBJECT = "Aplikacja audytowa - przypomnienie o załączeniu raportu końcowego";

    //    IMAGE IDS
    public static final String BANNER_IMAGE_ID = "<banner>";

    public static final String WPZ_IMAGE_ID = "<wpzInfoImage>";

    public static final String PASSWORD_IMAGE_ID = "<passwordInfoImage>";

    public static final String TASK_REPORT_IMAGE_ID = "<taskReportInfoImage>";

    public static String createUrl(String url) {
        return "<a href=\"" + url + "\">" + url + "</a>";
    }
}
