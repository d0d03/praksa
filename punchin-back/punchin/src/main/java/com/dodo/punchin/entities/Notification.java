package com.dodo.punchin.entities;

public class Notification {

	private Long notificationId;
	private int notificationCode;
	private Long workdayId;
	private Long userId;
	private String username;
	private String workdayDate;
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getWorkdayDate() {
		return workdayDate;
	}

	public void setWorkdayDate(String workdayDate) {
		this.workdayDate = workdayDate;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Notification() {}
	
	public Notification(int notificationCode, Long employeeId, Long workdayId) {
		this.notificationCode = notificationCode;
		this.userId = employeeId;
		this.workdayId = workdayId;
	}
	public Notification(Long notificationId,int notificationCode, Long employeeId, Long workdayId, String username, String workdayDate) {
		this.notificationId = notificationId;
		this.notificationCode = notificationCode;
		this.userId = employeeId;
		this.workdayId = workdayId;
		this.username = username;
		this.workdayDate = workdayDate;
	}
	
	public Long getNotificationId() {
		return notificationId;
	}
	public void setNotificationId(Long notificationId) {
		this.notificationId = notificationId;
	}
	public int getNotificationCode() {
		return notificationCode;
	}
	public void setNotificationCode(int notificationCode) {
		this.notificationCode = notificationCode;
	}
	public Long getWorkdayId() {
		return workdayId;
	}
	public void setWorkdayId(Long workdayId) {
		this.workdayId = workdayId;
	}
	
}
