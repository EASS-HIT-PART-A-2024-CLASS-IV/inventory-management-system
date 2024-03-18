import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import ProductItem from './ProductItem';
import '../../styles/components/Product/_productList_modified.scss';

const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true); // Set loading to true before making the API call
    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false); // Set 'loading' to false after the API call is complete
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await productService.remove(productId);
      const newProducts = products.filter((product) => product.id !== productId);
      setProducts(newProducts); // Update the list without the deleted product
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  if (loading) return <div className='loading-indicator'>Loading products...</div>; // Display a loading indicator when data is being fetched

  return (
    <div className='product-list'>
      <h2>Product List</h2>
      <div>
        {products.map(product => (
          <ProductItem key={product.id} product={product} onDelete={deleteProduct} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;