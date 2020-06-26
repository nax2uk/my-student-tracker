import React from 'react';
import { Link } from '@reach/router';

const NavMenu = () => {
  return (
    <nav className="navmenu">
      <ul>
        <li><Link to='/students/graduated/false'>All </Link></li>
        <li><Link to='/students/block/fun'>Fundamentals </Link></li>
        <li><Link to='/students/block/fe'>FrontEnd </Link></li>
        <li><Link to='/students/block/be'>BackEnd</Link></li>
        <li><Link to='/students/block/proj'>ProjectPhase</Link></li>
      </ul>
    </nav>
  );
};

export default NavMenu;