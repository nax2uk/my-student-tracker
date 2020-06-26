import React from 'react';
import NavTop from './NavTop';
import NavMenu from './NavMenu';
import { Link } from '@reach/router';

const Header = (props) => {
  const { headerHome, headerTitle } = props;
  return (
    <header className={headerHome ? "hero" : "hero blog"}>
      <div id="navbar" className="navbar top">
        <NavTop />
      </div>

      <div className="content">
        {headerHome ?
          <><h1>Northcoders Student Tracker</h1>
            <p>Keep track of your students' records</p>
            <Link className="btn" to='/students'><i className="fas fa-chevron-right"></i>Enter</Link></>
          : <h1>{headerTitle}</h1>}
        {headerTitle === "Current Students" ?
          <NavMenu /> : null
        }
      </div>
    </header>
  );
};

export default Header;