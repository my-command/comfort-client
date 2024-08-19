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

const Like = () => {
    const [likedItems, setLikedItems] = useState([]);
    const loggedInUser = localStorage.getItem('loggedInUser');

    useEffect(() => {
        const fetchLikedItems = async () => {
            try {
                const response = await fetch(`http://localhost:5001/Users?name=${loggedInUser}`);
                const users = await response.json();
                const user = users[0];

                if (user) {
                    setLikedItems(user.likedItems || []);
                } else {
                    console.warn('User not found:', loggedInUser);
                }
            } catch (error) {
                console.error('Error fetching liked items:', error);
            }
        };

        if (loggedInUser) {
            fetchLikedItems();
        }
    }, [loggedInUser]);

    const updateLikes = async (updatedLikedItems) => {
        try {
            const response = await fetch(`http://localhost:5001/Users?name=${loggedInUser}`);
            const users = await response.json();
            const user = users[0];

            if (user) {
                await fetch(`http://localhost:5001/Users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...user,
                        likedItems: updatedLikedItems,
                    }),
                });

                setLikedItems(updatedLikedItems);
            } else {
                console.warn('User not found for update:', loggedInUser);
            }
        } catch (error) {
            console.error('Error updating liked items:', error);
        }
    };

    const handleLike = async (item) => {
        const alreadyLiked = likedItems.find(likedItem => likedItem.id === item.id);
        let updatedLikedItems;

        if (alreadyLiked) {
            updatedLikedItems = likedItems.filter(likedItem => likedItem.id !== item.id);
        } else {
            updatedLikedItems = [...likedItems, item];
        }

        await updateLikes(updatedLikedItems);
    };

    return (
        <div className="p-6 m-8">
            <h1 className="text-3xl ml-16 font-bold mb-4">Liked Items</h1>
            {likedItems.length === 0 ? (
                <p>You have not liked any items yet.</p>
            ) : (
                <div className="grid ml-16 mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {likedItems.map((item) => (
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
                            <button
                                onClick={() => handleLike(item)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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

export default Like;
