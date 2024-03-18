import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import '../../styles/components/Stock/_inventoryReport_modified.scss';

const InventoryReport = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    setLoading(true);
    try {
      const response = await productService.getInventoryReport();
      setInventoryData(response.data);
    } catch (error) {
      console.error("Failed to fetch inventory data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inventory-report-container">
      <h2>Inventory Report</h2>
      {loading ? <p>Loading...</p> : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Initial Stock</th>
              <th>Current Stock</th>
              <th>Stock Changes</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{item.category}</td>
                <td>{item.initialStock}</td>
                <td>{item.currentStock}</td>
                <td>{item.stockChanges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryReport;