import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
// Page Imports
import './App.css';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';
import Header from './components/Header';
import UserProfile from './pages/UserProfile';
import FirebaseConfig from './components/FirebaseConfig';

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
			});
			setLoading(false);
		}
	}, [appInitialized]);

	if (loading) return null;

	return (
		<>
			<Header />
			<Router>
				<Routes>
					<Route path='/user/:id' element={<UserProfile />} />
					<Route
						path='/create'
						element={
							<CreateUser
								setLoggedIn={setLoggedIn}
								setUserInformation={setUserInformation}
							/>
						}
					/>
					<Route path='/' element={<Login />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
