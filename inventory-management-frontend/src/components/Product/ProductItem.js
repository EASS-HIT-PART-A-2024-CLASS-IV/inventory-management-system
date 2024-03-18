import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/Product/_productItem_modified.scss';

const ProductItem = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/product/edit/${product._id}`);
  };

  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      onDelete(product._id);
    }
  };

  return (
    <div className="product-item">
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <p>Quantity: {product.quantity}</p>
        {product.stock < product.minStock && <p className="alert">Low Stock!</p>}
      </div>
      <div className="product-actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ProductItem;