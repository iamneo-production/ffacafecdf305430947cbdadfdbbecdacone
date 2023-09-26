import React, { useState } from "react";
import "./Crud.css";

function Crud() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [inputError, setInputError] = useState(false);

  const handleAddProduct = () => {
    if (
      currentProduct.name.trim() !== "" &&
      currentProduct.description.trim() !== "" &&
      currentProduct.quantity.trim() !== "" &&
      currentProduct.price.trim() !== ""
    ) {
      if (editingIndex !== null) {
        // Update existing product
        const updatedProducts = [...products];
        updatedProducts[editingIndex] = currentProduct;
        setProducts(updatedProducts);
        setEditingIndex(null);
      } else {
        // Add new product
        setProducts([...products, currentProduct]);
      }
      setCurrentProduct({
        name: "",
        description: "",
        quantity: "",
        price: "",
      });
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const handleEditProduct = (index) => {
    setCurrentProduct(products[index]);
    setEditingIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="app-container">
      <h1>Product Details</h1>
      <div className="input-container">
        {/* Input fields */}
        <input
          type="text"
          placeholder="Product Name"
          value={currentProduct.name}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Product Description"
          value={currentProduct.description}
          onChange={(e) =>
            setCurrentProduct({
              ...currentProduct,
              description: e.target.value,
            })
          }
        />
        <input
          type="number"
          placeholder="Quantity"
          value={currentProduct.quantity}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, quantity: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={currentProduct.price}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, price: e.target.value })
          }
        />
        {inputError && (
          <p className="error-message">All fields are required.</p>
        )}
        <button onClick={handleAddProduct}>
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleEditProduct(index)}>Edit</button>
                <button onClick={() => handleDeleteProduct(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Crud;
