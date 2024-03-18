import React, { useState, useEffect } from 'react';
import salesService from '../../services/salesService'
import '../../styles/components/Sales/_salesList_modified.scss';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const response = await salesService.getAll();
        setSales(response.data);
      } catch (error) {
        console.error("Failed to fetch sales:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  if (loading) return <div>Loading sales records...</div>;

  return (
    <div className="sales-list-container">
      <h2 className="sales-list-header">Sales Records</h2>
      <table className="sales-list-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Sale Date</th>
            <th>Sale Price</th>
            <th>Customer Name</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.product_id}</td>
              <td>{sale.quantity}</td>
              <td>{new Date(sale.sale_date).toLocaleDateString()}</td>
              <td>${sale.sale_price.toFixed(2)}</td>
              <td>{sale.customer_details?.name || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;