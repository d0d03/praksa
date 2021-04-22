package com.dodo.punchin.services;

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
	
}
