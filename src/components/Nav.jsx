import React from 'react';
import { Link } from '@reach/router'

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/students'>Students</Link></li>
        <li><Link to='/blocks'>Block</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;