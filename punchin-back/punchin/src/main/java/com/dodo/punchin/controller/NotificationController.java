package com.dodo.punchin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dodo.punchin.entities.Notification;
import com.dodo.punchin.services.NotificationService;

@RestController
public class NotificationController {

	@Autowired
	private NotificationService notificationService;
	
	@GetMapping("/notifications/{status}")
	public ResponseEntity<List<Notification>> getNotifications(@PathVariable int status){
		return new ResponseEntity<>(notificationService.getNotifications(status),HttpStatus.OK);
	}
	
	@PostMapping("/notifications")
	public ResponseEntity<?> createNotification(@RequestBody Notification notification){
		return new ResponseEntity<>(notificationService.createNotification(notification),HttpStatus.OK);
	}
}
