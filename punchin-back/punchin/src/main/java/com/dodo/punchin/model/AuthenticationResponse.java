package com.dodo.punchin.model;

public class AuthenticationResponse {

	private String token;
	private String username;
	private String message;
	
	public AuthenticationResponse(String token, String username) {
		this.token = token;
		this.username = username;
	}
	
	public AuthenticationResponse(String message) {
		this.message = message;
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
