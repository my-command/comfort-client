import React, { useState, useEffect } from 'react';

const Basket = () => {
    const [basketItems, setBasketItems] = useState([]);
    const loggedInUser = localStorage.getItem('loggedInUser');

    useEffect(() => {
        const fetchBasketItems = async () => {
            try {
                const response = await fetch('http://localhost:5001/Users');
                const users = await response.json();
                const user = users.find(user => user.name === loggedInUser);

                if (user) {
                    const itemCounts = user.basketItems.reduce((acc, item) => {
                        if (item && item.id) {
                            if (acc[item.id]) {
                                acc[item.id].count += 1;
                            } else {
                                acc[item.id] = { ...item, count: 1 };
                            }
                        }
                        return acc;
                    }, {});

                    setBasketItems(Object.values(itemCounts));
                } else {
                    console.warn('User not found:', loggedInUser);
                }
            } catch (error) {
                console.error('Error fetching basket items:', error);
            }
        };

        if (loggedInUser) {
            fetchBasketItems();
        }
    }, [loggedInUser]);

    const handleRemoveItem = async (itemId) => {
        try {
            const response = await fetch('http://localhost:5001/Users');
            const users = await response.json();
            const user = users.find(user => user.name === loggedInUser);

            if (user) {
                let updatedBasketItems = user.basketItems.reduce((acc, item) => {
                    if (item && item.id) {
                        if (item.id === itemId) {
                            if (item.count > 1) {
                                acc.push({ ...item, count: item.count - 1 });
                            }
                        } else {
                            acc.push(item);
                        }
                    }
                    return acc;
                }, []);

                // Calculate the new basket count
                const newBasketCount = updatedBasketItems.length;

                // Update the user's basket items and basket count on the server
                await fetch(`http://localhost:5001/Users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...user,
                        basketItems: updatedBasketItems,
                        basket: newBasketCount, // Update basket count
                    }),
                });

                // Update state
                setBasketItems(updatedBasketItems);
            } else {
                console.warn('User not found for removal:', loggedInUser);
            }
        } catch (error) {
            console.error('Error removing item from basket:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl ml-16 font-bold mb-4">Your Basket</h1>
            {basketItems.length === 0 ? (
                <p>Your basket is empty.</p>
            ) : (
                <div className="grid ml-16 mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {basketItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center w-80"
                        >
                            <div className="relative">
                                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                    {item.count}
                                </span>
                                <img
                                    src={item.url || '/default-image.jpg'}
                                    alt={item.title}
                                    className="w-full h-60 object-cover rounded-lg mb-4"
                                />
                            </div>
                            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                            <p className="text-gray-700 mb-4">{item.cost}</p>
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Basket;
