import React, { useState, useEffect } from 'react';
import stockService from '../../services/stockService'
import '../../styles/components/Stock/_stockHistory_modified.scss';

const StockHistory = ({ productId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStockHistory = async () => {
      setLoading(true);
      try {
        const response = await stockService.getStockHistory(productId);
        setHistory(response.data);
      } catch (error) {
        console.error("Failed to fetch stock history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchStockHistory();
    }
  }, [productId]);

  if (loading) return <div>Loading stock history...</div>;

  return (
    <div className="stock-history-container">
      <h2>Stock History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Change</th>
            <th>Reason</th>
            <th>New Stock</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => (
            <tr key={index}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.change}</td>
              <td>{record.reason}</td>
              <td>{record.newStock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockHistory;