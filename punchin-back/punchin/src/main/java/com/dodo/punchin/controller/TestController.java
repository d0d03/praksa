package com.dodo.punchin.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.PathVariable;

import com.dodo.punchin.entities.ConfirmationToken;
import com.dodo.punchin.entities.ERole;
import com.dodo.punchin.entities.Employee;
import com.dodo.punchin.entities.Role;
import com.dodo.punchin.entities.Workday;
import com.dodo.punchin.model.AuthenticationRequest;
import com.dodo.punchin.model.AuthenticationResponse;
import com.dodo.punchin.model.EmployeeDTO;
import com.dodo.punchin.model.WorkdayDTO;
import com.dodo.punchin.repository.RoleRepository;
import com.dodo.punchin.repository.WorkdayRepository;
import com.dodo.punchin.repository.EmployeeRepository;
import com.dodo.punchin.repository.ConfirmationTokenRepository;
import com.dodo.punchin.services.CustomUserDetailsServices;
import com.dodo.punchin.services.JwtUtil;
import com.dodo.punchin.services.EmailSenderService;


import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
public class TestController {
		
	@Autowired
	private CustomUserDetailsServices userDetailsService;
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private WorkdayRepository workdayRepository;
	
	@Autowired
	private ConfirmationTokenRepository confirmationTokenRepository;
	
	@Autowired
	private EmailSenderService emailSenderService;
	
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
//			Set<Role> roles = employee.getRoles();
//			Role enabled = roleRepository.findByName(ERole.ROLE_ENABLED).orElseThrow(()->new RuntimeException("Error: Role is not found"));
//			roles.add(enabled);
			return ResponseEntity.ok(new AuthenticationResponse("Account verified sucessfully"));
		}
		return new ResponseEntity<>(new AuthenticationResponse("INVALID OR BROKEN LINK"), HttpStatus.BAD_REQUEST);
	}
	
	@RequestMapping(value = "/authenticate", method=RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		if(userDetails.isEnabled()) {
			final String token = jwtTokenUtil.generateToken(userDetails);
			return ResponseEntity.ok(new AuthenticationResponse(token,userDetails.getUsername())); 
		}
		return ResponseEntity.ok(new AuthenticationResponse("Please confirm your email to complete the registration!"));
	}
	
	
	@RequestMapping(value="/employees",method=RequestMethod.GET)
	public ResponseEntity<List<Employee>> getAllEmployees(){
		try {
			List<Employee> employees = new ArrayList<Employee>();
			employeeRepository.findAll().forEach(employees::add);
			
			if(employees.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			
			return new ResponseEntity<>(employees,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value="/employees/{id}",method=RequestMethod.GET)
	public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") String id ){
		Employee employeeData = employeeRepository.findByUsername(id);
		
		if(employeeData != null) {
			return new ResponseEntity<>(employeeData,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@Transactional
	@RequestMapping(value="/employees/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<?> deleteEmployee(@PathVariable("id") long id){
		try {
			confirmationTokenRepository.deleteByEmployeeId(id);
			employeeRepository.deleteById(id);
			return ResponseEntity.ok("Employee deleted");
		}catch(Exception e) {
			throw e;
		}
	}

	@RequestMapping(value="/workday",method=RequestMethod.POST)
	public ResponseEntity<Workday> createWorkday(@RequestBody WorkdayDTO workday) throws Exception{
		try {
			String username;
			Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			
			if(principal instanceof UserDetails) {
				username = ((UserDetails) principal).getUsername();
			}else {
				username = principal.toString();
			}
			if(username!=null) {
				Employee  _employee= employeeRepository.findByUsername(username);
				Workday _workday = workdayRepository.save(new Workday(LocalDate.parse(workday.getDate()),LocalTime.parse(workday.getStart()),LocalTime.parse(workday.getEnd()),LocalTime.parse(workday.getHours()),_employee,workday.getNote()));
				return new ResponseEntity<>(_workday,HttpStatus.OK);
			}throw new UsernameNotFoundException("User not found with username " + username);
		} catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value="/workdays",method=RequestMethod.GET)
	public ResponseEntity<List<Workday>> getWorkdays(@RequestParam("username")String username){
		//TODO prikazati samo dane za trenutnog zaposlenika
		try {
			Employee employeeData = employeeRepository.findByUsername(username);
			List<Workday> workdays = new ArrayList<Workday>();
			if(employeeData != null) {
				workdayRepository.findUsersWorkdays(employeeData.getId()).forEach(workdays::add);
				if(workdays.isEmpty()) {
					return new ResponseEntity<>(workdays,HttpStatus.OK);
				}
			}
			return new ResponseEntity<>(workdays,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value="/workday/{id}",method=RequestMethod.PUT)
	public ResponseEntity<Workday> updateWorkday(@PathVariable("id")long id, @RequestBody WorkdayDTO workday){
		Optional<Workday> workdayData = workdayRepository.findById(id);
		
		if(workdayData.isPresent()) {
			Workday _workday = workdayData.get();
			_workday.setDate(LocalDate.parse(workday.getDate()));
			_workday.setStart(LocalTime.parse(workday.getStart()));
			_workday.setEnd(LocalTime.parse(workday.getEnd()));
			_workday.setHours(LocalTime.parse(workday.getHours()));
			_workday.setNote(workday.getNote());
			
			return new ResponseEntity<>(workdayRepository.save(_workday),HttpStatus.OK); 
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value="/workday/{id}",method=RequestMethod.DELETE)
	public ResponseEntity<?> deleteWorkday(@PathVariable("id") long id){
		try {
			workdayRepository.deleteById(id);
			return ResponseEntity.ok(new AuthenticationResponse("Workday deleted!"));
		}catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}


