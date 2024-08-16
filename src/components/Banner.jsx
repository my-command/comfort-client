import React, { useState, useEffect } from "react";
import box from "../../public/assets/box.png";
import hours from "../../public/assets/only.png";
import truck from "../../public/assets/truck.png";
import zash from "../../public/assets/zash.png";
import stul from "../../public/assets/stul1.png";
import stull from "../../public/assets/stul2.png";
import stulll from "../../public/assets/stul3.png";

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [stul, stull, stulll];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [slides.length]);

    return (
        <div className="flex flex-col items-center m-7">
            <div className="relative p-9 w-[90%] mx-auto bg-slate-200 rounded-2xl">
                <div className="carousel w-[90%] justify-center">
                    <div className="w-[80%] flex justify-center mr-[-190px]">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`carousel-item w-full flex items-center ${index === currentIndex ? "block" : "hidden"
                                    }`}
                            >
                                <div>
                                    <p className="text-black">Welcome to Chairy</p>
                                    <div className="w-[631px] h-[225px] text-gray-900">
                                        <p className="text-6xl font-bold leading-tight">
                                            Best Furniture Collection for your interior.
                                        </p>
                                    </div>
                                    <button className="bg-teal-500 text-white font-semibold rounded-md flex items-center justify-center h-[52px] w-[171px] hover:bg-teal-600">
                                        Shop Now
                                        <span className="ml-2">→</span>
                                    </button>
                                </div>
                                <img
                                    src={slide}
                                    className="w-[405px] h-[450px] m-8"
                                    alt={`Slide ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <button
                        className="h-11 w-11 flex items-center justify-center bg-slate-200 text-black text-2xl p-2 rounded-full  hover:bg-green-500 transition-all duration-150"
                        onClick={() =>
                            setCurrentIndex(
                                (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
                            )
                        }
                        aria-label="Oldingi slayd"
                    >
                        ❮
                    </button>
                    <button
                        className="h-11 w-11 flex items-center justify-center bg-slate-200 text-black text-2xl rounded-full p-2 hover:bg-green-500 transition-all duration-150"
                        onClick={() =>
                            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
                        }
                        aria-label="Keyingi slayd"
                    >
                        ❯
                    </button>
                </div>
            </div>
            <div className="flex w-[95%] justify-center gap-2 py-2 translate-x-5">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={` mt-[-120px] w-3 h-3 ${index === currentIndex ? "bg-blue-500" : "bg-gray-500"
                            } rounded-full`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Slayd ${index + 1}`}
                    ></button>
                ))}
            </div>
            <div className="flex justify-center gap-[60px] w-[1220px] h-[110px] items-center bg-white rounded-xl mt-[-80px] translate-x-9">
                <div className="flex gap-[16px]">
                    <img className="w-[46px] h-[46px]" src={box} alt="Discount" />
                    <div>
                        <p className="text-black">Discount</p>
                        <p>Every week new sales</p>
                    </div>
                </div>

                <div className="flex gap-[16px]">
                    <img className="w-[46px] h-[46px]" src={truck} alt="Free Delivery" />
                    <div>
                        <p className="text-black">Free Delivery</p>
                        <p>100% Free for all orders</p>
                    </div>
                </div>


                <div className="flex gap-[16px]">
                    <img
                        className="w-[46px] h-[46px]"
                        src={hours}
                        alt="Great Support 24/7"
                    />
                    <div>
                        <p className="text-black">Great Support 24/7</p>
                        <p>We care about your experiences</p>
                    </div>
                </div>

                <div className="flex gap-[16px]">
                    <img className="w-[46px] h-[46px]" src={zash} alt="Secure Payment" />
                    <div>
                        <p className="text-black">Secure Payment</p>
                        <p>100% Secure Payment Method</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

