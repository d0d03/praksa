package com.dodo.punchin.model;

public class NotificationDTO {

	private Long notificationId;
	private int notificationCode;
	private String workdayDate;
	private String username;
	
	public NotificationDTO () {}
	
	public NotificationDTO (Long notificationId, int notificationCode, String workdayDate, String username) {
		this.notificationId = notificationId;
		this.notificationCode = notificationCode;
		this.workdayDate = workdayDate;
		this.username = username;
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
	public String getWorkdayDate() {
		return workdayDate;
	}
	public void setWorkdayDate(String workdayDate) {
		this.workdayDate = workdayDate;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
