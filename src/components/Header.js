import React from 'react';

function Header() {
	return (
		<header className='Header'>
			<div className='Logo'>Logo</div>
			<nav>
				<a href='/'>Login</a>
				<a href='/create'>Create User</a>
				<a href='/userprofile'>User Profile</a>
			</nav>
		</header>
	);
}

export default Header;
