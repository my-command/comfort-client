
import React, { useEffect, useState } from 'react';

const WingChairPage = () => {
    const [wingChair, setWingChair] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/top_categories/1') // JSON serverdan ma'lumot olish
            .then(response => response.json())
            .then(data => setWingChair(data));
    }, []);

    return (
        <div>
            {wingChair ? (
                <>
                    <div className='flex justify-center flex-col pt-7 px-10 gap-16'>
                        <p className='flex justify-center items-center text-4xl font-bold text-center text-gray-800 uppercase tracking-wider'>{wingChair.title}</p>
                        <div className='flex items-center justify-start gap-20 flex-wrap '>
                            {wingChair.WingProsucts && wingChair.WingProsucts.map(product => (
                                <div key={product.id}><img src={product.url} alt={product.title} style={{ width: '250px', height: '250px' }} />
                                    <p className='flex mt-2 text-xl font-bold text-gray-950 justify-center items-center'>{product.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading....</p>
            )}
        </div>
    );
};

export default WingChairPage;
