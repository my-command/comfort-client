import React, { useState } from 'react';
import { Route, Router, Routes, useLocation } from 'react-router-dom';
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
import Hamkorlar from './components/Hamkorlar';
import Loading from './components/Loading';
import { LanguageProvider } from './context/LanguageContext';
import Like from './components/Like';

const Root = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [basketCount, setBasketCount] = useState(0);
  const [like, setLikeCount] = useState(0);

  const handleShowLogin = (show) => {
    setShowLogin(show);
  };

  const handleLoginSuccess = (userName) => {
    setLoggedInUser(userName);
    setShowLogin(false);
  };

  const location = useLocation();
  const isChairPage = location.pathname.startsWith('/desk-chair') ||
                      location.pathname.startsWith('/park-chair') ||
                      location.pathname.startsWith('/room-chair') ||
                      location.pathname.startsWith('/wooden-chair')||
                      location.pathname.startsWith('/basket')||
                      location.pathname.startsWith('/like')

  return (
    <div>
      <LanguageProvider>
        <Loading />
        <Navbar
              setShowLogin={handleShowLogin}
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
              basketCount={basketCount}
              like={like}
            />
        {!isChairPage && (
            <> 
            <Banner />

            <FeaturedProducts updateBasketCount={setBasketCount} updateLikeCount={setLikeCount} loggedInUser={loggedInUser} />
          
          </>
        )}
        {showLogin ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <Routes>
              <Route path="/" element={<TopCategories />} >
              <Route path="/category/1" element={<DeskChairs updateBasketCount={setBasketCount} updateLikeCount={setLikeCount} loggedInUser={loggedInUser} />} />
              <Route path="/category/2" element={<WoodenChairs updateBasketCount={setBasketCount} updateLikeCount={setLikeCount} loggedInUser={loggedInUser}  />} />
              <Route path="/category/3" element={<DeskChairs updateBasketCount={setBasketCount} updateLikeCount={setLikeCount} loggedInUser={loggedInUser}  />} />
              <Route path="/category/4" element={<ParkChairs updateBasketCount={setBasketCount} updateLikeCount={setLikeCount} loggedInUser={loggedInUser}  />} />
              <Route path="/category/5" element={<RoomChairs updateBasketCount={setBasketCount} updateLikeCount={setLikeCount} loggedInUser={loggedInUser}  />} />
              </Route>
              <Route path="/basket" element={<Basket />} />
              
              <Route path="/desk-chair" element={<DeskChairPage updateBasketCount={setBasketCount} updateLikeCount={setLikeCount} loggedInUser={loggedInUser}  />} />
              <Route path="/park-chair" element={<ParkChairPage updateBasketCount={setBasketCount} updateLikeCount={setLikeCount} loggedInUser={loggedInUser} />} />
              <Route path="/room-chair" element={<RoomChairPage updateBasketCount={setBasketCount} updateLikeCount={setLikeCount} loggedInUser={loggedInUser} />} />
              <Route path="/wooden-chair" element={<WoodenChairPage updateBasketCount={setBasketCount} updateLikeCount={setLikeCount} loggedInUser={loggedInUser} />} />
              <Route path="/like" element={<Like />} />
            </Routes>
            {!isChairPage && (
              <>
                <Testimonials loggedInUser={loggedInUser} />
             
              </>

            )}
              <Footer />
                <EndFooter />
                <Hamkorlar />
          </>
        )}
      </LanguageProvider>
    </div>
  );
};

export default Root;