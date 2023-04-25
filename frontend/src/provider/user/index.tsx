import React, { createContext, useContext } from "react";

const UserContext = createContext({
    isLoggedIn: false,
    firstName: '',
    surname: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: ''
})

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const data = {
        isLoggedIn: false,
        firstName: '',
        surname: '',
        email: '',
        password: '',
        dateOfBirth: '',
        phoneNumber: ''
    }

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
    const { isLoggedIn, firstName, surname, email, password, dateOfBirth, phoneNumber } = useContext(UserContext);

    return { isLoggedIn, firstName, surname, email, password, dateOfBirth, phoneNumber }
}

export default useUserContext;