package com.dodo.punchin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dodo.punchin.entities.Employee;
import com.dodo.punchin.entities.Notification;
import com.dodo.punchin.model.NotificationDTO;
import com.dodo.punchin.repository.NotificationDAO;

@Service
public class NotificationServiceImpl implements NotificationService {

	@Autowired
	private NotificationDAO notificationDAO;
	
	@Override
	public int createNotification(Notification notification) {
		return this.notificationDAO.createNotification(notification);
	}

	@Override
	public List<Notification> getNotifications(int status) {
		return this.notificationDAO.getNotifications(status);
	}

}
