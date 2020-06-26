import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer bg-dark">
      <div className="social">
        <a href="https://www.facebook.com/northcoders/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook fa-2x"></i>
        </a>
        <a href="https://twitter.com/northcoders" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter fa-2x"></i>
        </a>
        <a href="https://www.youtube.com/northcoders" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-youtube fa-2x"></i></a>
        <a href="https://www.linkedin.com/company/northcoders/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
      </div>
      <p>Copyright &copy; {year} - Northcoders</p>
    </footer>

  );
};

export default Footer;