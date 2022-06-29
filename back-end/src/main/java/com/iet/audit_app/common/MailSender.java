package com.iet.audit_app.common;

import com.google.common.collect.ImmutableMap;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.MessagingException;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Map;

import static com.iet.audit_app.common.MailStringUtils.*;

@Component
public class MailSender {

    private final JavaMailSender mailSender;

    private final Logger logger = LogManager.getLogger(this.getClass());

    private final String FROM;

    @Autowired
    public MailSender(JavaMailSender mailSender, @Value( "${spring.mail.username}" ) String from) {
        this.mailSender = mailSender;
        this.FROM = from;
    }

    @Async
    public void sendEmail(MailStringUtils.MailType mailType, String to, String[] args) throws MessagingException {
        String filePath;
        String subject;
        String imageId;
        String imagePath;
        Map<String, String> textPlaceholders;

        switch (mailType) {
            case TASK_REQUEST_ACCEPTANCE_NOTIFICATION:
                filePath = TASK_ACCEPTANCE_FILE_PATH;
                subject = TASK_ACCEPTANCE_SUBJECT;
                imageId = WPZ_IMAGE_ID;
                imagePath = WPZ_INFO_IMAGE_PATH;
                textPlaceholders = new ImmutableMap.Builder<String, String>().put(WPZ_PLACEHOLDER, args[0])
                        .put(TOPIC_PLACEHOLDER, args[1])
                        .build();
                break;
            case PASSWORD_GENERATION_NOTIFICATION:
                filePath = PASSWORD_GENERATION_FILE_PATH;
                subject = PASSWORD_GENERATION_SUBJECT;
                imageId = PASSWORD_IMAGE_ID;
                imagePath = PASSWORD_GENERATION_INFO_IMAGE_PATH;
                textPlaceholders = new ImmutableMap.Builder<String, String>().put(PASSWORD_PLACEHOLDER, args[0])
                        .build();
                break;
            case TASK_REPORT_REMINDER_NOTIFICATION:
                filePath = TASK_REPORT_REMINDER_FILE_PATH;
                subject = TASK_REPORT_REMINDER_SUBJECT;
                imageId = TASK_REPORT_IMAGE_ID;
                imagePath = TASK_REPORT_REMINDER_IMAGE_PATH;
                textPlaceholders = new ImmutableMap.Builder<String, String>().put(WPZ_PLACEHOLDER, args[0])
                        .put(TOPIC_PLACEHOLDER, args[1])
                        .put(SHAREPOINT_PLACEHOLDER, createUrl(args[2]))
                        .build();
                break;
            default:
                throw new IllegalArgumentException("Not supported mail type");
        }

//        todo uncomment
//        sendEmail(to, filePath, subject, imageId, imagePath, textPlaceholders);
    }

    private void sendEmail(String to, String filePath, String subject, String imageId, String imagePath,
                           Map<String, String> textPlaceholders) throws MessagingException {
        String htmlTemplate = readHtmlFromFile(filePath);
        if (templateNotAvailable(htmlTemplate)) {
            return;
        }

        for (Map.Entry<String, String> placeholder : textPlaceholders.entrySet()) {
            htmlTemplate = htmlTemplate.replace(placeholder.getKey(), placeholder.getValue());
        }

        MimeMessage message = mailSender.createMimeMessage();
        setUpMessageHelper(message, to, subject);

        MimeMultipart multipart = new MimeMultipart();

        BodyPart bodyPart = new MimeBodyPart();
        bodyPart.setContent(htmlTemplate, TYPE);
        multipart.addBodyPart(bodyPart);

        multipart.addBodyPart(createImageBodyPart(imageId, imagePath));

        multipart.addBodyPart(createImageBodyPart(BANNER_IMAGE_ID, BANNER_IMAGE_PATH));

        message.setContent(multipart);
        mailSender.send(message);
    }

    private void setUpMessageHelper(MimeMessage message, String to, String subject) throws MessagingException {
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(FROM);
        helper.setTo(to);
        helper.setSubject(subject);
    }

    private MimeBodyPart createImageBodyPart(String contentId, String fileName) throws MessagingException {
        DataSource dataSource = new FileDataSource(RESOURCES_PATH + fileName);
        MimeBodyPart bodyPart = new MimeBodyPart();
        bodyPart.setHeader(CONTENT_ID, contentId);
        bodyPart.setDataHandler(new DataHandler(dataSource));
        return bodyPart;
    }

    private String readHtmlFromFile(String fileRelativePath) {
        StringBuilder buffer = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader(RESOURCES_PATH + fileRelativePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
        } catch (IOException exception) {
            exception.printStackTrace();    // TODO some kind of logging?
            return null;
        }
        return buffer.toString();
    }

    private boolean templateNotAvailable(String template) {
        return template == null || template.isEmpty();
    }
}
