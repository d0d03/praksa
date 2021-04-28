package com.dodo.punchin.controller;

import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import com.dodo.punchin.entities.ConfirmationToken;
import com.dodo.punchin.entities.ERole;
import com.dodo.punchin.entities.Employee;
import com.dodo.punchin.entities.Role;
import com.dodo.punchin.model.AuthenticationRequest;
import com.dodo.punchin.model.AuthenticationResponse;
import com.dodo.punchin.model.EmployeeDTO;
import com.dodo.punchin.repository.ConfirmationTokenRepository;
import com.dodo.punchin.repository.EmployeeRepository;
import com.dodo.punchin.repository.RoleRepository;
import com.dodo.punchin.services.CustomUserDetailsServices;
import com.dodo.punchin.services.EmailSenderService;
import com.dodo.punchin.services.JwtUtil;

@RestController
public class AuthenticationContorller {
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private CustomUserDetailsServices userDetailsService;
	
	@Autowired
	private ConfirmationTokenRepository confirmationTokenRepository;
	
	@Autowired
	private EmailSenderService emailSenderService;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private JwtUtil jwtTokenUtil;
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@Valid @RequestBody EmployeeDTO employee) throws Exception{
		
		try {
			//role it DTO i castaj u Role
			Set<String> strRoles = employee.getRoles();
			Set<Role> roles = new HashSet<>();
			
			if(strRoles == null) {
				Role employeeRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE).orElseThrow(()->new RuntimeException("Error: Role is not found"));
				roles.add(employeeRole);
			}else {
				strRoles.forEach(role->{
					switch (role) {
					case "admin":
						Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow(()-> new RuntimeException("Error: Role is not found"));
						roles.add(adminRole);
						break;
					default:
						Role employeeRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE).orElseThrow(()-> new RuntimeException("Error: Role is not found"));
						roles.add(employeeRole);
						break;
					}
				});
			}
			
			//spremi employee i confirmationToken
			Employee newEmployee = userDetailsService.save(employee,roles);
			ConfirmationToken confirmationToken = new ConfirmationToken(newEmployee);
			confirmationTokenRepository.save(confirmationToken);
			
			//Pošalji email
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			mailMessage.setTo(employee.getEmail());
			mailMessage.setSubject("Complete Registration!");
			mailMessage.setFrom("dominik.bosnjak33@gmail.com");
			mailMessage.setText("Wellcome,\nTo confirm your account, please click here : \n" +
			"http://localhost:3000/confirm-account?token="+confirmationToken.getConfirmationToken());
			
			emailSenderService.sendEmail(mailMessage);
			
			return new ResponseEntity<>(new AuthenticationResponse("User registered sucessfuly"),HttpStatus.OK);
		}catch (MailException e) {
			throw new Exception(e.getMessage());
		}
		catch (Exception e) {
			return new ResponseEntity<>("USERNAME ALREADY IN USE " ,HttpStatus.CONFLICT);
		}
	}
	
	@Transactional
	@RequestMapping(value="/confirm-account", method = RequestMethod.GET)
	public ResponseEntity<?> confirmAccount(@RequestParam("token") String confirmationToken) {
		
		ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);
		
		if(token!=null) {
			Employee employee = employeeRepository.findByUsername(token.getEmployee().getUsername());
			employee.setEnabled(true);
			return ResponseEntity.ok(new AuthenticationResponse("Account verified sucessfully"));
		}
		return new ResponseEntity<>(new AuthenticationResponse("INVALID OR BROKEN LINK"), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/authenticate", method=RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		if(userDetails.isEnabled()) {
			final String token = jwtTokenUtil.generateToken(userDetails);
			Set<String> roles = new HashSet<>();
			userDetails.getAuthorities().forEach(role->{
				roles.add(role.toString());
			});
			return ResponseEntity.ok(new AuthenticationResponse(token,userDetails.getUsername(),roles)); 
		}
		return ResponseEntity.ok(new AuthenticationResponse("Please confirm your email to complete the registration!"));
	}
}
