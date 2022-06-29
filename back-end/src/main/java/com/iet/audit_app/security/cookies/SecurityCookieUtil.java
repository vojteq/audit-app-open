package com.iet.audit_app.security.cookies;


import com.iet.audit_app.security.jwt.JwtUtil;
import org.springframework.http.ResponseCookie;

import java.util.ArrayList;

import static com.iet.audit_app.security.jwt.JwtUtil.REFRESH_TOKEN_NAME;


public class SecurityCookieUtil {

    //cookie expiration time is in seconds, token expiration time is in miliseconds
    private final static int REFRESH_TOKEN_COOKIE_EXP_TIME = JwtUtil.REFRESH_TOKEN_EXP_TIME / 1000;

    public SecurityCookieUtil() {
    }


    public ResponseCookie generateRefreshTokenCookie(String refreshToken) {
        return ResponseCookie.from(REFRESH_TOKEN_NAME, refreshToken)
                             .httpOnly(true)
                             .secure(false) //probably will change that in future after some research
                             .path("/api")
                             .maxAge(REFRESH_TOKEN_COOKIE_EXP_TIME)
//                .domain("example.com")
                             .build();
    }


    public ResponseCookie getClearedRefreshTokenCookie() {
        return ResponseCookie
                .from(JwtUtil.REFRESH_TOKEN_NAME, null)
                .maxAge(0)
                .build();
    }

}
