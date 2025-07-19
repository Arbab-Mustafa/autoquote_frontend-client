
import React, { useState } from 'react';

const QuoteDetails = ({ quote }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="quote-detail">
      <div>
        <strong>{quote.providerName}</strong> - ${quote.price}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
        <span title="This is the provider's name and product price.">ℹ️</span>
      </div>
      {showDetails && (
        <div>
          <p><strong>Coverage:</strong> {quote.coverageLevel}</p>
          <p><strong>Deductible:</strong> ${quote.deductible} <span title="Amount you pay before coverage applies.">❓</span></p>
          <p><strong>Term:</strong> {quote.termMonths} months / {quote.termMiles} miles</p>
        </div>
      )}
    </div>
  );
};

export default QuoteDetails;
