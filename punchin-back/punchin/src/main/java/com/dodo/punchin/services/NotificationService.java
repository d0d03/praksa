package com.dodo.punchin.services;

import java.util.List;

import com.dodo.punchin.entities.Notification;
import com.dodo.punchin.model.NotificationDTO;

public interface NotificationService {

	public int createNotification(Notification notification);
	public List<Notification> getNotifications(int status);
}
