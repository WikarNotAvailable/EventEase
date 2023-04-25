export const signUpReducer = (state: any, action: any) => {
    if (action.type === 'EMAIL_CHANGE') {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var isValid = false;

        if(action.val.match(validRegex)) isValid = true;

        return {
            ...state,
            isEmailValid: isValid,
            emailValue: action.val
        }
    }

    if (action.type === 'PASSWORD_CHANGE') {
        var isValid = false;

        if(action.val.length > 6) isValid = true;

        return {
            ...state,
            isPasswordValid: isValid,
            passwordValue: action.val
        }
    }

    if (action.type === 'PASSWORD_CONFIRMATION_CHANGE') {
        var isValid = false;

        if(action.val.length > 6 && action.val == state.passwordValue) isValid = true;

        return {
            ...state,
            isPasswordConfirmationValid: isValid,
            passwordConfirmationValue: action.val
        }
    }

    if (action.type === 'FIRSTNAME_CHANGE') {
        return {
            ...state,
            firstNameValue: action.val
        }
    }

    if (action.type === 'SURNAME_CHANGE') {
        return {
            ...state,
            surnameValue: action.val
        }
    }

    if (action.type === 'BIRTH_DATE_CHANGE') {
        return {
            ...state,
            dateOfBirthValue: action.val
        }
    }

    if (action.type === 'PHONE_NUMBER_CHANGE') {
        return {
            ...state,
            phoneNumberValue: action.val
        }
    }

    return {
        firstNameValue: '',
        surnameValue: '',
        dateOfBirthValue: '',
        phoneNumberValue: '',
        isEmailValid: false,
        isPasswordValid: false,
        isPasswordConfirmationValid: false,
        emailValue: '',
        passwordValue: '',
        passwordConfirmationValue: ''
    }
}