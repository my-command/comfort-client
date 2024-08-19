import React, { useState } from 'react';
import logo from "../../public/assets/logo Icon.png";
import insta from "../../public/assets/insta.png";
import facebook from "../../public/assets/facebook.png";
import twiter from "../../public/assets/twiter.png";
import pinterest from "../../public/assets/pinterest.png";
import youtube from "../../public/assets/Youtube.png";

const Footer = () => {
    const [inputValue, setInputValue] = useState('');

    const sendMessage = async () => {
        const botToken = '7347974892:AAHVJ94kEAjhuaEo6Y3s7G7gLcxrvQUroE4';
        const chatId = '854252254';
        const message = inputValue;

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            });

            const data = await response.json();

            if (data.ok) {
                alert('Сообщение успешно отправлено!');
            } else {
                alert('Не удалось отправить сообщение.');
            }
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
            alert('Ошибка при отправке сообщения.');
        }
    };

    return (
        <div>
            <div className='flex gap-[97px] justify-center mt-[23px] mb-10'>
                <div className='flex flex-col gap-[24px]'>
                    <div className='flex items-center gap-[8px] '>
                        <img src={logo} alt="" />
                        <p className='font-medium text-xl '>Comforty</p>
                    </div>

                    <div>
                        <p className='w-[330px] h-[72px] text-slate-400'>Vivamus tristique odio sit amet velit semper, eu posuere turpis interdum.
                            Cras egestas purus </p>
                    </div>

                    <div className='flex gap-[4px]'>
                        <img src={facebook} alt="" />
                        <img src={twiter} alt="" />
                        <img src={insta} alt="" />
                        <img src={pinterest} alt="" />
                        <img src={youtube} alt="" />
                    </div>
                </div>

                <div className=' flex gap-[119px]'>
                    <div className=' flex flex-col gap-[20px]'>
                        <p className='text-slate-400 font-normal text-xl'>Category</p>
                        <div className='flex flex-col gap-[10px]'>
                            <p  className='hover:text-cyan-500 cursor-pointer'>Sofa</p>
                            <p  className='hover:text-cyan-500 cursor-pointer'>Armchair</p>
                            <p  className='hover:text-cyan-500 cursor-pointer'>Wing Chair</p>
                            <p  className='hover:text-cyan-500 cursor-pointer'>Desk Chair</p>
                            <p  className='hover:text-cyan-500 cursor-pointer'>wooden chair</p>
                            <p  className='hover:text-cyan-500 cursor-pointer'>Park bench</p>
                        </div>
                    </div>
                    <div className='flex gap-[68px]'>
                        <div className=' flex flex-col gap-[20px]'>
                            <p className='text-slate-400 font-normal text-xl'>Support</p>
                            <div className='flex flex-col gap-[10px]'>
                                <p className='hover:text-cyan-500 cursor-pointer'>Help & Support</p>
                                <p className='hover:text-cyan-500 cursor-pointer'>Tearms & Conditions</p>
                                <p className='hover:text-cyan-500 cursor-pointer'>Privacy Policy</p>
                                <p className='hover:text-cyan-500 cursor-pointer'>Help</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[20px]'>
                            <div>
                                <p className='text-slate-400 font-wight-450; text-xl'>NEWSLETTER</p>
                            </div>
                            <div className='flex gap-[12px]'>
                                <input
                                    type="text"
                                    placeholder="Your email"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <button onClick={sendMessage} className='bg-cyan-500 text-white text-sm font-medium py-2 px-4 rounded-lg'>Add</button>
                            </div>
                            <div className='w-[424px] h-[46px]'>
                                <p className='text-slate-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
