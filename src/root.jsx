import React, { useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import FeaturedProducts from './components/FeaturedProduct';
import DeskChairs from './pages/DeskChairs';
import TopCategories from './components/TopCategories';
import Testimonials from './components/Comment';
import Login from './components/Registratsia';
import FeaturedProduct from './components/FeaturedProduct';
import WoodenChairs from './pages/WoodrnChair';
import RoomChairs from './pages/RoomChairs';
import ParkChairs from './pages/ParkChairs';
import Footer from './components/footer';
import Basket from './pages/Basket';
import ParkChairPage from "./CategoryPage/ParkChairPage";
import RoomChairPage from "./CategoryPage/RoomChairPage";
import WoodenChairPage from "./CategoryPage/WoodenChairPage";
import DeskChairPage from './CategoryPage/DeskChairPage';
import EndFooter from './components/EndFooter';
import Like from './components/Like';


const Root = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [basketCount, setBasketCount] = useState(0);
  const [like, setLikeCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
      setSearchQuery(query);
  };
  const handleShowLogin = (show) => {
    setShowLogin(show);
  };

  const handleLoginSuccess = (userName) => {
    setLoggedInUser(userName);
    setShowLogin(false);
  };

  return (
    <div>
      <Navbar
        setShowLogin={handleShowLogin}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        basketCount={basketCount}
        like={like}
        onSearch={handleSearch}
      />
      {showLogin ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <FeaturedProducts searchQuery={searchQuery}  updateBasketCount={setBasketCount} updateLikeCount={setLikeCount} loggedInUser={loggedInUser} />
                  <TopCategories />
                  <Testimonials loggedInUser={loggedInUser} />
                </>
              }
            />
            <Route path="/category/1" element={<DeskChairs />} />
            <Route path="/category/2" element={<WoodenChairs />} />
            <Route path="/category/3" element={<DeskChairs />} />
            <Route path="/category/4" element={<ParkChairs />} />
            <Route path="/category/5" element={<RoomChairs />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/desk-chair" element={<DeskChairPage />} />
            <Route path="/park-chair" element={<ParkChairPage />} />
            <Route path="/room-chair" element={<RoomChairPage />} />
            <Route path="/wooden-chair" element={<WoodenChairPage />} />
            <Route path="/like" element={<Like />} />
          </Routes>
          <Footer />
          <EndFooter />
        </>
      )}
    </div>
  );
};
export default Root;