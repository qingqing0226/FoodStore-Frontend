import React from 'react';
import { User } from '../types/types';
import { Link } from 'react-router-dom';

interface INavProps {
    user: User,
    handleSignOut: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Nav = ({user, handleSignOut}: INavProps) => {
  return (
    <div className='nav'>
        <div className='links-box'>
            <Link to='/'>Home</Link>
            <Link to='/cart'>Cart</Link>
            <Link to='/account'>Account</Link>
        </div>
        <div className='login-logout'>
            <div id='signIn'></div>
            {user && 
                <div>
                <img src={user.picture} />
                <h3>{user.name}</h3>
                {Object.keys(user).length !== 0 && <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSignOut(e)}>Sign Out</button>}
                </div>
            }
        </div>
    </div>
  )
}

export default Nav