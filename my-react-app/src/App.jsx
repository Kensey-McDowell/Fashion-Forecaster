import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import ForecastDemo from "./pages/ForecastDemo.jsx";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
                <Routes>
                    <Route path="/" element={<TestPage />} />
                    
                    <Route path="/intro" element={<IntroPage />} />
                    <Route path="/about" element={<AboutPage />} /> 
                    <Route path="/trend" element={<TrendPage />} />  
                    <Route path="/color" element={<ColorPage />} /> 
                    <Route path="/collage" element={<CollagePage />} />
                    <Route path="/market" element={<MarketPage />} />
                    <Route path="/fashionWeek" element={<FashionPage />} /> 
                    <Route path="/street" element={<StreetStylePage />} />
                    <Route path="/forecast-demo" element={<ForecastDemo />} />
                    
                    <Route path="*" element={<TestPage />} />
                </Routes>
            <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
