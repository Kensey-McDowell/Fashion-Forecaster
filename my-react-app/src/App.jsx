<<<<<<< HEAD
import React, { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
=======
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
>>>>>>> origin/jennifer_branch

// Pages
import IntroPage from "./pages/intro.jsx";
import AboutPage from "./pages/about.jsx";
import CollagePage from "./pages/collageCreator.jsx";
import ColorPage from "./pages/colorForecasting.jsx";
import MarketPage from "./pages/marketResearch.jsx";
import StreetStylePage from "./pages/streetStyle.jsx";
import TrendPage from "./pages/trendForecasting.jsx";
import FashionPage from "./pages/fashionWeek.jsx";
import TestPage from "./pages/test.jsx"; 
<<<<<<< HEAD
import SignPage from "./pages/signIn.jsx";
import UserProfile from "./pages/userProfile.jsx"; 
=======
>>>>>>> origin/jennifer_branch

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
<<<<<<< HEAD
    // Initialize state by checking localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    // Logic to log in 
    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    // Logic to log out 
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* Pass isLoggedIn to Navbar to swap the "Sign In" button */}
                <Navbar isLoggedIn={isLoggedIn} />
                
                <Routes>
                    <Route path="/" element={<TestPage />} />
=======
  return (
    <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
                <Routes>
                    <Route path="/" element={<TestPage />} />
                    
>>>>>>> origin/jennifer_branch
                    <Route path="/intro" element={<IntroPage />} />
                    <Route path="/about" element={<AboutPage />} /> 
                    <Route path="/trend" element={<TrendPage />} />  
                    <Route path="/color" element={<ColorPage />} /> 
                    <Route path="/collage" element={<CollagePage />} />
                    <Route path="/market" element={<MarketPage />} />
<<<<<<< HEAD
                    <Route path="/fashionWeek" element={<FashionPage />} /> 
                    <Route path="/street" element={<StreetStylePage />} />
                    
                    {/* If logged in, redirect away from sign-in page to profile */}
                    <Route 
                        path="/signin" 
                        element={!isLoggedIn ? <SignPage onLoginSuccess={handleLogin} /> : <Navigate to="/profile" />} 
                    />
                    
                    {/* If logged out, redirect profile access to sign-in */}
                    <Route 
                        path="/profile" 
                        element={isLoggedIn ? <UserProfile onLogout={handleLogout} /> : <Navigate to="/signin" />} 
                    />
                    
                    <Route path="*" element={<TestPage />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
=======
                    <Route path="/fashion" element={<FashionPage />} /> 
                    <Route path="/street" element={<StreetStylePage />} />
                    
                    <Route path="*" element={<TestPage />} />
                </Routes>
            <Footer />
        </div>
    </BrowserRouter>
  );
>>>>>>> origin/jennifer_branch
}

export default App;