import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Components
import Header from "./components/Header";
import VehicleInfo from "./components/VehicleInfo";
import QuoteList from "./components/QuoteList";
import QuoteDetails from "./components/QuoteDetails";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  // State
  const [vehicleData, setVehicleData] = useState(null);
  const [quotes, setQuotes] = useState({
    vsc: [],
    gap: [],
    tire: [],
    dent: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeProduct, setActiveProduct] = useState("vsc");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Parse URL parameters on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vehicleInfo = {
      vin: params.get("vin"),
      price: params.get("price"),
      mileage: params.get("mileage"),
      zip: params.get("zip"),
      dealerId: params.get("dealer_id"),
    };

    // Check if we're in demo mode (no parameters provided)
    const isDemoMode = !vehicleInfo.vin && !vehicleInfo.zip;

    if (isDemoMode) {
      console.log("🎮 Demo mode activated - using default vehicle data");
      setIsDemoMode(true);
      // Use demo data
      vehicleInfo.vin = "1HGBH41JXMN109186";
      vehicleInfo.zip = "90210";
      vehicleInfo.price = "25000";
      vehicleInfo.mileage = "50000";
      vehicleInfo.dealerId = "demo_dealer";
    }

    // Validate required parameters
    if (!vehicleInfo.vin || !vehicleInfo.zip) {
      setError(
        "Missing required vehicle information. Please provide at least VIN and ZIP code."
      );
      setLoading(false);
      return;
    }

    console.log("🚗 Vehicle Info:", vehicleInfo);
    setVehicleData(vehicleInfo);

    // Fetch vehicle details from VIN
    fetchVehicleDetails(vehicleInfo.vin)
      .then((details) => {
        setVehicleData((prev) => ({ ...prev, ...details }));
        return fetchQuotes(vehicleInfo);
      })
      .then((quoteData) => {
        setQuotes(quoteData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Unable to load quotes. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Real function to fetch vehicle details from VIN
  const fetchVehicleDetails = async (vin) => {
    try {
      console.log("🔍 Frontend: Fetching vehicle details for VIN:", vin);
      const url = `${API_BASE_URL}/api/quotes/vehicle/${vin}`;
      console.log("🔍 Frontend: Calling URL:", url);

      const response = await axios.get(url);
      console.log("✅ Frontend: Vehicle details received:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Frontend: Error fetching vehicle details:", error);
      console.error("❌ Frontend: Error response:", error.response?.data);
      // Fallback to mock data if API fails
      return {
        year: 2018,
        make: "Ford",
        model: "F-150",
        trim: "XLT",
      };
    }
  };

  // Real function to fetch quotes from backend API
  const fetchQuotes = async (vehicleInfo) => {
    try {
      console.log("🔍 Frontend: Fetching quotes for vehicle:", vehicleInfo);
      const requestData = {
        vin: vehicleInfo.vin,
        zip: vehicleInfo.zip,
        mileage: parseInt(vehicleInfo.mileage) || 0,
        price: parseFloat(vehicleInfo.price) || 0,
        products: ["vsc", "gap", "tire", "dent"],
        dealer_id: vehicleInfo.dealerId || null,
      };
      console.log("🔍 Frontend: Sending request data:", requestData);

      const response = await axios.post(
        `${API_BASE_URL}/api/quotes`,
        requestData
      );
      console.log("✅ Frontend: Quotes received:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Frontend: Error fetching quotes:", error);
      console.error("❌ Frontend: Error response:", error.response?.data);
      // Fallback to mock data if API fails
      return {
        vsc: [
          {
            id: "vsc_premium_36_36",
            provider: "Provider A",
            name: "Premium Coverage",
            term: 36,
            mileage: 36000,
            deductible: 100,
            price: 1295,
            coverage: {
              engine: true,
              transmission: true,
              electrical: true,
              steering: true,
              suspension: true,
              brakes: true,
              air_conditioning: true,
              fuel_system: true,
              high_tech: true,
            },
            tags: ["Best Value"],
          },
          {
            id: "vsc_standard_48_48",
            provider: "Provider A",
            name: "Standard Coverage",
            term: 48,
            mileage: 48000,
            deductible: 100,
            price: 1495,
            coverage: {
              engine: true,
              transmission: true,
              electrical: true,
              steering: true,
              suspension: true,
              brakes: true,
              air_conditioning: true,
              fuel_system: false,
              high_tech: false,
            },
            tags: ["Most Popular"],
          },
          {
            id: "vsc_basic_60_60",
            provider: "Provider B",
            name: "Basic Coverage",
            term: 60,
            mileage: 60000,
            deductible: 250,
            price: 995,
            coverage: {
              engine: true,
              transmission: true,
              electrical: false,
              steering: true,
              suspension: false,
              brakes: true,
              air_conditioning: false,
              fuel_system: false,
              high_tech: false,
            },
            tags: [],
          },
        ],
        gap: [
          {
            id: "gap_premium",
            provider: "Provider C",
            name: "Premium GAP",
            term: 36,
            price: 795,
            coverage: {
              loan_payoff: true,
              insurance_deductible: true,
              max_benefit: 10000,
            },
            tags: ["Dealer Recommended"],
          },
          {
            id: "gap_standard",
            provider: "Provider C",
            name: "Standard GAP",
            term: 36,
            price: 595,
            coverage: {
              loan_payoff: true,
              insurance_deductible: false,
              max_benefit: 7500,
            },
            tags: ["Best Value"],
          },
        ],
        tire: [
          {
            id: "tire_premium",
            provider: "Provider D",
            name: "Premium Tire & Wheel",
            term: 36,
            price: 495,
            coverage: {
              tire_replacement: true,
              wheel_replacement: true,
              roadside_assistance: true,
            },
            tags: ["Most Popular"],
          },
        ],
        dent: [
          {
            id: "dent_repair",
            provider: "Provider D",
            name: "Dent & Ding Protection",
            term: 36,
            price: 395,
            coverage: {
              paintless_dent_repair: true,
              unlimited_repairs: true,
            },
            tags: [],
          },
        ],
      };
    }
  };

  // Handle product tab change
  const handleProductChange = (product) => {
    setActiveProduct(product);
    setSelectedQuote(null);
    setShowDetails(false);
  };

  // Handle quote selection
  const handleQuoteSelect = (quote) => {
    setSelectedQuote(quote);
  };

  // Handle view details
  const handleViewDetails = () => {
    setShowDetails(!showDetails);
  };

  // Handle continue to cart
  const handleContinue = () => {
    if (!selectedQuote) return;

    // Build cart URL with query parameters
    const cartUrl = new URL("https://yourcartdomain.com/checkout");
    cartUrl.searchParams.append("vin", vehicleData.vin);
    cartUrl.searchParams.append("zip", vehicleData.zip);
    cartUrl.searchParams.append("provider", selectedQuote.provider);
    cartUrl.searchParams.append("plan", selectedQuote.id);

    // In a real app, this would redirect to the cart
    // For the iframe version, we need to send a message to the parent
    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: "redirect",
          data: { url: cartUrl.toString() },
        },
        "*"
      );
    } else {
      window.location.href = cartUrl.toString();
    }
  };

  // Render loading state
  if (loading) {
    return <LoadingSpinner message="Loading quotes..." />;
  }

  // Render error state
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="app-container">
      <Header />

      {vehicleData && (
        <VehicleInfo
          year={vehicleData.year}
          make={vehicleData.make}
          model={vehicleData.model}
          trim={vehicleData.trim}
          vin={vehicleData.vin}
          price={vehicleData.price}
          mileage={vehicleData.mileage}
        />
      )}

      <div className="product-tabs">
        <button
          className={activeProduct === "vsc" ? "active" : ""}
          onClick={() => handleProductChange("vsc")}
        >
          Vehicle Service Contract
        </button>
        <button
          className={activeProduct === "gap" ? "active" : ""}
          onClick={() => handleProductChange("gap")}
        >
          GAP Insurance
        </button>
        <button
          className={activeProduct === "tire" ? "active" : ""}
          onClick={() => handleProductChange("tire")}
        >
          Tire & Wheel
        </button>
        <button
          className={activeProduct === "dent" ? "active" : ""}
          onClick={() => handleProductChange("dent")}
        >
          Dent & Ding
        </button>
      </div>

      {showDetails && selectedQuote ? (
        <QuoteDetails
          quote={selectedQuote}
          onBack={handleViewDetails}
          onContinue={handleContinue}
        />
      ) : (
        <QuoteList
          quotes={quotes[activeProduct]}
          selectedQuote={selectedQuote}
          onSelect={handleQuoteSelect}
          onViewDetails={handleViewDetails}
          onContinue={handleContinue}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
