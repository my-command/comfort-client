import React, { useEffect, useState } from 'react';

// Mahsulot kartasi komponenti
const ProductCard = ({ product, onAddToCart }) => (
  <div
    className="relative bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl group"
  >
    <img
      className="w-full h-60 object-cover"
      src={product.url}
      alt={product.title}
    />
    <div
      className={`absolute top-4 left-4 px-3 py-1 text-sm font-bold text-white rounded-lg ${product.status.toLowerCase() === 'sales'
        ? 'bg-red-500'
        : 'bg-green-500'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
    >
      {product.status}
    </div>
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2 text-gray-800">{product.title}</h2>
      <p className="text-gray-600 mb-4 text-lg">{product.cost}</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  </div>
);

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/AllProducts');
        const data = await response.json();
        setProducts(data.slice(0, 25));
        setFilteredProducts(data.slice(0, 25));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  }, [searchQuery, products]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.some(item => item.id === product.id);

      if (isProductInCart) {
        return prevCart; // Return the same cart if product is already in it
      }

      return [...prevCart, product];
    });
  };

  return (
    <div className="px-6 lg:px-24 py-8 bg-gray-100">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Shop</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="mt-8">
        <p className="text-xl font-semibold">Items in Cart: {cart.length}</p>
      </div>
    </div>
  );
};

export default Shop;
