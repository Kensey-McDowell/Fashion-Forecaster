import React, { useState, useEffect } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import IntroPage from "./pages/intro.jsx";
import AboutPage from "./pages/about.jsx";
import CollagePage from "./pages/collageCreator.jsx";
import ColorPage from "./pages/features/colorForecasting/colorForecasting.jsx";
import MarketPage from "./pages/marketResearch.jsx";
import StreetStylePage from "./pages/streetStyle.jsx";
import TrendPage from "./pages/trendForecasting.jsx";
import FashionPage from "./pages/fashionWeek.jsx";
import TestPage from "./pages/test.jsx";
import ForecastDemo from "./pages/features/colorForecasting/ForecastDemo.jsx";
import TrendBoards from "./pages/features/colorForecasting/TrendBoards.jsx";
import TrendBoardDetail from "./pages/features/colorForecasting/TrendBoardDetail.jsx";
import SignPage from "./pages/signIn.jsx";
import UserProfile from "./pages/userProfile.jsx";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
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
                    <Route path="/" element={<IntroPage />} />
                    <Route path="/intro" element={<IntroPage />} />
                    <Route path="/about" element={<AboutPage />} /> 
                    <Route path="/trend" element={<TrendPage />} />  
                    <Route path="/color" element={<ColorPage />} />
                    <Route path="/forecast-demo" element={<ForecastDemo />} />
                    <Route path="/trend-boards" element={<TrendBoards />} />
                    <Route path="/boards/:boardId" element={<TrendBoardDetail />} />
                    <Route path="/collage" element={<CollagePage />} />
                    <Route path="/market" element={<MarketPage />} />
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
                    
                    <Route path="*" element={<IntroPage />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
