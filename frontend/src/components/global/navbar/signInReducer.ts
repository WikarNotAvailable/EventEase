export const signInReducer = (state: any, action: any) => {
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


    return {
        isEmailValid: false,
        isPasswordValid: false,
        emailValue: '',
        passwordValue: '',
    }
}