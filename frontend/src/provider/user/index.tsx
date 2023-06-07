import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({
	isLoggedIn: false,
	firstName: '',
	surname: '',
	email: '',
	password: '',
	dateOfBirth: '',
	phoneNumber: '',
	userID: '',
	logIn: (d: any) => {},
	logOut: () => {},
});

export const UserContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const handleLogin = (data: any) => {
		setIsLoggedIn(true);
		setFirstName(data.name);
		setSurname(data.surname);
		setEmail(data.email);
		setPassword(data.password);
		setDateOfBirth(data.birthday);
		setPhoneNumber(data.phone_number);
		setUserID(data.user_id);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		setFirstName('');
		setSurname('');
		setEmail('');
		setPassword('');
		setDateOfBirth('');
		setPhoneNumber('');
		setUserID('');
	};

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [userID, setUserID] = useState('');

	const data = {
		isLoggedIn: isLoggedIn,
		firstName: firstName,
		surname: surname,
		email: email,
		password: password,
		dateOfBirth: dateOfBirth,
		phoneNumber: phoneNumber,
		userID: userID,
		logIn: handleLogin,
		logOut: handleLogout,
	};

	return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error(
			'`useUserProvider` hook cannot be used outside of a `UserProvider`!'
		);
	}
	return context;
};

export default useUserContext;
