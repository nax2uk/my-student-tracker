import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer bg-dark">
      <div className="social">
        <a href="/"><i className="fab fa-facebook fa-2x"></i></a>
        <a href="/"><i className="fab fa-twitter fa-2x"></i></a>
        <a href="/"><i className="fab fa-youtube fa-2x"></i></a>
        <a href="/"><i className="fab fa-linkedin fa-2x"></i></a>
      </div>
      <p>Copyright &copy; {year} - Northcoders</p>
    </footer>

  );
};

export default Footer;