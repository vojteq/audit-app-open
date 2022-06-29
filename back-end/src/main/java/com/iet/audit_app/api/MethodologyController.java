package com.iet.audit_app.api;

import com.iet.audit_app.model.dto.methodology.MethodologyDTO;
import com.iet.audit_app.service.MethodologyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/methodologies")
public class MethodologyController {

    private final MethodologyService methodologyService;

    @Autowired
    public MethodologyController(MethodologyService methodologyService) {
        this.methodologyService = methodologyService;
    }

    @GetMapping
    public ResponseEntity<List<MethodologyDTO>>getAllMethodologies() {
        return new ResponseEntity<>(this.methodologyService.getAllMethodologyNames(), HttpStatus.OK);
    }

}
