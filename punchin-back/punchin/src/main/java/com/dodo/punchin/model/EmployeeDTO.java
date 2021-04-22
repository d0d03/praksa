package com.dodo.punchin.model;

import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dodo.punchin.validation.PasswordMatches;
import com.dodo.punchin.validation.ValidEmail;

@PasswordMatches
public class EmployeeDTO {
	
	@NotEmpty
	@NotNull
	@NotBlank
	private String firstName;
	
	@NotEmpty
	@NotNull
	@NotBlank
	private String lastName;
	
	@NotEmpty
	@NotNull
	@NotBlank
	private String username;
	
	@NotEmpty
	@NotNull
	@NotBlank
	private String password;
	private String matchingPassword;
	
	@ValidEmail
	@NotNull
	@NotEmpty
	private String email;
	
	@NotNull
	private int maxHours;
	
	private Set<String> roles;
	
	public int getMaxHours() {
		return maxHours;
	}
	public void setMaxHours(int maxHours) {
		this.maxHours = maxHours;
	}
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Set<String> getRoles() {
		return roles;
	}
	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getMatchingPassword() {
		return matchingPassword;
	}
	
	public void setMatchingPassword(String matchingPassword) {
		this.matchingPassword = matchingPassword;
	}
	
}
