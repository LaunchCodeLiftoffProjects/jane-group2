package org.boxproject.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Component
public class JwtTokenService {

    @Value("${security.jwt.token.secret:none}")
    private final String secret = "secret";

    @Value("${security.jwt.token-expiry:1440}")
    private final long expiry = TimeUnit.DAYS.toMinutes(1);

    public boolean isValid(String token) {
        final Date expiration = getClaimFromToken(token, Claims::getExpiration);
        return expiration.after(new Date());
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims getClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public String generateToken(UserDetails userDetails, String... roles) {
        final Claims claims = Jwts.claims().setSubject(userDetails.getUsername());

        claims.put("username", userDetails.getUsername());
        claims.put("roles", roles);

        final Date now = new Date();
        final Date validity = new Date(now.getTime() + TimeUnit.MINUTES.toMillis(expiry));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }
}
