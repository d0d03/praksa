package com.dodo.punchin.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="workdays")
public class Workday {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="workday_date")
	private LocalDate date;
	
	@Column(name="workday_start")
	private LocalTime start;
	
	@Column(name="workday_end")
	private LocalTime end;
	
	@Column(name="workday_hours")
	private LocalTime hours;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name ="employee_id", nullable = false)
	private Employee employee;
	
	@Column
	private String note;
	
	public Workday() {}

	public Workday(LocalDate date, LocalTime start, LocalTime end, LocalTime hours, Employee employee, String note) {
		this.date = date;
		this.start = start;
		this.end = end;
		this.hours = hours;
		this.employee = employee;
		this.note = note;
	}
	public Workday(Long id,LocalDate date, LocalTime start, LocalTime end, LocalTime hours, Employee employee, String note) {
		this.id = id;
		this.date = date;
		this.start = start;
		this.end = end;
		this.hours = hours;
		this.employee = employee;
		this.note = note;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public LocalTime getStart() {
		return start;
	}

	public void setStart(LocalTime start) {
		this.start = start;
	}

	public LocalTime getEnd() {
		return end;
	}

	public void setEnd(LocalTime end) {
		this.end = end;
	}

	public LocalTime getHours() {
		return hours;
	}

	public void setHours(LocalTime hours) {
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
