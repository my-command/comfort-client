import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../public/assets/check 1.png';
import info from '../../public/assets/info.png';
import logo from '../../public/assets/logo.png';
import search from '../../public/assets/search.png';
import shop from '../../public/assets/shop.png';
import login from '../../public/assets/login.png';
import translations from '../lang/translation.json';
import { useLanguage } from '../context/LanguageContext';
const HeartIcon = () => (
    <svg
        className="w-6 h-6 fill-currentborder "
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

const Navbar = ({ setShowLogin, loggedInUser, setLoggedInUser }) => {
    const { selectedLanguage, handleChange } = useLanguage();
    const t = translations[selectedLanguage]; // Get the translation based on the selected languag
    const [selectedOption, setSelectedOption] = useState('Eng');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [basketCount, setBasketCount] = useState(0);
    const [like, setLikeCount] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const navigate = useNavigate();

    useEffect(() => {
        const savedLoggedInUser = localStorage.getItem('loggedInUser');
        if (savedLoggedInUser) {
            setLoggedInUser(savedLoggedInUser);
            fetchUserBasket(savedLoggedInUser);
        }
    }, [setLoggedInUser]);

    const fetchUserBasket = async (username) => {
        try {
            const response = await fetch('http://localhost:5001/Users');
            const data = await response.json();
            const user = data.find(user => user.name === username);

            if (user) {
                if (user.basketItems.length === 0) {
                    setBasketCount(0);
                    await fetch(`http://localhost:5001/Users/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...user,
                            basket: 0
                        }),
                    });
                } else {
                    setBasketCount(Number(user.basket));
                }
            } else {
                setBasketCount(0);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };
    const fetchUserLike = async (username) => {
        try {
            const response = await fetch('http://localhost:5001/Users');
            const data = await response.json();
            const user = data.find(user => user.name === username);

            if (user) {
                if (user.likeitems.length === 0) {
                    setLiketCount(0);
                    await fetch(`http://localhost:5001/Users/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...user,
                            like: 0
                        }),
                    });
                } else {
                    setLikeCount(Number(user.like));
                }
            } else {
                setLikeCount(0);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };
    const handleLoginClick = () => {
        setLoggedInUser(null);
        localStorage.removeItem('loggedInUser');
        setShowLogin(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        setBasketCount(0);
        navigate('/');
    };

    const handleCartClick = () => {
        navigate('/basket');
    };
    const handleLikeClick = () => {
        navigate('/like');
    };
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setDropdownOpen(false);
    };

    return (
        <div className='sticky top-0 z-10'>
            {/* Top Bar */}
            <div className='flex bg-[#272343] pt-3 pb-3 justify-between px-32'>
                <div className='flex items-center gap-2'>
                    <img src={img} alt="Free shipping" />
                    <p className='font-inter text-xs font-normal leading-4 text-[#F0F2F3] cursor-pointer'>
                        {t.freeShipping}
                    </p>
                </div>
                <div className='flex items-center gap-6'>
                <select onChange={(e) => handleChange(e.target.value)} value={selectedLanguage} className="bg-transparent text-[#F0F2F3] focus:outline-none">
                        <option value="Eng">Eng</option>
                        <option value="Uzb">Uzb</option>
                        <option value="Rus">Rus</option>
                    </select>
                    <p className='font-inter text-xs font-normal leading-4 text-center text-[#f0f2f3] cursor-pointer'>
                        {t.faqss}
                    </p>
                    <div className='flex items-center gap-1.5'>
                        <img src={info} alt="Info" />
                        <p className='font-inter text-xs font-normal leading-4 text-center text-[#f0f2f3] cursor-pointer'>
                            {t.needHelp}
                        </p>
                    </div>
                </div>
            </div>
            {/* Main Navbar */}
            <div className='flex items-center w-full bg-[#F0F2F3] py-5 px-36 justify-between'>
                <div>
                    <Link to="/" className='flex items-center gap-2'>
                        <img src={logo} alt="" />
                        <p className='font-inter text-2xl font-medium leading-8 text-left text-[#272343]'>
                            Comforty
                        </p>
                    </Link>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t.Search}
                        className="w-[413px]  pl-4 py-3 border border-transparent bg-white rounded-[5px] focus:outline-none focus:placeholder:text-[#9A9CAA] placeholder:text-[#9A9CAA] text-[#9A9CAA] font-inter text-base font-normal leading-6 text-left"
                    />
                    <img
                        src={search}
                        alt=""
                        className="absolute left-[91%] top-1/2 transform -translate-y-1/2"
                    />
                </div>
                <div className='flex items-center gap-3'>
                    <div className='flex items-center p-3 bg-white rounded-lg gap-2 w-32'>
                        <Link to="/basket" onClick={handleCartClick}>
                            <button className='flex items-center gap-3' >
                                <img className='w-7' src={shop} alt="Cart" />
                                <p className='font-medium flex items-center gap-3 text-lg leading-4 text-center text-[#4e4e4f]'>
                                    {t.Cart}
                                    <div className='w-6 h-6 flex items-center justify-center text-sm rounded-full text-white font-normal bg-emerald-700'>
                                        {basketCount}
                                    </div>
                                </p>
                            </button>
                        </Link>
                    </div>
                    <Link to="/like" onClick={handleLikeClick}>
                        <button >
                            <div className='flex items-center p-3 bg-white rounded-lg'>
                                <HeartIcon />
                            </div>
                        </button>
                    </Link>
                    <div className='flex items-center p-3 h-12 bg-white rounded-lg'>
                        {!loggedInUser ? (
                            <button type='button' onClick={handleLoginClick}>
                                <img src={login} alt="Login" />
                            </button>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <p className='flex items-center'>{loggedInUser}</p>
                                <button onClick={handleLogout} className='bg-green-500 text-white px-3 py-1 rounded'>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Navbar */}
            <div className='flex items-center py-[14px] px-[210px] bg-white justify-between'>
                <div className='flex items-center gap-8'>
                    <nav className='relative border py-2 px-9 rounded-xl'>
                        <div className='mr-auto'>
                            <button
                                onClick={toggleDropdown}
                                className='bg-transparent border-none text-[14px] cursor-pointer'
                            >
                                {selectedCategory}
                            </button>
                            {dropdownOpen && (
                                <div className='absolute top-full left-0 bg-white shadow-lg p-2 rounded-md z-10'>

                                    <Link
                                        to="/wooden-chair"
                                        className='block py-1 px-2 text-black no-underline hover:text-[#007bff]'
                                        onClick={() => handleCategoryChange('Wooden Chair')}
                                    >
                                        {t.WoodenChair}
                                    </Link>

                                    <Link
                                        to="/room-chair"
                                        className='block py-1 px-2 text-black no-underline hover:text-[#007bff]'
                                        onClick={() => handleCategoryChange('Office Chair')}
                                    >
                                        {t.RoomChair}
                                    </Link>
                                    <Link
                                        to="/park-chair"
                                        className='block py-1 px-2 text-black no-underline hover:text-[#007bff]'
                                        onClick={() => handleCategoryChange('Arm Chair')}
                                    >
                                        {t.ParkChair    }
                                    </Link>
                                    <Link
                                        to="/desk-chair"
                                        className='block py-1 px-2 text-black no-underline hover:text-[#007bff]'
                                        onClick={() => handleCategoryChange('All Categories')}
                                    >
                                       {t.DeskChair}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                    <Link
                        to="/furniture"
                        className='font-inter text-base font-normal leading-5 text-[#4e4e4f] no-underline hover:text-[#007bff]'
                    >
                       {t.Furiniture}
                    </Link>
                    <Link
                        to="/shop"
                        className='font-inter text-base font-normal leading-5 text-[#4e4e4f] no-underline hover:text-[#007bff]'
                    >
                        {t.shop}
                    </Link>
                    <Link
                        to="/about-us"
                        className='font-inter text-base font-normal leading-5 text-[#4e4e4f] no-underline hover:text-[#007bff]'
                    >
                        {t.about}
                    </Link> 
                    <Link
                        to="/contact-us"
                        className='font-inter text-base font-normal leading-5 text-[#4e4e4f] no-underline hover:text-[#007bff]'
                    >
                        {t.contact}
                    </Link>
                </div>
                <div className='flex items-center gap-10'>
                    <p className='font-inter text-xs font-medium leading-4 text-center text-[#4e4e4f]'>
                        Call Us +998900178080
                    </p>
                    <button className='bg-[#A4BCFD] rounded-3xl py-3 px-4 font-inter text-xs font-medium leading-4 text-center text-[#272343]'>
                        Get Discount
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
