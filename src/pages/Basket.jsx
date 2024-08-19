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
                    // Map through user's basketItems and calculate counts
                    const itemCounts = user.basketItems.reduce((acc, item) => {
                        if (item && item.id) {
                            if (acc[item.id]) {
                                acc[item.id].count += item.count || 1; // Accumulate count correctly
                            } else {
                                acc[item.id] = { ...item, count: item.count || 1 }; // Initialize count
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

    const updateBasket = async (updatedBasketItems) => {
        try {
            const response = await fetch('http://localhost:5001/Users');
            const users = await response.json();
            const user = users.find(user => user.name === loggedInUser);

            if (user) {
                // Calculate the new basket count
                const newBasketCount = updatedBasketItems.reduce((acc, item) => acc + item.count, 0);

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
                console.warn('User not found for update:', loggedInUser);
            }
        } catch (error) {
            console.error('Error updating basket:', error);
        }
    };

    const handleAddItem = async (itemId) => {
        try {
            // Add or update item in basket
            const updatedBasketItems = basketItems.map(item => 
                item.id === itemId
                    ? { ...item, count: (item.count || 0) + 1 } // Increment count
                    : item
            );

            // Check if item was not already in basket
            if (!updatedBasketItems.some(item => item.id === itemId)) {
                const item = basketItems.find(item => item.id === itemId);
                if (item) {
                    updatedBasketItems.push({ ...item, count: 1 });
                }
            }

            await updateBasket(updatedBasketItems);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            // Remove or update item in basket
            const updatedBasketItems = basketItems.reduce((acc, item) => {
                if (item.id === itemId) {
                    if ((item.count || 0) > 1) {
                        acc.push({ ...item, count: (item.count || 0) - 1 }); 
                    }
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);

            await updateBasket(updatedBasketItems);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };
    const handleRemoveItemm = async (itemId) => {
        try {
            const updatedBasketItems = basketItems.filter(item => item.id !== itemId);
    
            await updateBasket(updatedBasketItems);
        } catch (error) {
            console.error('Xato: mahsulotni o‘chirishda:', error);
        }
    };
    return (
        <div className="p-6 m-8">
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
                                <img
                                    src={item.url || '/default-image.jpg'}
                                    alt={item.title}
                                    className="w-full h-60 object-cover rounded-lg mb-4"
                                />
                            </div>
                            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                            <p className="text-gray-700 mb-4">{item.cost}</p>
                            <div className='flex gap-4 items-center flex-col'>
                                <button
                                    onClick={() => handleRemoveItemm(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                    disabled={item.count <= 1}
                                >
                                    Remove
                                </button>

                                <div className='flex gap-4 items-center'>
                                    <button
                                        onClick={() => handleAddItem(item.id)}
                                        className="bg-emerald-600 text-white px-4 py-1 rounded-lg hover:bg-emerald-700"
                                    >
                                        +
                                    </button>
                                    <span className="px-3 py-2 bg-emerald-600 text-white rounded-full text-xs">
                                        {item.count}
                                    </span>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
                                        disabled={item.count <= 1}
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Basket;
