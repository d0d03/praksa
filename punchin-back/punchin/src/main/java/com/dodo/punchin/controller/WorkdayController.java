package com.dodo.punchin.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;


import com.dodo.punchin.entities.Employee;
import com.dodo.punchin.entities.Workday;
import com.dodo.punchin.model.AuthenticationResponse;
import com.dodo.punchin.model.WorkdayDTO;
import com.dodo.punchin.model.WorkdayRequest;
import com.dodo.punchin.repository.EmployeeRepository;
import com.dodo.punchin.repository.WorkdayRepository;
import com.dodo.punchin.services.WorkdaysService;

@RestController
public class WorkdayController {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private WorkdayRepository workdayRepository;
	
	@Autowired
	private WorkdaysService workdayService;

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
	
	@RequestMapping(value="/workdays",method=RequestMethod.POST)
	public ResponseEntity<List<Workday>> getWorkdays(@RequestBody WorkdayRequest wReq){
		try {
			Employee employeeData = employeeRepository.findByUsername(wReq.getUsername());
			
			List<Workday> workdays = new ArrayList<Workday>();
			if(employeeData != null) {
				//workdayRepository.findUsersWorkdays(employeeData.getId()).forEach(workdays::add);
				workdays = workdayService.findWorkdays(employeeData,wReq.getFilterStart(),wReq.getFilterEnd());
				if(workdays.isEmpty()) {
					return new ResponseEntity<>(workdays,HttpStatus.OK);
				}
				return new ResponseEntity<>(workdays,HttpStatus.OK);
			}
			throw new Exception("No user found!");
		} catch (Exception e) {
			if(e.getMessage() == "No user found") {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			}
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
			_workday.setIsConfirmed(false);
			
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
	
	@RequestMapping(value="/workdays/export/excel",method=RequestMethod.POST)
	public ResponseEntity<Resource> getFile(@RequestBody WorkdayRequest wReq ,HttpServletResponse response) throws IOException{
		String filename = "workdays.xlsx";
		Employee employeeData = employeeRepository.findByUsername(wReq.getUsername());
		
		InputStreamResource file = new InputStreamResource(workdayService.load(employeeData, wReq.getFilterStart(), wReq.getFilterEnd()));
		
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
				.body(file);
	}
	
	@RequestMapping(value="/workday/confirm/{id}", method=RequestMethod.GET)
	public ResponseEntity<?> confirmWorkday(@PathVariable("id") long id){
		Optional<Workday> workdayData = workdayRepository.findById(id);
		if(workdayData.isPresent()) {
			Workday _workday = workdayData.get();
			_workday.setIsConfirmed(true);
			
			workdayRepository.save(_workday);
			
			return new ResponseEntity<>(new AuthenticationResponse("confirmed"),HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
