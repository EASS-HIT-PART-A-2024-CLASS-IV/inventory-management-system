import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import productService from '../../services/productService';
//import '../../styles/components/Product/_productForm.scss';
import '../../styles/components/Product/_productForm_modified.scss';

const ProductForm = () => {
  const { id } = useParams(); // Get the product ID from the URL if it exists (for editing)
  const navigate = useNavigate();
  const isEdit = id ? true : false; // Determine if the form is for editing an existing product
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    minStock: '' // Minimum stock level for advanced stock management
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      const response = await productService.get(productId);
      const fetchedProduct = response.data;
      setProduct({
        ...fetchedProduct,
        stock: fetchedProduct.quantity  // Map 'quantity' from the response to 'stock'
      });
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!product.name) errors.name = 'Product name is required';
    if (!product.category) errors.category = 'Category is required';
    if (!product.price || product.price <= 0) errors.price = 'Price must be a positive number';
    if (product.stock < 0) errors.stock = 'Stock cannot be negative';
    if (product.minStock < 0) errors.minStock = 'Minimum stock level cannot be negative';
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    const submissionData = {
      ...product,
      quantity: product.stock  // Map 'stock' back to 'quantity' before submission
    };
    if (Object.keys(formErrors).length === 0) {
      try {
        if (isEdit) {
          await productService.update(id, submissionData);
        } else {
          await productService.create(submissionData);
        }
        navigate('/'); // Redirect to the product list after successful submission
      } catch (error) {
        console.error("Failed to submit product:", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className='product-form'>
      <form onSubmit={handleSubmit}>
        <h2>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
        <div className='form-group'>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className='form-group'>
          <label>Category:</label>
          <input type="text" name="category" value={product.category} onChange={handleChange} required />
          {errors.category && <div className="error">{errors.category}</div>}
        </div>
        <div className='form-group'>
          <label>Price:</label>
          <InputMask mask="9999.99" maskChar={null} value={product.price} onChange={handleChange} name="price" />
          {errors.price && <div className="error">{errors.price}</div>}
        </div>
        <div className='form-group'>
          <label>Stock:</label>
          <InputMask mask="999" maskChar={null} value={product.stock} onChange={handleChange} name="stock" />
          {errors.stock && <div className="error">{errors.stock}</div>}
        </div>
        <button className='form-button' type="submit">{isEdit ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
