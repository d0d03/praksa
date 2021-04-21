package com.dodo.punchin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.dodo.punchin.entities.Workday;

@Service
public class WorkdaysService {

	@Autowired
	private JdbcTemplate jdbc;
	
	RowMapper<Float> tp;
	
	public void findWorkdays(String username, String filter){
		String sql = "SELECT EXTRACT(month FROM date ?)";
		System.out.println(sql);
		int temp = jdbc.queryForObject(sql, Integer.class);
		System.out.println(temp);
	}
	
}
