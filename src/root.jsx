import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import ScenicChairPage from "./CategoryPage/ScenicChairPage";
import WoodenChairPage from "./CategoryPage/WoodenChairPage";
import WingChairPage from "./CategoryPage/WingChairPage";
import DeskChairPage from './CategoryPage/DeskChairPage';
import BeautifulChairPage from './CategoryPage/BeautifulChairPage';
import EndFooter from './components/EndFooter';

const Root = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [basketCount, setBasketCount] = useState(0);


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
      />
      {showLogin ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>

          {/* Conditional rendering of Basket based on user login */}
          {loggedInUser && <Basket />}

          <Routes>
            <Route path="/" element={<><Banner /><FeaturedProducts updateBasketCount={setBasketCount} loggedInUser={loggedInUser} /><TopCategories /></>} />
            <Route path="category/1" element={<DeskChairs />} />
            <Route path="category/2" element={<WoodenChairs />} />
            <Route path="category/3" element={<DeskChairs />} />
            <Route path="category/4" element={<ParkChairs />} />
            <Route path="category/5" element={<RoomChairs />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/desk-chair" element={<DeskChairPage />} />
            <Route path="/park-chair" element={<ParkChairPage />} />
            <Route path="/room-chair" element={<RoomChairPage />} />
            <Route path="/scenic-chair" element={<ScenicChairPage />} />
            <Route path="/beautiful-chair" element={<BeautifulChairPage />} />
            <Route path="/wooden-chair" element={<WoodenChairPage />} />
            <Route path="/wing-chair" element={<WingChairPage />} />

          </Routes>
          <Testimonials loggedInUser={loggedInUser} />
          <Footer />
          <EndFooter />
        </>
      )}
    </div>
  );
};

export default Root;
