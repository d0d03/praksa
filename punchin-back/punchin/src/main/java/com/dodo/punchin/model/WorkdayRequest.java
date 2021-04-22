package com.dodo.punchin.model;

public class WorkdayRequest {
	
	private String username;
	private String filterStart;
	private String filterEnd;
	
	public WorkdayRequest(String username,String filterStart,String filterEnd) {
		this.username = username;
		this.filterStart = filterStart;
		this.filterEnd = filterEnd;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFilterStart() {
		return filterStart;
	}

	public void setFilterStart(String filterStart) {
		this.filterStart = filterStart;
	}

	public String getFilterEnd() {
		return filterEnd;
	}

	public void setFilterEnd(String filterEnd) {
		this.filterEnd = filterEnd;
	}
}
