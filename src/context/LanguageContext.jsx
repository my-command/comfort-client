// src/context/LanguageContext.js
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('Eng');

    const handleChange = (language) => {
        setSelectedLanguage(language);
    };

    return (
        <LanguageContext.Provider value={{ selectedLanguage, handleChange }}>
            {children}
        </LanguageContext.Provider>
    );
};
