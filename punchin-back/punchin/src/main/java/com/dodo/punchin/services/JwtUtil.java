package com.dodo.punchin.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtUtil {

	@Value("${dodo.app.jwtSecret}")
	private String secret;
	
	@Value("${dodo.app.jwtExpirationMs}")
	private int jwtExpirationMs;
	
	//generiranje tokena
	public String generateToken(UserDetails userDetails) {
		return Jwts.builder().setSubject((userDetails.getUsername())).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs)).signWith(SignatureAlgorithm.HS512,secret).compact();
	}
	
	public String getUsernameFromToken(String token) {
		Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
		return claims.getSubject();
	}
}
