import React, { useEffect, useState } from 'react';
import Like from './Like';
import { useLanguage } from '../context/LanguageContext'; // Import the useLanguage hook
import translations from '../lang/translation.json'; // Import your translation JSON file
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

const FeaturedProducts = ({ updateBasketCount, loggedInUser }) => {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const { selectedLanguage } = useLanguage(); // Get selected language from context
    const t = translations[selectedLanguage] || translations['Eng']; // Get translations for the selected language
    useEffect(() => {
        // Fetch featured products and users data
        fetch('http://localhost:5001/Featured_Products')
            .then(res => res.json())
            .then(data => setData(data || []))
            .catch(error => console.error('Error fetching featured products:', error));

        fetch('http://localhost:5001/Users')
            .then(res => res.json())
            .then(users => setUsers(users || []))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentItems = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                    headers: {
                        'Content-Type': 'application/json'
                    },
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

            let updatedLikedItems;
            if (isProductLiked) {
                updatedLikedItems = user.likedItems.filter(item => item.id !== product.id);
            } else {
                updatedLikedItems = [...(user.likedItems || []), product];
            }

            const updatedUser = {
                ...user,
                likedItems: updatedLikedItems,
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
        <div className="px-12 py-6 m-5">
            <div className="flex items-center flex-nowrap justify-between mb-6 overflow-x-auto">
                <p className="text-2xl font-bold">{t.featuredProducts}</p>
                <div className="pagination flex items-center gap-2 m-3">
                    <button
                        className="px-4 py-2 rounded-full text-xl bg-gray-400 hover:bg-green-500 transition-all duration-500 disabled:bg-gray-200 disabled:text-gray-500"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                    <span className="px-4 py-2 text-lg font-semibold">{currentPage} of {totalPages}</span>
                    <button
                        className="px-4 py-2 rounded-full text-xl bg-gray-400 hover:bg-green-500 transition-all duration-500 disabled:bg-gray-200 disabled:text-gray-500"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 overflow-x-auto m-4">
                {currentItems.map((product) => {
                    const user = users.find(user => user.name === loggedInUser);
                    const isProductLiked = user?.likedItems?.some(item => item.id === product.id);

                    return (
                        <div
                            key={product.id}
                            className="relative flex flex-col items-center m-4 bg-white rounded-lg shadow-lg overflow-hidden w-64 h-[350px] group transform hover:transition-colors duration-500"
                        >
                            <img
                                className="w-full h-64 cursor-pointer object-cover"
                                src={product.url}
                                alt={product.title}
                            />
                            {product.status && (
                                <div className=''> 
                                    <div
                                        className={`status absolute top-2 left-2 p-2 text-white rounded-lg ${product.status.toLowerCase() === 'sales'
                                                ? 'bg-orange-500'
                                                : 'bg-green-500'
                                            } hidden group-hover:block`}
                                    >
                                        {product.status}
                                    </div>
                                    <div
                                        className={`items-center p-2 bg-white rounded-lg status absolute top-2 right-2 ${isProductLiked ? 'text-red-500' : 'text-gray-200'}`}
                                        onClick={() => handleLikeToggle(product)}
                                    >
                                        <HeartIcon isLiked={isProductLiked} />
                                    </div>
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 w-full p-2 flex justify-between items-center bg-white bg-opacity-80">
                                <div className="flex flex-col items-start">
                                    <p className="text-black font-bold text-lg">{product.title}</p>
                                    <p className="text-black text-lg font-semibold">{product.cost}</p>
                                </div>
                                <div>
                                    <button onClick={() => incrementBasket(product)}>
                                        <img className='w-10' src="../public/assets/karzina-removebg-preview.png" alt="Add to cart" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturedProducts;