import React, { useState, useEffect } from "react";

const Loading = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isVisible && (
                <div className=" h-[100vh] flex justify-center items-center bg-slate-200">
                    <img className=" h-[990px]" src="https://static.wixstatic.com/media/0293ce_4162f33c2f9043b3bb41c86db44663b1~mv2.gif" alt="" />
                </div>
            )}
        </>
    );
};

export default Loading;
