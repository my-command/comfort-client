import React from 'react'
import logo from "../../public/assets/logo Icon.png"
import insta from "../../public/assets/insta.png"
import facebook from "../../public/assets/facebook.png"
import twiter from "../../public/assets/twiter.png"
import pinterest from "../../public/assets/pinterest.png"
import youtube from "../../public/assets/Youtube.png"


const Footer = () => {
    return (
        <div className='flex justify-center  w-full border-t border-gray-300'>
            <div className='flex gap-[97px] p-4 '>
                <div className='flex flex-col gap-[24px]'>
                    <div className='flex items-center gap-[8px] '>
                        <img src={logo} alt="" />
                        <p>Comforty</p>
                    </div>

                    <div>
                        <p className='w-[330px] h-[72px]'>Vivamus tristique odio sit amet velit semper, eu posuere turpis interdum.
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
                        <p>Category</p>
                        <div className='flex flex-col gap-[10px]'>
                            <p>Sofa</p>
                            <p>Armchair</p>
                            <p>Wing Chair</p>
                            <p>Desk Chair</p>
                            <p>wooden chair</p>
                            <p>Park bench</p>
                        </div>
                    </div>
                    <div className='flex gap-[68px]'>
                        <div className=' flex flex-col gap-[20px]'>
                            <p>Support</p>
                            <div className='flex flex-col gap-[10px]'>
                                <p>Help & Support</p>
                                <p>Tearms & Conditions</p>
                                <p>Privacy Policy</p>
                                <p>Help</p>
                            </div>

                        </div>
                        <div className='flex flex-col gap-[20px]'>
                            <div>
                                <p>Newsletter</p>
                            </div>
                            <div className='flex gap-[12px]'>
                                <input className='border border-gray-300" p-2 rounded-lg' type="text" placeholder='Your Email' />
                                <button className='bg-green-600 p-2 rounded-lg text-white'>Subscribe</button>
                            </div>
                            <div className='w-[424px] h-[46px] '>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim.</p>
                            </div>

                        </div>


                    </div>
                </div>
               








            </div>
        </div>
    )
}

export default Footer
