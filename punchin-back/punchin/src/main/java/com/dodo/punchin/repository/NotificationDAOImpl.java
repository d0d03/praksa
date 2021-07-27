package com.dodo.punchin.repository;

import java.sql.Types;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.dodo.punchin.entities.Notification;

@Repository
public class NotificationDAOImpl implements NotificationDAO {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(NotificationDAOImpl.class);
	
	@Override
	public int createNotification(Notification notification) {
		String query ="INSERT INTO notifications " + 
				"(notification_code, employee_id, workday_id) "
				+ "VALUES(?,?,?)";
		
		try {
			jdbcTemplate.update(query, 
					new Object[] {notification.getNotificationCode(), notification.getUserId(), notification.getWorkdayId()}, 
					new int[] {Types.INTEGER,Types.INTEGER,Types.INTEGER});
			
			return 1;
		}catch(Exception e){
			LOGGER.error("Greška pri kreiranju notifikacije");
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<Notification> getNotifications(int status) {
		
		List<Notification> notifications = null;
		String query = "SELECT"
				+ " n.notification_id"
				+ ", n.notification_code"
				+ ", n.employee_id"
				+ ", n.workday_id"
				+ ", e.username"
				+ ", w.workday_date"
				+ " FROM notifications n"
				+ " LEFT JOIN employees e ON e.id = n.employee_id"
				+ " LEFT JOIN workdays w on w.id = n.workday_id"
				+ " WHERE notification_code = ?";
		
		try {
			notifications = jdbcTemplate.query(query,new Object[] {status},new int[] {Types.INTEGER} ,(rs,rowNum)->
			new Notification(
					rs.getLong("notification_id"),
					rs.getInt("notification_code"),
					rs.getLong("employee_id"),
					rs.getLong("workday_id"),
					rs.getString("username"),
					rs.getString("workday_date")
					));
		}catch(Exception e) {
			LOGGER.error("Greška pri dohvaćanju notifikacija");
			e.printStackTrace();
		}
		return notifications;
	}

}
