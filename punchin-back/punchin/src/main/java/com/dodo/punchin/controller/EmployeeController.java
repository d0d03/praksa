package com.dodo.punchin.controller;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dodo.punchin.entities.Employee;
import com.dodo.punchin.model.AuthenticationResponse;
import com.dodo.punchin.repository.ConfirmationTokenRepository;
import com.dodo.punchin.repository.EmployeeRepository;
import com.dodo.punchin.services.WorkdaysService;

@RestController
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private WorkdaysService workdayService;
	
	@Autowired
	private ConfirmationTokenRepository confirmationTokenRepository;

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
	
	@RequestMapping(value="/employees/{username}",method=RequestMethod.GET)
	public ResponseEntity<Employee> getEmployeeById(@PathVariable("username") String username ){
		Employee employeeData = employeeRepository.findByUsername(username);
		if(employeeData != null) {
			return new ResponseEntity<>(employeeData,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value="/progress/{username}",method=RequestMethod.GET)
	public ResponseEntity<?> getEmployeeProgress(@PathVariable("username") String username ){
		Employee employeeData = employeeRepository.findByUsername(username);
		if(employeeData !=null) {
			Double employeeProgress = workdayService.getProgress(employeeData); 
			return new ResponseEntity<>(employeeProgress,HttpStatus.OK);
		}
		return new ResponseEntity<>(new AuthenticationResponse("You need to be logged in to see this"),HttpStatus.OK);
	}
	
	@Transactional
	@RequestMapping(value="/employees/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<?> deleteEmployee(@PathVariable("id") long id){
		try {
			confirmationTokenRepository.deleteByEmployeeId(id);
			employeeRepository.deleteById(id);
			return ResponseEntity.ok(new AuthenticationResponse("Employee deleted"));
		}catch(Exception e) {
			throw e;
		}
	}
	
}
