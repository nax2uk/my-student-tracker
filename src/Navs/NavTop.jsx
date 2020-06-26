import React from 'react';
import { Link } from '@reach/router'

const NavTop = () => {
  return (
    <>
      <h1 className="logo">
        <span className="text-primary"><i className="fas fa-code"></i> North</span>coders
    </h1>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/addstudent'>AddStudent</Link></li>
          <li><Link to='/students'>AllStudents</Link></li>
          <li><Link to='/students/graduated/false'>CurrentStudents</Link></li>
          <li><Link to='/students/block/grad'>PastStudents</Link></li>
        </ul>
      </nav>
    </>
  );

};

export default NavTop;