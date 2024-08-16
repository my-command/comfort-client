import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ onLoginSuccess }) => {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async () => {
        try {
            const [usersResponse, adminResponse] = await Promise.all([
                axios.get('http://localhost:5001/Users'),
            ]);

            const users = usersResponse.data;
    

            const user = users.find(v => v.name === name && v.kod === password);
            if (user) {
                localStorage.setItem('loggedInUser', name); // Save
                onLoginSuccess(name);
                return;
            }

            setMessage('Bunday foydalanuvchi yo\'q!!');
        } catch (error) {
            console.error('Xatolik:', error);
            setMessage('Tarmoq xatoligi!');
        }
    };

    const handleSignUp = async () => {
        try {
            const usersResponse = await axios.get('http://localhost:5001/Users');
            const users = usersResponse.data;
            const existingUser = users.find(v => v.name === name);

            if (existingUser) {
                setMessage('Bunday foydalanuvchi mavjud!');
                return;
            }

            const response = await axios.post('http://localhost:5001/Users', {
                name,
                kod: password,
            });

            if (response.status === 201) {
                setMessage('Foydalanuvchi yaratildi!');
                setIsSignUp(false);
            } else {
                setMessage('Foydalanuvchi yaratishda xatolik!');
            }
        } catch (error) {
            console.error('Xatolik:', error);
            setMessage('Tarmoq xatoligi!');
        }
    };

    const handleUp = () => {
        setIsSignUp(prevState => !prevState);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
     
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                {isSignUp ? 'Sign Up' : 'Sign In'}
            </h1>
            <input
                type="text"
                placeholder="Username.."
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {message && (
                <p className={`block mb-4 ${message.includes('yaratildi') ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
            {isSignUp ? (
                <button
                    type="button"
                    onClick={handleSignUp}
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    Sign Up
                </button>
            ) : (
                <button
                    type="button"
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Login
                </button>
            )}

            <div className='flex gap-2 mt-6 justify-center'>
                <p>{isSignUp ? "Already have an account?" : "Don’t have an account?"}</p>
                <button 
                    onClick={handleUp}
                    type="button"
                    className='text-blue-600'>
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </div>
        </form>
        </div>
    );
};

export default Login;
