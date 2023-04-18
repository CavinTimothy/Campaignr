import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navbar'>
			<div className='nav-home'>
				<NavLink exact to="/">
					<i className="fa-solid fa-seedling"> Campaignr</i>
				</NavLink>
			</div>
			<div className='nav-links'>
				<NavLink exact to='/events'>Events</NavLink>
				{isLoaded && (
					<ProfileButton user={sessionUser} />
				)}
			</div>
		</div >
	);
}

export default Navigation;
