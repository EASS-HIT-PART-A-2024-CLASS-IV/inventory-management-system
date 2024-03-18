import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import productService from '../../services/productService';
import salesService from '../../services/salesService';
import '../../styles/components/Sales/_salesRecordForm_modified.scss';

const SalesRecordForm = () => {
  const navigate = useNavigate();
  const [sale, setSale] = useState({
    product_id: '',
    quantity: '',
    saleDate: '',
    customerName: ''
  });
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await productService.getAll();
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSale({ ...sale, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!sale.productId) errors.productId = 'Product is required';
    if (!sale.quantity || sale.quantity <= 0) errors.quantity = 'Quantity must be greater than 0';
    if (!sale.saleDate) errors.saleDate = 'Sale date is required';
    if (!sale.customerName) errors.customerName = 'Customer name is required';
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        await salesService.create(sale);
        navigate('/sales'); // Redirect to the sales list after successful submission
      } catch (error) {
        console.error("Failed to submit sales record:", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form className="sales-record-form-container" onSubmit={handleSubmit}>
      <h2 className="sales-record-form-header">Record Sale</h2>
      <div className="sales-record-form-group">
        <label>Product:</label>
        <select name="productId" value={sale.productId} onChange={handleChange} required>
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        {errors.productId && <div className="error">{errors.productId}</div>}
      </div>
      <div>
        <label>Quantity:</label>
        <InputMask mask="999" maskChar={null} value={sale.quantity} onChange={handleChange} name="quantity" />
        {errors.quantity && <div className="error">{errors.quantity}</div>}
      </div>
      <div>
        <label>Sale Date:</label>
        <InputMask mask="9999-99-99" maskChar={null} placeholder="YYYY-MM-DD" value={sale.saleDate} onChange={handleChange} name="saleDate" />
        {errors.saleDate && <div className="error">{errors.saleDate}</div>}
      </div>
      <div>
        <label>Customer Name:</label>
        <input type="text" name="customerName" value={sale.customerName} onChange={handleChange} required />
        {errors.customerName && <div className="error">{errors.customerName}</div>}
      </div>
      <button className="sales-record-form-button" type="submit">Record Sale</button>
    </form>
  );
};

export default SalesRecordForm;