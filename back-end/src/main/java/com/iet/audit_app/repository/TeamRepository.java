package com.iet.audit_app.repository;

import com.iet.audit_app.model.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    Optional<Team> getTeamById(long id);

    Optional<Team> getTeamByAcronym(String acronym);
}
