import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="disclaimer">
          Coverage is subject to terms and conditions of the service contract. 
          Not all products are available in all states.
        </div>
        <div className="powered-by">
          Powered by Auto Quote App
        </div>
      </div>
    </footer>
  );
};

export default Footer;
