import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import img10 from "../../public/assets/10.png";
import img109 from "../../public/assets/109.png";
import translations from '../lang/translation.json';
import { useLanguage } from '../context/LanguageContext';
const Testimonials = ({ loggedInUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const containerRef = useRef(null);
    const { selectedLanguage } = useLanguage(); // Get selected language from context
    const t = translations[selectedLanguage];
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await axios.get('http://localhost:5001/comment');
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Xatolik:', error);
      }
    };

    fetchComments();
  }, []);

  const handleAddComment = () => {
    const date = new Date().toLocaleString();
 // Get translations for the selected language
    const newCommentObj = {
      id: comments.length + 1,
      commet: newComment,
      url: "https://via.placeholder.com/150",
      name: loggedInUser, // Foydalanuvchi ismi
      field: "Customer",
      date: date
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');

    axios.post('http://localhost:5001/comment', newCommentObj)
      .then(response => {
        console.log("Yangi komment muvaffaqiyatli qo'shildi:", response.data);
      })
      .catch(error => {
        console.error("Kommentni qo'shishda xatolik yuz berdi:", error);
      });
  };

  const scrollRight = () => {
    containerRef.current.scrollLeft += 700;
    setActiveButton(2);
  };

  const scrollLeft = () => {
    containerRef.current.scrollLeft -= 700;
    setActiveButton(1);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='flex items-center w-[1200px] justify-between mb-11'>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">{t.WhatClientsSay}</h2>
          <input
            type="text"
            placeholder={t.comment}
                        value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border p-2 rounded-md"
          />
          <button
            onClick={handleAddComment}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {t.addcomment}
          </button>
        </div>
        <div className='flex gap-3 mb-6 justify-between w-[1180px]'>
          <div className='w-6'></div>
          <div className='flex gap-3'>
            <button
              onClick={scrollLeft}
              type='button'
              className={`w-10 h-10 flex items-center justify-center rounded-full ${activeButton === 1 ? 'bg-green-600 active:bg-green-700' : 'bg-white'}`}
            >
              <img className='w-6' src={img10} alt="left-arrow" />
            </button>
            <button
              onClick={scrollRight}
              type='button'
              className={`w-10 h-10 flex items-center justify-center rounded-full ${activeButton === 2 ? 'bg-green-600' : 'bg-white'} active:bg-green-700 transition all 1s`}
            >
              <img className='w-6' src={img109} alt="right-arrow" />
            </button>
          </div>
        </div>
        <div ref={containerRef} className="flex gap-6 flex-nowrap overflow-x-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-6 rounded-lg shadow-lg w-[580px] mb-4 flex-shrink-0">
              <p className="text-lg text-gray-700 mb-4">
                <span className="text-4xl text-gray-300">&ldquo;</span>
                {comment.commet}
                <span className="text-4xl text-gray-300">&rdquo;</span>
              </p>
              <p className="text-sm text-gray-500 mb-2">{comment.date}</p>
              <div className="flex items-center">
                <img
                  src={comment.url}
                  alt={comment.name}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{comment.name}</p>
                  <p className="text-sm text-gray-500">{comment.field}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;