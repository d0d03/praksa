package com.dodo.punchin.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.dodo.punchin.model.EmployeeDTO;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

	@Override
	public void initialize(PasswordMatches constraintAnnotation) {
	}
	
	@Override
	public boolean isValid(Object obj, ConstraintValidatorContext context) {
		EmployeeDTO emplyee = (EmployeeDTO) obj;
		return emplyee.getPassword().equals(emplyee.getMatchingPassword());
	}
	
}
