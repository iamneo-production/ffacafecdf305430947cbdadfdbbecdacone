import React, { useState } from "react";
import "./Product.css";

const productsData = [
  {
    id: 1,
    name: "Product 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 19.99,
    image: require("./product1.jpg"),
  },
  {
    id: 2,
    name: "Product 2",
    description: "Vestibulum id ligula porta felis euismod semper.",
    price: 29.99,
    image: require("./product2.webp"),
  },
  {
    id: 3,
    name: "Product 3",
    description: "Nullam quis risus eget urna mollis ornare vel eu leo.",
    price: 14.99,
    image: require("./product4.jpg"),
  },
  {
    id: 4,
    name: "Product 4",
    description: "Cras mattis consectetur purus sit amet fermentum.",
    price: 24.99,
    image: require("./product4.jpg"),
  },
  {
    id: 5,
    name: "Product 5",
    description: "Aenean lacinia bibendum nulla sed consectetur.",
    price: 9.99,
    image: require("./product1.jpg"),
  },
];

function Crud() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const getTotalAmount = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const updatedCart = [...cart, selectedProduct];
      setCart(updatedCart);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="app">
      <h1>ShopAura</h1>
      <div className="product-list">
        {productsData.map((product) => (
          <div
            key={product.id}
            className={`product ${
              selectedProduct === product ? "selected" : ""
            }`}
            onClick={() => handleProductSelect(product)}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="product-details">
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p>${selectedProduct.price.toFixed(2)}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
      <div className="cart">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((product) => (
                <li key={product.id}>
                  {product.name} - ${product.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <p>Total Amount: ${getTotalAmount()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Crud;
