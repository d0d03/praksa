package com.dodo.punchin.services;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.dodo.punchin.entities.Employee;
import com.dodo.punchin.entities.Workday;

@Service
public class WorkdaysService {

	@Autowired
	private JdbcTemplate jdbc;
	
	RowMapper<Float> tp;
	
	public List<Workday> findWorkdays(Employee employee, String start, String end){
		Long id = employee.getId();
		List<Workday> temp = 
		jdbc.query("SELECT * FROM workdays w WHERE w.employee_id = ? AND w.workday_date between ?::date and ?::date;", new Object[] {id,start,end},(rs,rowNum)->
			new Workday(
					rs.getLong("id"),
					LocalDate.parse(rs.getString("workday_date")),
					LocalTime.parse(rs.getString("workday_start")),
					LocalTime.parse(rs.getString("workday_end")),
					LocalTime.parse(rs.getString("workday_hours")),
					employee,
					rs.getString("note")
					)
		);
		//int temp = jdbc.queryForObject("SELECT EXTRACT(month FROM date '?')",new Object[] {filter},Integer.class);
		return temp;
	}
	
	public Double getProgress(Employee employee) {
		int maxWorkHours = jdbc.queryForObject("SELECT max_hours FROM employees e WHERE e.id = ?", new Object[] {employee.getId()},int.class);
		String hoursWorked = jdbc.queryForObject("SELECT SUM(workday_hours) FROM workdays WHERE employee_id = ?", new Object[] {employee.getId()},String.class);
		if(hoursWorked != null) {
			String _temp = hoursWorked.substring(0,5).replace(":", ".");
			
			Double time = Double.parseDouble(_temp);
			Double minutes = time * 60;
			
			Double progress = minutes/(maxWorkHours *60);
			return progress;
		}
		return 0.0;
	}
}
