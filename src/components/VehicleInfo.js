import React from 'react';
import './VehicleInfo.css';

const VehicleInfo = ({ year, make, model, trim, vin, price, mileage }) => {
  return (
    <div className="vehicle-info">
      <div className="vehicle-title">
        <h2>{year} {make} {model} {trim}</h2>
        {price && (
          <div className="vehicle-price">${parseInt(price).toLocaleString()}</div>
        )}
      </div>
      
      <div className="vehicle-details">
        <div className="detail-item">
          <span className="label">VIN:</span>
          <span className="value">{vin}</span>
        </div>
        
        {mileage && (
          <div className="detail-item">
            <span className="label">Mileage:</span>
            <span className="value">{parseInt(mileage).toLocaleString()} miles</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleInfo;
