import React, { useEffect, useState } from 'react';

const BeautifulChairPage = () => {
    const [beautifulChair, setBeautifulChair] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/top_categories/7') // JSON serverdan BeautifulChair ma'lumotlarini olish
            .then(response => response.json())
            .then(data => setBeautifulChair(data));
    }, []);

    return (
        <div>
        {beautifulChair ? (
            <>
                <div className='flex justify-center flex-col pt-7 px-10 gap-16'>
                    <p className='flex justify-center items-center text-4xl font-bold text-center text-gray-800 uppercase tracking-wider' >{beautifulChair.title}</p>
                    <div className='flex items-center justify-start gap-20 flex-wrap '>
                        {beautifulChair.products && beautifulChair.products.map(product => (
                            <div key={product.id}>
                                <img src={product.imageUrl} alt={product.title} style={{ width: '250px', height: '250px' }} />
                                <p className='flex mt-2 text-xl font-bold text-gray-950 justify-center items-center'>{product.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BeautifulChairPage;
