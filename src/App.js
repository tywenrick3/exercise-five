import React, { useEffect, useState } from 'react';
import {
	Navigate,
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
// Page Imports
import './App.css';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';
import Header from './components/Header';
import UserProfile from './pages/UserProfile';
import FirebaseConfig from './components/FirebaseConfig';
import Navigate from './utils/Navigate';

function App() {
	// Track if user is logged in
	const [loggedIn, setLoggedIn] = useState(false);
	// Check to see if there is any loading
	const [loading, setLoading] = useState(true);
	// Store user information in state
	const [userInformation, setUserInformation] = useState({});
	const [appInitialized, setAppInitialized] = useState(false);

	useEffect(() => {
		initializeApp(FirebaseConfig);
		setAppInitialized(true);
	}, []);

	useEffect(() => {
		if (appInitialized) {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setUserInformation(user);
					setLoggedIn(true);
				} else {
					setUserInformation({});
					setLoggedIn(false);
				}
				setLoading(false);
			});
		}
	}, [appInitialized]);

	function logout() {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				setUserInformation({});
				setLoggedIn(false);
			})
			.catch((error) => {
				console.warn(error);
			});
	}

	if (loading || !appInitialized) return null;

	return (
		<>
			<Header logout={logout} loggedIn={loggedIn} />
			<Router>
				<Routes>
					<Route
						path='/user/:id'
						element={
							loggedIn ? (
								<UserProfile
									userInformation={userInformation}
								/>
							) : (
								<Navigate to='/' />
							)
						}
					/>
					<Route
						path='/create'
						element={
							!loggedIn ? (
								<CreateUser
									setLoggedIn={setLoggedIn}
									setUserInformation={setUserInformation}
								/>
							) : (
								<Navigate to={`/user/${userInformation.uid}`} />
							)
						}
					/>
					<Route
						path='/'
						element={
							!loggedIn ? (
								<Login
									setLoggedIn={setLoggedIn}
									setUserInformation={setUserInformation}
								/>
							) : (
								<Navigate to={`/user/${userInformation.uid}`} />
							)
						}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
