import React from "react";
import logos from "./logos.svg";

const EndFooter = () => {
    return (
        <>
            <footer className=" flex justify-between h-[75px] border border-gray-500 items-center px-[200px]">
                <p className=" text-gray-400 flex gap-1">@ 2021 - Blogy - Designed & Develop by <p className=" text-black">Zakirsoft</p></p>
                <img src={logos} alt="" />
            </footer>
        </>
    )
}

export default EndFooter;