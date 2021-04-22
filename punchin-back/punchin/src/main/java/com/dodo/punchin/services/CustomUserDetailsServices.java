package com.dodo.punchin.services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dodo.punchin.entities.Employee;
import com.dodo.punchin.entities.Role;
import com.dodo.punchin.model.EmployeeDTO;
import com.dodo.punchin.repository.EmployeeRepository;

@Service
public class CustomUserDetailsServices implements UserDetailsService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Employee employee = employeeRepository.findByUsername(username);
		
			if(employee!=null) {
				List<SimpleGrantedAuthority> roles = employee.getRoles().stream()
						.map(role->new SimpleGrantedAuthority(role.getName().name()))
						.collect(Collectors.toList());
				return new User(employee.getUsername(), employee.getPassword(), employee.getEnabled(), true, true, true, roles);
			}
		
		throw new UsernameNotFoundException("User not found with username " + username);
	}
	
	public Employee save(EmployeeDTO employee, Set<Role> roles) {
		Employee newEmployee = new Employee();
		newEmployee.setMaxHours(employee.getMaxHours());
		newEmployee.setRoles(roles);
		newEmployee.setEnabled(false);
		newEmployee.setFirstName(employee.getFirstName());
		newEmployee.setLastName(employee.getLastName());
		newEmployee.setUsername(employee.getUsername());
		newEmployee.setEmail(employee.getEmail());
		newEmployee.setPassword(bcryptEncoder.encode(employee.getPassword()));
		return employeeRepository.save(newEmployee);
	}

}