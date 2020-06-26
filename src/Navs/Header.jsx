import React, { Component } from 'react';
import NavTop from './NavTop';
import NavMenu from './NavMenu';
import { Link } from '@reach/router';

class Header extends Component {
  state = {
    scrolled: false,
    navBarStyle: "",
    navBarClass: " top"
  }
  handleScroll = () => {
    if (window.pageYOffset > 100) {
      this.setState({ navBarClass: "" })
      if (!this.state.scrolled)
        this.setState({ navBarStyle: 'translateY(-70px)' });
      setTimeout(() => {
        this.setState({ navBarStyle: 'translateY(0)', scrolled: true });
      }, 200);
    }
    else {
      this.setState({ navBarClass: " top", scrolled: false });
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { headerHome, headerTitle } = this.props;
    const { navBarStyle, navBarClass } = this.state;
    return (
      <header className={headerHome ? "hero" : "hero blog"}>
        <div id="navbar" className={`navbar${navBarClass}`} style={{ transform: { navBarStyle } }}>
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
  }
}

export default Header;