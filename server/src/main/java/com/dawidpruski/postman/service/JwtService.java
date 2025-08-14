package com.dawidpruski.postman.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  private final String secretKey;
  private final long expirationMs = 3600000;

  public JwtService(@Value("${jwt.secret}") String secretKey) {
    this.secretKey = secretKey;
  }

  public String generateToken(String username) {
    Date now = new Date();
    Date expiry = new Date(now.getTime() + expirationMs);

    Map<String, Object> claims = new HashMap<>();

    return Jwts.builder().claims().add(claims).subject(username).issuedAt(now).expiration(expiry)
        .and().signWith(getSigningKey()).compact();
  }

  private SecretKey getSigningKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public String getUsernameFromToken(String token) {
    return Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token).getPayload()
        .getSubject();
  }

  public boolean isTokenValid(String token) {
    try {
      Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
      return true;
    } catch (Exception e) {
      return false;
    }
  }
}
