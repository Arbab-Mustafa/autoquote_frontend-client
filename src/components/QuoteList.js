import React from 'react';
import './QuoteList.css';

const QuoteList = ({ quotes, selectedQuote, onSelect, onViewDetails, onContinue }) => {
  if (!quotes || quotes.length === 0) {
    return (
      <div className="no-quotes">
        <h3>No quotes available</h3>
        <p>We couldn't find any quotes for this product. Please try another product or contact customer support.</p>
      </div>
    );
  }

  return (
    <div className="quote-list">
      {quotes.map(quote => (
        <div 
          key={quote.id} 
          className={`quote-card ${selectedQuote && selectedQuote.id === quote.id ? 'selected' : ''}`}
          onClick={() => onSelect(quote)}
        >
          <div className="quote-header">
            <h3>{quote.name}</h3>
            <div className="provider">{quote.provider}</div>
            {quote.tags && quote.tags.length > 0 && (
              <div className="tags">
                {quote.tags.map(tag => (
                  <span key={tag} className={`tag ${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="quote-details">
            {quote.term && (
              <div className="detail-item">
                <span className="label">Term:</span>
                <span className="value">{quote.term} months</span>
              </div>
            )}
            
            {quote.mileage && (
              <div className="detail-item">
                <span className="label">Mileage:</span>
                <span className="value">{quote.mileage.toLocaleString()} miles</span>
              </div>
            )}
            
            {quote.deductible && (
              <div className="detail-item">
                <span className="label">Deductible:</span>
                <span className="value">${quote.deductible}</span>
              </div>
            )}
          </div>
          
          <div className="quote-price">
            <div className="price">${quote.price.toLocaleString()}</div>
            <div className="price-note">One-time payment</div>
          </div>
          
          <div className="quote-actions">
            <button 
              className="view-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(quote);
                onViewDetails();
              }}
            >
              View Details
            </button>
            
            {selectedQuote && selectedQuote.id === quote.id && (
              <button 
                className="continue-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onContinue();
                }}
              >
                Continue
              </button>
            )}
          </div>
          
          <div className="coverage-tooltip">
            <div className="tooltip-icon">i</div>
            <div className="tooltip-content">
              <h4>What's Covered</h4>
              <ul>
                {quote.coverage && Object.entries(quote.coverage).map(([key, value]) => (
                  <li key={key} className={value ? 'covered' : 'not-covered'}>
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    {value ? ' ✓' : ' ✗'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
      
      <div className="add-ons">
        <h3>Additional Options</h3>
        <div className="add-on-buttons">
          <button className="add-on-btn insurance">
            Insurance Quotes
          </button>
          <button className="add-on-btn bank-rates">
            Bank Rates
          </button>
          <button className="add-on-btn carfax">
            Carfax Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteList;
