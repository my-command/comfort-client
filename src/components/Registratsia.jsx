import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useLanguage } from '../context/LanguageContext'; // Import useLanguage
import translations from '../lang/translation.json'; // Import translations

const Login = ({ onLoginSuccess }) => {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { selectedLanguage } = useLanguage(); // Get the selected language
    const t = translations[selectedLanguage]; // Get the translation based on the selected language

    const handleLogin = async () => {
        try {
            const usersResponse = await axios.get('http://localhost:5001/Users');
            const users = usersResponse.data;
    
            const user = users.find(v => v.name === name && v.kod === password);
            if (user) {
                localStorage.setItem('loggedInUser', name); // Save
                onLoginSuccess(name);
                return;
            }

            setMessage(t.userNotFound); // Use translation
        } catch (error) {
            console.error('Xatolik:', error);
            setMessage(t.networkError); // Use translation
        }
    };

    const handleSignUp = async () => {
        try {
            const usersResponse = await axios.get('http://localhost:5001/Users');
            const users = usersResponse.data;
            const existingUser = users.find(v => v.name === name);

            if (existingUser) {
                setMessage(t.userExists); // Use translation
                return;
            }

            const response = await axios.post('http://localhost:5001/Users', {
                name,
                kod: password,
            });

            if (response.status === 201) {
                setMessage(t.userCreated); // Use translation
                setIsSignUp(false);
            } else {
                setMessage(t.userCreateError); // Use translation
            }
        } catch (error) {
            console.error('Xatolik:', error);
            setMessage(t.networkError); // Use translation
        }
    };

    const handleUp = () => {
        setIsSignUp(prevState => !prevState);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    {isSignUp ? t.signUp : t.signIn} {/* Use translation */}
                </h1>
                <input
                    type="text"
                    placeholder={t.username} // Use translation
                    value={name}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder={t.password} // Use translation
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {message && (
                    <p className={`block mb-4 ${message.includes(t.userCreated) ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
                {isSignUp ? (
                    <button
                        type="button"
                        onClick={handleSignUp}
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        {t.signUp} {/* Use translation */}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {t.signIn} {/* Use translation */}
                    </button>
                )}

                <div className='flex gap-2 mt-6 justify-center'>
                    <p>{isSignUp ? t.alreadyHaveAccount : t.dontHaveAccount}</p> {/* Use translation */}
                    <button 
                        onClick={handleUp}
                        type="button"
                        className='text-blue-600'>
                        {isSignUp ? t.signIn : t.signUp} {/* Use translation */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
