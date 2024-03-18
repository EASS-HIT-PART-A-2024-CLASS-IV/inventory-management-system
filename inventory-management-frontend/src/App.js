//import './App.css';
import './App_modified.css'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProductList from './components/Product/ProductList';
import ProductForm from './components/Product/ProductForm';
import StockDashboard from './components/Stock/StockDashboard';
import SalesRecordForm from './components/Sales/SalesRecordForm';
import SalesList from './components/Sales/SalesList';
import SalesReport from './components/Sales/SalesReport'; 
import InventoryReport from './components/Stock/InventoryReport';
import NavigationBar from './components/NavigationBar';

// import './styles/_base.scss';
// import './styles/_responsive.scss';
// import './styles/_feedback.scss';
// import './styles/_reports.scss';
// import './styles/_auth.scss';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example of setting loading and error states during an API call
  const fetchExampleData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Example API call
      // const data = await someService.fetchData();
      setIsLoading(false);
      // Process data
    } catch (err) {
      setError(err.message || 'Something went wrong!');
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <NavigationBar /> {/* Assuming this includes the new styling */}
      <div className="app-container"> {/* Adjusted class for styling */}
        <div className="content-wrap"> {/* Additional wrapper for more control over styling */}
          <h2 className="app-header">Welcome to the Inventory Management System</h2> {/* Class added for styling */}
          {isLoading && <div className="loading">Loading...</div>} {/* Adjusted class for styling */}
          {error && <div className="error-message">{error}</div>} {/* Adjusted class for styling */}
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/add" element={<ProductForm />} />
            <Route path="/product/edit/:id" element={<ProductForm />} />
            <Route path="/sales/new" element={<SalesRecordForm />} />
            <Route path="/sales" element={<SalesList />} />
            <Route path="/stock" element={<StockDashboard />} />
            <Route path="/reports/sales" element={<SalesReport />} />
            <Route path="/reports/inventory" element={<InventoryReport />} />
            {/* Define other routes as needed */}
          </Routes>
        </div>
        <ToastContainer /> {/* For displaying notifications */}
      </div>
    </Router>
  );
}

export default App;
