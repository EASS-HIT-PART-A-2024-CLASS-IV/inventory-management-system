import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import salesService from '../../services/salesService'
import '../../styles/components/Sales/_salesReport_modified.scss';

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      fetchSalesData();
    }
  }, [startDate, endDate]);

  const fetchSalesData = async () => {
    setLoading(true);
    try {
      const response = await salesService.getSalesReport(startDate, endDate);
      setSalesData(response.data);
    } catch (error) {
      console.error("Failed to fetch sales data:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Product,Quantity,Customer\n"; // CSV header

    salesData.forEach((sale) => {
      const row = `${new Date(sale.saleDate).toLocaleDateString()},${sale.productName},${sale.quantity},${sale.customerName}`;
      csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, "sales-report.csv");
  };

  return (
    <div className='sales-report-container'>
      <h2 className="sales-report-header">Sales Report</h2>
      <div className="sales-report-filters">
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={fetchSalesData}>Generate Report</button>
        <button onClick={exportToCSV}>Export to CSV</button>
      </div>
      {loading ? (
        <div className="loading-indicator-container">Loading...</div> 
        ) : (
        <table className="sales-report-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Customer</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr key={index}>
                <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                <td>{sale.productName}</td>
                <td>{sale.quantity}</td>
                <td>{sale.customerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesReport;