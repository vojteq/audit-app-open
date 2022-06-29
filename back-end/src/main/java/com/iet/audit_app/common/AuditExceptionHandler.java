package com.iet.audit_app.common;

import javassist.tools.reflect.CannotCreateException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class AuditExceptionHandler {

    private final Logger logger = LogManager.getLogger(this.getClass());

    @ExceptionHandler( BadCredentialsException.class )
    public ResponseEntity<String> badCredentialsHandler(BadCredentialsException exception) {
        logger.error("", exception);
        return new ResponseEntity<>("Invalid username or password", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler( IllegalAccessException.class )
    public ResponseEntity<String> illegalAccessHandler(IllegalAccessException exception) {
        logger.error("", exception);
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler( NoSuchElementException.class )
    public ResponseEntity<String> noSuchElementHandler(NoSuchElementException exception) {
        logger.error("", exception);
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler( IllegalArgumentException.class )
    public ResponseEntity<String> illegalArgumentException(IllegalArgumentException exception) {
        logger.error("", exception);
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler( CannotCreateException.class )
    public ResponseEntity<String> cannotCreateHandler(CannotCreateException exception) {
        logger.error("", exception);
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler( Exception.class )
    public void handle(Exception exception) {
        logger.error("", exception);
    }
}
