package com.dodo.punchin.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.dodo.punchin.services.CustomUserDetailsServices;
import com.dodo.punchin.services.JwtUtil;
import com.sun.security.auth.UserPrincipal;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

public class JwtAutorizationFilter extends BasicAuthenticationFilter {

	private CustomUserDetailsServices userDetailsServices;
	private JwtUtil jwtUtil;
	private AuthenticationManager authenticationManager;
	
	public JwtAutorizationFilter(AuthenticationManager authenticationManager,CustomUserDetailsServices userDetailsServices,JwtUtil jwtUtil) {
		super(authenticationManager);
		this.userDetailsServices=userDetailsServices;
		this.jwtUtil = jwtUtil;
		this.authenticationManager = authenticationManager;
	}	
	
	@Override
	protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,FilterChain chain) throws IOException,ServletException{
		
		String header = request.getHeader("Authorization");
		
		if(header == null || !header.startsWith("Bearer")) {
			chain.doFilter(request, response);
			return;
		}
		
		Authentication auth = getUsernamePasswordAuthentication(request,header);
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		chain.doFilter(request, response);
	}

	private Authentication getUsernamePasswordAuthentication(HttpServletRequest request, String header) throws ExpiredJwtException,UnsupportedJwtException, MalformedJwtException, SignatureException {
		try {
			String token = header.replace("Bearer ", "");
			
			if(token!=null && jwtUtil.validateToken(token)) {
				
				String username = jwtUtil.getUsernameFromToken(token);
				
				if(username!=null) {
					UserDetails userDetails = userDetailsServices.loadUserByUsername(username);
					UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
					return auth;
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
