import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    const botToken = '7257024190:AAGFeNfNHBMiXOAcydRA6JLvSc_r6MG5yX0';
    const chatId = '5504133901'; // Your chat ID

    const text = `
      *New Message*
      *Name:* ${name}
      *Email:* ${email}
      *Phone:* ${phone}
      *Message:* ${message}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setFormStatus('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(data.description || 'Unknown error');
      }
    } catch (error) {
      setFormStatus('Failed to send message.');
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='px-6 lg:px-24 py-12 bg-gradient-to-r from-teal-100 to-teal-200'>
      <h1 className='text-4xl font-bold mb-8 text-gray-800 text-center'>
        Contact Us
      </h1>
      <div className='max-w-lg mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='name' className='block text-lg font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-lg p-4 bg-gray-50'
              required
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-lg font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-lg p-4 bg-gray-50'
              required
            />
          </div>
          <div>
            <label htmlFor='phone' className='block text-lg font-medium text-gray-700'>
              Phone
            </label>
            <input
              type='text'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-lg p-4 bg-gray-50'
              required
            />
          </div>
          <div>
            <label htmlFor='message' className='block text-lg font-medium text-gray-700'>
              Message
            </label>
            <textarea
              id='message'
              name='message'
              rows='6'
              value={formData.message}
              onChange={handleChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-lg p-4 bg-gray-50'
              required
            />
          </div>
          <button
            type='submit'
            className='bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300'
          >
            Send Message
          </button>
          {formStatus && (
            <p className={`mt-4 text-lg ${formStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {formStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
