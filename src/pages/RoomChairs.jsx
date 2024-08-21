import React, { useEffect, useState } from 'react';

const HeartIcon = ({ isLiked }) => (
  <svg
    className={`w-6 h-6 fill-current ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const RoomChairs = ({ updateBasketCount, loggedInUser }) => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/RoomProducts')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));

    fetch('http://localhost:5001/Users')
      .then(res => res.json())
      .then(users => setUsers(users || []))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const incrementBasket = async (product) => {
    if (!loggedInUser) {
      alert('Please log in to add items to your basket.');
      return;
    }

    const user = users.find(user => user.name === loggedInUser);

    if (user) {
      const isProductInBasket = user.basketItems?.some(item => item.id === product.id);

      if (isProductInBasket) {
        alert('This product is already in your basket.');
        return;
      }

      const updatedBasketItems = [...(user.basketItems || []), product];
      const updatedBasketCount = updatedBasketItems.length;

      const updatedUser = {
        ...user,
        basketItems: updatedBasketItems,
        basket: updatedBasketCount.toString()
      };

      try {
        const response = await fetch(`http://localhost:5001/Users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser)
        });

        const updatedUserData = await response.json();
        setUsers(prevUsers => prevUsers.map(u =>
          u.name === loggedInUser ? updatedUserData : u
        ));
        updateBasketCount(prevCount => prevCount + 1);
      } catch (error) {
        console.error('Error updating basket:', error);
      }
    } else {
      console.error('User not found or loggedInUser is incorrect');
    }
  };

  const handleLikeToggle = async (product) => {
    if (!loggedInUser) {
      alert('Please log in to like products.');
      return;
    }

    const user = users.find(user => user.name === loggedInUser);

    if (user) {
      const isProductLiked = user.likedItems?.some(item => item.id === product.id);

      const updatedLikedItems = isProductLiked
        ? user.likedItems.filter(item => item.id !== product.id)
        : [...(user.likedItems || []), product];

      const updatedUser = {
        ...user,
        likedItems: updatedLikedItems,
      };

      try {
        const response = await fetch(`http://localhost:5001/Users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser)
        });

        const updatedUserData = await response.json();
        setUsers(prevUsers => prevUsers.map(u =>
          u.name === loggedInUser ? updatedUserData : u
        ));
      } catch (error) {
        console.error('Error updating liked items:', error);
      }
    } else {
      console.error('User not found or loggedInUser is incorrect');
    }
  };

  return (
    <div className='px-12 py-6 m-11'>
      <div className="flex flex-wrap justify-center gap-6 overflow-x-auto">
        <h1 className='text-4xl font-medium'>Room Chair</h1>
        <div className='flex flex-wrap justify-center gap-6'>
          {data.map((product) => {
            const user = users.find(user => user.name === loggedInUser);
            const isProductLiked = user?.likedItems?.some(item => item.id === product.id);

            return (
              <div
                key={product.id}
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
                        : product.status.toLowerCase() === 'new'
                        ? 'bg-green-500'
                        : 'bg-black bg-opacity-50'
                    } hidden group-hover:block`}
                  >
                    {product.status}
                  </div>
                )}
                <div className="absolute top-2 right-2 flex items-center">
                  <button
                    className={`p-2 rounded-full ${isProductLiked ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => handleLikeToggle(product)}
                  >
                    <HeartIcon isLiked={isProductLiked} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-80 flex justify-between items-center">
                  <div className="flex flex-col items-start">
                    <p className="text-black font-bold text-lg group-hover:text-green-500 transition-colors duration-300">
                      {product.title}
                    </p>
                    <p className="text-black text-lg font-semibold">{product.cost}</p>
                  </div>
                  <button onClick={() => incrementBasket(product)}>
                    <img className='w-10' src="../public/assets/karzina-removebg-preview.png" alt="Add to cart" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomChairs;
