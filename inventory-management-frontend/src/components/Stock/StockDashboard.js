import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import '../../styles/components/Stock/_stockDashboard_modified.scss';

const StockDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading stock information...</div>;

  return (
    <div className="stock-dashboard-container">
      <h2>Stock Dashboard</h2>
      <table> 
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Current Stock</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={product.stock < product.minStock ? 'low-stock' : ''}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <p>{product.quantity}</p>
              <td>{product.quantity < product.minStock ? 'Low Stock' : 'Sufficient'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockDashboard;