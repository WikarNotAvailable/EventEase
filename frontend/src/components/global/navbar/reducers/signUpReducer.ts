export const signUpReducer = (state: any, action: any) => {
	if (action.type === 'EMAIL_CHANGE') {
		var validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		var emailValid = false;

		if (action.val.match(validRegex)) emailValid = true;

		return {
			...state,
			isEmailValid: emailValid,
			emailValue: action.val,
		};
	}

	if (action.type === 'PASSWORD_CHANGE') {
		var passwordValid = false;

		if (action.val.length > 6) passwordValid = true;

		return {
			...state,
			isPasswordValid: passwordValid,
			passwordValue: action.val,
		};
	}

	if (action.type === 'PASSWORD_CONFIRMATION_CHANGE') {
		var passwordConfirmationValid = false;

		if (action.val.length > 6 && action.val === state.passwordValue)
			passwordConfirmationValid = true;

		return {
			...state,
			isPasswordConfirmationValid: passwordConfirmationValid,
			passwordConfirmationValue: action.val,
		};
	}

	if (action.type === 'FIRSTNAME_CHANGE') {
		return {
			...state,
			firstNameValue: action.val,
		};
	}

	if (action.type === 'SURNAME_CHANGE') {
		return {
			...state,
			surnameValue: action.val,
		};
	}

	if (action.type === 'BIRTH_DATE_CHANGE') {
		return {
			...state,
			dateOfBirthValue: action.val,
		};
	}

	if (action.type === 'PHONE_NUMBER_CHANGE') {
		return {
			...state,
			phoneNumberValue: action.val,
		};
	}

	if (action.type === 'USER_TYPE_CHANGE') {
		return {
			...state,
			userTypeID: action.val,
		};
	}

	return {
		userTypeID: null,
		firstNameValue: '',
		surnameValue: '',
		dateOfBirthValue: '',
		phoneNumberValue: '',
		isEmailValid: false,
		isPasswordValid: false,
		isPasswordConfirmationValid: false,
		emailValue: '',
		passwordValue: '',
		passwordConfirmationValue: '',
	};
};
