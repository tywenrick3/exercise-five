import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import CreateUser from './components/CreateUser';
import Header from './components/Header';
import UserProfile from './pages/UserProfile';

function App() {
	return (
		<>
			<Header />
			<Router>
				<Routes>
					<Route path='/user/:id' element={<UserProfile />} />
					<Route path='/create' element={<CreateUser />} />
					<Route path='/' element={<Login />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
