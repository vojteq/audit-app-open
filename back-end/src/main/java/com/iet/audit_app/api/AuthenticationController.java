package com.iet.audit_app.api;

import com.iet.audit_app.security.cookies.SecurityCookieUtil;
import com.iet.audit_app.security.user_details.AuditUserDetails;
import com.iet.audit_app.security.user_details.AuditUserDetailsService;
import com.iet.audit_app.security.messages.AuthenticationRequest;
import com.iet.audit_app.security.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping( value = "/api" )
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final AuditUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final SecurityCookieUtil securityCookieUtil;

    private final static String X_ACCESS_TOKEN = "X-Access-Token";

    @Autowired
    public AuthenticationController(
            AuthenticationManager authenticationManager,
            AuditUserDetailsService userDetailsService,
            JwtUtil jwtUtil
    ) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.securityCookieUtil = new SecurityCookieUtil();
    }

    @PostMapping( value = "/token" )
    public ResponseEntity<?> createAuthenticationToken(
            @RequestBody AuthenticationRequest request) throws BadCredentialsException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        AuditUserDetails userDetails = (AuditUserDetails) this.userDetailsService.loadUserByUsername(
                request.getUsername());
        String[] tokens = jwtUtil.generateTokens(userDetails); //tokens[0] - token, tokens[1] - refreshToken

        //set refresh token cookie
        ResponseCookie refreshTokenCookie = securityCookieUtil.generateRefreshTokenCookie(tokens[1]);

        return ResponseEntity.ok()
                             .header(X_ACCESS_TOKEN, tokens[0])
                             .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                             .build();
    }

    @DeleteMapping( value = "/token" )
    public ResponseEntity<?> deleteTokenCookies() {
        ResponseCookie responseCookie = securityCookieUtil.getClearedRefreshTokenCookie();
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .build();
    }

    @PostMapping( value = "/token/refresh" )
    public ResponseEntity<?> refreshToken(@CookieValue( name = "refreshToken", defaultValue = "" ) String refreshToken)
            throws BadCredentialsException {

        String username = this.jwtUtil.extractUsername(refreshToken);
        AuditUserDetails userDetails = (AuditUserDetails) this.userDetailsService.loadUserByUsername(username);

        if (this.jwtUtil.validateToken(refreshToken, userDetails)) {
            return ResponseEntity.ok()
                                 .header(X_ACCESS_TOKEN, this.jwtUtil.generateToken(userDetails))
                                 .build();
        }
        return new ResponseEntity<>("Refresh token has expired", HttpStatus.FORBIDDEN);
    }
}
