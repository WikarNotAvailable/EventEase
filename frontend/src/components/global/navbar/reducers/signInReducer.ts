export const signInReducer = (state: any, action: any) => {
    if (action.type === 'EMAIL_CHANGE') {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var emailValid = false;

        if(action.val.match(validRegex)) emailValid = true;

        return {
            ...state,
            isEmailValid: emailValid,
            emailValue: action.val
        }
    }

    if (action.type === 'PASSWORD_CHANGE') {
        var passwordValid = false;

        if(action.val.length > 6) passwordValid = true;

        return {
            ...state,
            isPasswordValid: passwordValid,
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