package com.dodo.punchin.model;

import com.dodo.punchin.entities.Employee;

public class WorkdayDTO {
	
	private String date;
	private String start;
	private String end;
	private String hours;
	private Employee employee;
	private String note;
	private Boolean isConfirmed;
	
	public Boolean getIsConfirmed() {
		return isConfirmed;
	}
	
	public void setIsConfirmed(Boolean isConfirmed) {
		this.isConfirmed = isConfirmed;
	}
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public String getEnd() {
		return end;
	}
	public void setEnd(String end) {
		this.end = end;
	}
	public String getHours() {
		return hours;
	}
	public void setHours(String hours) {
		this.hours = hours;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}

}
