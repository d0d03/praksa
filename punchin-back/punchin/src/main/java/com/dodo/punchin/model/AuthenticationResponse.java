package com.dodo.punchin.model;

import java.util.Collection;
import java.util.Set;

public class AuthenticationResponse {

	private String token;
	private String username;
	private String message;
	private Set<String> roles;
	
	public AuthenticationResponse(String token, String username) {
		this.token = token;
		this.username = username;
	}
	
	public AuthenticationResponse(String token, String username,Set<String> roles) {
		this.token = token;
		this.username = username;
		this.roles = roles;
	}
	
	public AuthenticationResponse(String message) {
		this.message = message;
	}
	
	public Set<String> getRoles() {
		return roles;
	}
	
	public String getToken() {
		return token;
	}
	
	public String getUsername() {
		return username;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setToken(String token) {
		this.token = token;
	}
}
