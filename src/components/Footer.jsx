import React from 'react'
import logo from "../../public/assets/logo Icon.png"
import insta from "../../public/assets/insta.png"
import facebook from "../../public/assets/facebook.png"
import twiter from "../../public/assets/twiter.png"
import pinterest from "../../public/assets/pinterest.png"
import youtube from "../../public/assets/Youtube.png"
import translations from '../lang/translation.json';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { selectedLanguage } = useLanguage(); // Get selected language from context
    const t = translations[selectedLanguage] || translations['Eng']; // Get translations for the selected language
    return (
        <div className='flex justify-center  w-full border-t border-gray-300'>
            <div className='flex gap-[97px] p-4 '>
                <div className='flex flex-col gap-[24px]'>
                    <div className='flex items-center gap-[8px] '>
                        <img src={logo} alt="" />
                        <p>Comforty</p>
                    </div>

                    <div>
                        <p className='w-[330px] h-[72px]'>
                            {t.Vivamus}
                             </p>
                    </div>

                    <div className='flex gap-[4px]'>
                        <img src={facebook} alt="" />
                        <img src={twiter} alt="" />
                        <img src={insta} alt="" />
                        <img src={pinterest} alt="" />
                        <img src={youtube} alt="" />
                    </div>

                </div>




                <div className='flex gap-[119px]'>
            <div className='flex flex-col gap-[20px]'>
                <p>{t.Category}</p>
                <div className='flex flex-col gap-[10px]'>
                    <p>{t.Sofa}</p>
                    <p>{t.Armchair}</p>
                    <p>{t.WingChair}</p>
                    <p>{t.DeskChair}</p>
                    <p>{t.WoodenChair}</p>
                    <p>{t.ParkBench}</p>
                </div>
            </div>
            <div className='flex gap-[68px]'>
                <div className='flex flex-col gap-[20px]'>
                    <p>{t.Support}</p>
                    <div className='flex flex-col gap-[10px]'>
                        <p>{t.HelpAndSupport}</p>
                        <p>{t.TermsAndConditions}</p>
                        <p>{t.PrivacyPolicy}</p>
                        <p>{t.Help}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[20px]'>
                    <div>
                        <p>{t.Newsletter}</p>
                    </div>
                    <div className='flex gap-[12px]'>
                        <input className='border border-gray-300 p-2 rounded-lg' type="text" placeholder={t.YourEmail} />
                        <button className='bg-green-600 p-2 rounded-lg text-white'>{t.Subscribe}</button>
                    </div>
                    <div className='w-[424px] h-[46px]'>
                        <p>{t.LoremText}</p>
                    </div>
                </div>
            </div>
        </div>









            </div>
        </div>
    )
}   

export default Footer