package com.iet.audit_app.common;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import javax.mail.MessagingException;
import java.util.Properties;

@SpringBootTest
public class MailSenderTest extends AbstractTestNGSpringContextTests {

    private final static String TO = ""; // insert testing email

    private MailSender mailSender;

    @Test
    public void taskAcceptanceTest() throws MessagingException {
        String topic = "Zadanie audytowe numer 1";
        String wpz = "WPZKD_34/2020/TWD";
        mailSender.sendEmail(MailStringUtils.MailType.TASK_REQUEST_ACCEPTANCE_NOTIFICATION, TO,
                new String[] { wpz, topic });
    }

    @Test
    public void passwordNotificationTest() throws MessagingException {
        String password = PasswordGenerator.generatePassword();
        mailSender.sendEmail(MailStringUtils.MailType.PASSWORD_GENERATION_NOTIFICATION, TO, new String[] { password });
    }

    @Test
    public void taskReportReminderTest() throws MessagingException {
        String topic = "Zadanie audytowe numer 1";
        String wpz = "WPZKD_34/2020/TWD";
        String sharepointUrl = "http://localhost:8080";
        mailSender.sendEmail(MailStringUtils.MailType.TASK_REPORT_REMINDER_NOTIFICATION, TO,
                new String[] { wpz, topic, sharepointUrl });
    }


    @Value( "${spring.mail.host}" )
    private String host;

    @Value( "${spring.mail.port}" )
    private int port;

    @Value( "${spring.mail.username}" )
    private String username;

    @Value( "${spring.mail.password}" )
    private String password;

    @BeforeClass
    public void before() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.debug", "true");

        this.mailSender = new MailSender(mailSender, username);
    }
}
