import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const WoodenChairs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/WoodenProducts')
      .then(res => res.json())
      .then(data => {
        // Barcha mahsulotlarni olish
        setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='px-12 py-6 m-11 flex flex-col items-center'>
      <h1 className='text-4xl font-medium mb-8'>Wooden Chair</h1>
      <div className="flex flex-wrap justify-center gap-6 overflow-x-auto">
        {data.length > 0 ? data.map((product) => (
          <NavLink
            key={product.id}
            to={`/category/${product.id}`}
            className="relative flex flex-col items-center m-4 bg-white rounded-lg shadow-lg overflow-hidden w-60 h-72 group transform transition-transform duration-500 hover:scale-105"
          >
            <img
              className="w-full h-48 object-cover"
              src={product.url}
              alt={product.title || 'Product Image'}
            />
            {product.status && (
              <div
                className={`absolute top-2 left-2 p-2 text-white rounded-lg ${
                  product.status.toLowerCase() === 'sales'
                    ? 'bg-orange-500'
                    : 'bg-green-500'
                } hidden group-hover:block`}
              >
                {product.status}
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-80">
              <div className="flex flex-col items-start">
                <p className="text-black font-bold text-lg group-hover:text-green-500 transition-colors duration-300">
                  {product.title || 'No Title'}
                </p>
                <p className="text-black text-lg font-semibold">{product.cost}</p>
              </div>
            </div>
          </NavLink>
        )) : (
          <p className="text-xl text-gray-500">No Wooden Chairs available</p>
        )}
      </div>
    </div>
  );
};

export default WoodenChairs;
