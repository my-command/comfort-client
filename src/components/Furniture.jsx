import React, { useEffect, useState } from 'react';

const Furniture = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5001/AllProducts');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search query
    const filteredBySearch = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filteredBySearch.slice(0, 25));
  }, [searchQuery, products]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.some(item => item.id === product.id);
      if (isProductInCart) {
        return prevCart; // Return the same cart if product is already in it
      }
      return [...prevCart, product]; // Add product to cart
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='px-6 lg:px-24 py-6 bg-gray-50'>
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className='border-2 border-gray-300 rounded-lg p-2 w-full'
        />
      </div>

      {/* Page Title */}
      <h1 className='text-3xl font-bold mb-8 text-gray-800'>
        Furniture
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 group"
          >
            <img
              className='w-full h-64 object-cover'
              src={product.url}
              alt={product.title}
            />
            {product.status && (
              <div
                className={`absolute top-2 left-2 p-2 text-white rounded-lg ${product.status.toLowerCase() === 'sales'
                    ? 'bg-orange-500'
                    : 'bg-green-500'
                  } hidden group-hover:block`}
              >
                {product.status}
              </div>
            )}
            <div className="p-4">
              <h2 className='text-xl font-semibold mb-2 text-gray-800'>{product.title}</h2>
              <p className='text-gray-600 mb-4'>{product.cost}</p>
              <button
                className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Display cart count (optional) */}
      <div className="mt-6">
        <p className="text-lg font-semibold">Items in Cart: {cart.length}</p>
      </div>
    </div>
  );
};

export default Furniture;
