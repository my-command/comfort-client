import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const ParkChairs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/ParkProducts')
      .then(res => res.json())
      .then(data => {
        // Barcha mahsulotlarni olish
        setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const incrementBasket = async (product) => {
    if (!loggedInUser) {
        alert('Please log in to add items to your basket.');
        return;
    }

    // Find the user
    const user = users.find(user => user.name === loggedInUser);

    if (user) {
        // Check if the product is already in the basket
        const isProductInBasket = user.basketItems?.some(item => item.id === product.id);

        if (isProductInBasket) {
            alert('This product is already in your basket.');
            return;
        }

        // Prepare updated basket items
        const updatedBasketItems = [...(user.basketItems || []), product];
        const updatedBasketCount = updatedBasketItems.length;

        const updatedUser = {
            ...user,
            basketItems: updatedBasketItems,
            basket: updatedBasketCount.toString() // Convert count to string
        };

        try {
            const response = await fetch(`http://localhost:5001/Users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });

            const updatedUserData = await response.json();

            // Update users state
            setUsers(prevUsers => prevUsers.map(u =>
                u.name === loggedInUser ? updatedUserData : u
            ));
            updateBasketCount(prevCount => prevCount + 1); // Update basket count
        } catch (error) {
            console.error('Error updating basket:', error);
        }
    } else {
        console.error('User not found or loggedInUser is incorrect');
    }
};
  return (
    <div className='px-12 py-6 m-11'>
      <h1 className='text-4xl font-medium text-center mb-8'>Park Chair</h1>
      <div className="flex flex-wrap justify-center gap-6 overflow-x-auto">
        {data.map((product) => (
          <NavLink
            key={product.id}
            to={`/category/${product.id}`}
            className="relative flex flex-col items-center m-4 bg-white rounded-lg shadow-lg overflow-hidden w-60 h-72 group transform transition-transform duration-500 hover:scale-105"
          >
            <img
              className="w-full h-48 object-cover"
              src={product.url}
              alt={product.title}
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
                  {product.title}
                </p>
                <p className="text-black text-lg font-semibold">{product.cost}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ParkChairs;
