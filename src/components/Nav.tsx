import React from 'react';
import { User } from '../types/types';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from './logo.png';

interface INavProps {
    user: User,
    handleSignOut: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Nav = ({user, handleSignOut}: INavProps) => {
  return (
    <div className='nav'>
        <img className= 'logo' src={logo} alt="logo" />
        <div className='links-box'>
            <Link to='/' className='links'>Home</Link>
            <Link to='/cart' className='links cart-link'>Cart</Link>
            <Link to='/account' className='links'>Account</Link>
        </div>
        <div className='login-logout'>
            <div id='signIn'></div>
            {user && 
                <div className='profile-box'>
                    <div className='img-name'>
                        <img className='profile-img' src={user.picture} width={50} height={50} />
                        <p>{user.name}</p>
                    </div>
                    {Object.keys(user).length !== 0 && <button className='btn btn-signout' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSignOut(e)}>Sign Out</button>}
                </div>
            }
        </div>
    </div>
  )
}

export default Nav