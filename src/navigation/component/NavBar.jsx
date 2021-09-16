import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' to='#'>
        Navbar
      </Link>

      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/users'>
              users
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
