package com.iet.audit_app;

import com.iet.audit_app.model.dto.company.CompanyCreateDTO;
import com.iet.audit_app.model.dto.team.TeamCreateDTO;
import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.entity.Methodology;
import com.iet.audit_app.model.entity.MilestoneTemplate;
import com.iet.audit_app.model.enums.Role;
import com.iet.audit_app.service.CompanyService;
import com.iet.audit_app.service.EmployeeService;
import com.iet.audit_app.service.MethodologyService;
import com.iet.audit_app.service.MilestoneTemplateService;
import com.iet.audit_app.service.TeamService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@Configuration
@Profile( "censored" )
public class LoadDatabaseCensored {

    private final Logger logger = LogManager.getLogger(this);

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoadDatabaseCensored(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner initCompanies(CompanyService companyService) {
        return args -> {
            if (companyService.getAll()
                    .isEmpty()) {
                logger.info("company services are empty -> adding mock companies");

                String[][] companyData = {
                        { "Towary Dystrybucja S.A.", "TD" },
                        { "Wsparcie Klienta S.A.", "WK" },
                        { "Towary Wytwarzanie S.A.", "TW" },
                        { "Towary Serwis S.A.", "TS" },
                        { "Towary Ubezpieczenia sp. z o.o.", "TU" },
                        { "Towary Eksport sp. z o.o.", "TE" },
                        { "Towary Import sp. z o.o.", "TI" },
                        { "Towary Kompania Handlowa", "TKH" },
                        { "Towary Nowoczesne Materiały", "TNM" },
                        { "Towary Współprace Zagraniczne", "TWZ" }
                };

                for (String[] company : companyData) {
                    companyService.createCompany(new CompanyCreateDTO(company[0], company[1]));
                }

                logger.info("companies added");
            } else {
                logger.info("company service not empty");
            }
        };
    }

    @Bean
    CommandLineRunner initTeams(TeamService teamService) {
        return args -> {
            if (teamService.getAll()
                    .isEmpty()) {
                logger.info("team service is empty -> adding mock teams");

                String[][] teamData = {
                        { "Towary Dystrybucja", "TD" },
                        { "Wsparcie Klienta S.A.", "WK" },
                        { "Towary Wytwarzanie S.A.", "TW" },
                        { "Towary Eksport sp. z o.o.", "TE" },
                        { "Zespół Audytu", "ZA" },
                        { "Zespół Kontroli", "ZK" }
                };

                for (String[] team : teamData) {
                    teamService.createTeam(new TeamCreateDTO(team[0], team[1]));
                }

                logger.info("teams added");
            } else {
                logger.info("team service not empty");
            }
        };
    }


    @Bean
    CommandLineRunner initEmployees(EmployeeService employeeService, TeamService teamService) {
        return args -> {
            if (employeeService.getAll()
                    .isEmpty()) {
                logger.info("employee service is empty -> adding admin account");

                employeeService.saveEmployee(new Employee(
                        "Jan",
                        "Kowalski",
                        true,
                        "kowalski@mail.com",
                        passwordEncoder.encode("!H#?LJ(5cKFV!N2g"),
                        Role.ADMIN,
                        teamService.getTeamByAcronym("ZA")
                ));

                employeeService.saveEmployee(new Employee(
                        "Marek",
                        "Nowak",
                        true,
                        "nowak@mail.com",
                        passwordEncoder.encode("!H#?LJ(5cKFV!N2g"),
                        Role.MANAGER_KW,
                        teamService.getTeamByAcronym("ZK")
                ));

                employeeService.saveEmployee(new Employee(
                        "Anna",
                        "Kozioł",
                        true,
                        "koziol@mail.com",
                        passwordEncoder.encode("!H#?LJ(5cKFV!N2g"),
                        Role.MANAGER_AW,
                        teamService.getTeamByAcronym("ZA")
                ));

                employeeService.saveEmployee(new Employee(
                        "Kazimierz",
                        "Ziemniak",
                        true,
                        "ziemniak@mail.com",
                        passwordEncoder.encode("!H#?LJ(5cKFV!N2g"),
                        Role.EMPLOYEE,
                        teamService.getTeamByAcronym("TE")
                ));
            }
        };
    }

    @Bean
    CommandLineRunner initMethodologiesWithMilestoneTemplates(MethodologyService methodologyService,
                                                              MilestoneTemplateService milestoneTemplateService) {
        return args -> {
            if (milestoneTemplateService.getAll()
                    .isEmpty()) {
                logger.info("milestone template service is empty -> loading mock data");

                // audyt tradycyjny
                List<MilestoneTemplate> templates = new ArrayList<>();
                templates.add(new MilestoneTemplate("Wysłanie LO", 0, 10, false));
                templates.add(new MilestoneTemplate("Działania operacyjne", 1, 40, true));
                templates.add(new MilestoneTemplate("Wyciągnięcie wniosków z zadania", 2, 10, false));
                templates.add(new MilestoneTemplate("Sformułowanie rekomendacji z zadania", 3, 15, false));
                templates.add(new MilestoneTemplate(
                        "Przesłanie wniosków i rekomendacji do konsultacji w formie raportu wstępnego", 4, 5, false));
                templates.add(new MilestoneTemplate("Odpowiedź audytowanych", 5, 10, false));
                templates.add(new MilestoneTemplate("Wysłanie raportu końcowego", 6, 10, false));
                Methodology methodology = new Methodology(0, "Audyt tradycyjny", templates);
                methodologyService.save(methodology);
                milestoneTemplateService.saveAll(templates);

                // agile
                templates = new ArrayList<>();
                templates.add(new MilestoneTemplate("Wysłanie LO", 0, 10, false));
                templates.add(new MilestoneTemplate("Realizacja sprintów", 1, 60, true));
                templates.add(new MilestoneTemplate(
                        "Przesłanie wniosków i rekomendacji ze wszystkich sprintów do konsultacji w formie raportu wstępnego",
                        2, 10, false));
                templates.add(new MilestoneTemplate("Odpowiedź audytowanych", 3, 10, false));
                templates.add(new MilestoneTemplate("Wysłanie raportu końcowego", 4, 10, false));
                methodology = new Methodology(1, "Agile", templates);
                methodologyService.save(methodology);
                milestoneTemplateService.saveAll(templates);

                // kontrola
                templates = new ArrayList<>();
                templates.add(new MilestoneTemplate("Wysłanie LO", 0, 10, false));
                templates.add(
                        new MilestoneTemplate("Działania operacyjne –ustalenie stanu faktycznego i postulowanego", 1,
                                40, true));
                templates.add(new MilestoneTemplate("Kompleksowa analiza stanu faktycznego", 2, 10, false));
                templates.add(new MilestoneTemplate(
                        "Uzgodnienia –konsultacje w zakresie ustaleń stanu faktycznego w formie raportu wstępnego", 3,
                        15, false));
                templates.add(
                        new MilestoneTemplate("Analiza porównawcza stanu faktycznego i postulowanego", 4, 5, false));
                templates.add(new MilestoneTemplate("Sformułowanie wniosków pokontrolnych", 5, 10, false));
                templates.add(new MilestoneTemplate("Wysłanie raportu końcowego", 6, 10, false));
                methodology = new Methodology(2, "Kontrola", templates);
                methodologyService.save(methodology);
                milestoneTemplateService.saveAll(templates);

                logger.info("milestone templates loaded");
            } else {
                logger.info("milestone template service not empty");
            }
        };
    }
}
