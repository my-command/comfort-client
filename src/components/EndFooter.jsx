import React from "react";
import logos from "./logos.png";

const EndFooter = () => {
    return (
        <>
            <footer className=" flex justify-between h-[75px] border border-gray-500 items-center px-[200px]">
                <p className=" text-gray-400 flex gap-1 ml-[-80px]">@ 2021 - Blogy - Designed & Develop by <p className=" text-black">Zakirsoft</p></p>
                <img className="w-[300px]" src={logos} alt="" />
            </footer>
        </>
    )
}

export default EndFooter;