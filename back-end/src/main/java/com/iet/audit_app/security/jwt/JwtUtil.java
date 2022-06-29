package com.iet.audit_app.security.jwt;

import com.iet.audit_app.security.user_details.AuditUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {

    protected static final String TOKEN_PREFIX = "Bearer ";

    public static final int TOKEN_EXP_TIME = 1000 * 60 * 30; //5 minutes

    public static final int REFRESH_TOKEN_EXP_TIME = 1000 * 60 * 60 * 8; //8 hours

    public final static String TOKEN_NAME = "token";

    public final static String REFRESH_TOKEN_NAME = "refreshToken";

    public final static String AUTHORIZATION_HEADER = "Authorization";


    @Value( "${secret_key}" )
    private String SECRET_KEY;

    public String extractUsername(String token) {
        if (token.startsWith(TOKEN_PREFIX)) {
            return extractClaims(token.replace(TOKEN_PREFIX, ""), Claims::getSubject);
        } else {
            return extractClaims(token, Claims::getSubject);
        }
    }

    public Date extractExpiration(String token) {
        if (token.startsWith(TOKEN_PREFIX)) {
            return extractClaims(token.replace(TOKEN_PREFIX, ""), Claims::getExpiration);
        } else {
            return extractClaims(token, Claims::getExpiration);
        }
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        Claims claims;
        if (token.startsWith(TOKEN_PREFIX)) {
            claims = extractAllClaims(token.replace(TOKEN_PREFIX, ""));
        } else {
            claims = extractAllClaims(token);
        }
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        if (token.startsWith(TOKEN_PREFIX)) {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token.substring(7))
                    .getBody();
        } else {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
        }
    }

    private Boolean isTokenExpired(String token) {
        if (token.startsWith(TOKEN_PREFIX)) {
            return extractExpiration(token.replace(TOKEN_PREFIX, "")).before(new Date());
        } else {
            return extractExpiration(token).before(new Date());
        }
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("name", ((AuditUserDetails) userDetails).getEmployee()
                                                           .getFullName());
        claims.put("email", ((AuditUserDetails) userDetails).getEmployee()
                                                            .getEmail());
        claims.put("id", ((AuditUserDetails) userDetails).getEmployee()
                                                         .getId());
        claims.put("role", ((AuditUserDetails) userDetails).getEmployee()
                                                           .getRole());
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXP_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXP_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public String[] generateTokens(UserDetails userDetails) {
        return new String[] { generateToken(userDetails), generateRefreshToken(userDetails) };
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token.replace(TOKEN_PREFIX, ""));
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String getTokenFromRequest(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION_HEADER);
        return token.replace(TOKEN_PREFIX, "");
    }
}
