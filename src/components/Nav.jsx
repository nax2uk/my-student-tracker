import React from 'react';
import { Link } from '@reach/router'
import './Nav.css'

const Nav = () => {
  return (
    <nav>
      <ul className='nav'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/students'>Students</Link></li>
        <ul>
          <li><Link to='students/graduated/false'>>>Current</Link></li>
          <ul className="block">
            <li><Link to='/students/block/fun'>Fundamentals</Link></li>
            <li><Link to='/students/block/be'>Back End</Link></li>
            <li><Link to='/students/block/fe'>Front End</Link></li>
            <li><Link to='/students/block/proj'>Project Phase</Link></li>
          </ul>
          <li><Link to='/students/block/grad'>>>Graduated</Link></li>

        </ul>

      </ul>
    </nav>
  );
};

export default Nav;