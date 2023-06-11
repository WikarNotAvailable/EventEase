import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';

const UserContext = createContext({
	isLoggedIn: false,
	firstName: '',
	surname: '',
	email: '',
	password: '',
	dateOfBirth: '',
	phoneNumber: '',
	userID: '',
	userTypeID: null,
	logIn: (d: any) => {},
	logOut: () => {},
});

export const UserContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [user, setUser] = useLocalStorage<any>('user', null);

	const handleLogin = (data: any) => {
		setIsLoggedIn(true);
		setFirstName(data.name);
		setSurname(data.surname);
		setEmail(data.email);
		setPassword(data.password);
		setDateOfBirth(data.birthday);
		setPhoneNumber(data.phone_number);
		setUserID(data.user_id);
		setUserTypeID(data.usertype_id);
		setUser(data);
	};

	useEffect(() => {
		if (user !== null) {
			setIsLoggedIn(true);
			setFirstName(user.name);
			setSurname(user.surname);
			setEmail(user.email);
			setPassword(user.password);
			setDateOfBirth(user.birthday);
			setPhoneNumber(user.phone_number);
			setUserID(user.user_id);
			setUserTypeID(user.usertype_id);
		}
		console.log('user', user);
		//eslint-disable-next-line
	}, []);

	const handleLogout = () => {
		setIsLoggedIn(false);
		setFirstName('');
		setSurname('');
		setEmail('');
		setPassword('');
		setDateOfBirth('');
		setPhoneNumber('');
		setUserID('');
		setUserTypeID(null);
		setUser(null);
	};

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [userID, setUserID] = useState('');
	const [userTypeID, setUserTypeID] = useState(null);

	const data = {
		isLoggedIn: isLoggedIn,
		firstName: firstName,
		surname: surname,
		email: email,
		password: password,
		dateOfBirth: dateOfBirth,
		phoneNumber: phoneNumber,
		userID: userID,
		userTypeID: userTypeID,
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
