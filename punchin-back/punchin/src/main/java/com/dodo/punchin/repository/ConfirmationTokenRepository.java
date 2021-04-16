package com.dodo.punchin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dodo.punchin.entities.ConfirmationToken;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {
	ConfirmationToken findByConfirmationToken(String confirmationToekn);
	
	long deleteByEmployeeId(long id);
}
