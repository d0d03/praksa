package com.dodo.punchin.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dodo.punchin.entities.Workday;

@Repository
public interface WorkdayRepository extends JpaRepository<Workday, Long> {
	
	 List<Workday> findByDate(LocalDate date);
}
