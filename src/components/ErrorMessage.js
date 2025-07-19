import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message = 'An error occurred. Please try again later.' }) => {
  return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <div className="error-message">{message}</div>
    </div>
  );
};

export default ErrorMessage;
