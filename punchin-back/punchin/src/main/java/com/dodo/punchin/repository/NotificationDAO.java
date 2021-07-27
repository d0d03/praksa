package com.dodo.punchin.repository;

import java.util.List;

import com.dodo.punchin.entities.Notification;

public interface NotificationDAO {

	int createNotification(Notification notification);
	List<Notification> getNotifications(int status);
}
