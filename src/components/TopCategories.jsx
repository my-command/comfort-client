import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import translations from '../lang/translation.json'; // Import translation JSON
const TopCategories = () => {
    const [data, setData] = useState([]);
    const { selectedLanguage, handleChange } = useLanguage();
    useEffect(() => {
        fetch('http://localhost:5001/top_categories')
            .then(res => res.json())
            .then(data => setData(data || []))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    console.log(data);
    const t = translations[selectedLanguage];
    return (
        <div className='px-[100px]'>
            <p className='py-[20px] text-[32px]'>{t.topCategories}</p>
            <div className="carousel rounded-box flex items-center gap-5 relative">
                {data.map((category, index) => (
                    <NavLink key={index} to={`/category/${category.id}`} className="carousel-item relative flex items-center flex-col cursor-pointer">
                        <img className='w-[424px] h-[424px] rounded-[10px]' src={category.url} alt={category.title} />
                        <div className='absolute bottom-0 w-full h-[85px] flex items-center justify-center text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}>
                            <div className='text-center'>
                                <p className='mb-1'>{category.title}</p>
                                <p>{category.product}</p>
                                <p>{t.viewProduct}</p>
                            </div>
                            
                        </div>
                    </NavLink>
                ))}
            </div>
            <Outlet />
        </div>
    );
};

export default TopCategories;
