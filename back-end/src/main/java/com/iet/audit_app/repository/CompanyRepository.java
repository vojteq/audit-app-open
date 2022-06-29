package com.iet.audit_app.repository;

import com.iet.audit_app.model.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository <Company, Long> {

    Optional<Company> getCompanyByAcronymEquals(String acronym);
}
