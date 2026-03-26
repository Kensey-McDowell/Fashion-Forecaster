import React,  {useState} from 'react';
import "./marketResearch.css";

function MarketResearch() {
  const reports = [
    {
      title: "Weekly Trend Summary",
      content: "A weekly overview of the latest fashion trends and consumer insights.",
      source: "Inspired by Business of Fashion & McKinsey State of Fashion"
    },
    {
      title: "Consumer Behavior Insights",
      content: "An analysis of how consumer behavior is evolving in the fashion industry.",
      source: ""
    },
    {
      title: "Retail Forecasts",
      content: "Predictions for retail performance and emerging market opportunities.",
      source: ""
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(null);
  return(
    <div className="market-research-container">
      <h1>Market Research</h1>

      <section className="section">
        <h2>Zeitgeist</h2>
        <div className="zeitgeist-grid">
          <div className="zeitgeist-card">
            <span role="img" aria-label="leaf">🍃</span>
            <h3>Sustainability</h3>
            <p>Consumers are increasingly prioritizing eco-friendly products and brands.</p>
          </div>

          <div className="zeitgeist-card">
            <span role="img" aria-label="digital">📱</span>
            <h3>Digital Culture</h3>
            <p>Social media and online communities are shaping consumer preferences and trends.</p>
          </div>

          <div className="zeitgeist-card">
            <span role="img" aria-label="streetwear">🧢</span>
            <h3>Streetwear Influence</h3>
            <p>Streetwear continues to dominate fashion, blending casual and high-end styles.</p>
          </div>

          <div className="zeitgeist-card">
            <span role="img" aria-label="minimalism">🎨</span>
            <h3>Minimalism</h3>
            <p>Consumers are gravitating towards simple, timeless designs and quality over quantity.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Street Style Monitoring</h2>
        <div className="city-grid">
          {["New York", "Los Angeles", "London", "Milan", "Paris", "Tokyo", "Seoul"].map((city, index) => (
            <div className= "city-card" key={index}>
              <h3>{city}</h3>
              <p>Emerging street style trends in {city}.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Consumer Trend Reports</h2>
        {reports.map((report, index) => (
          <div className="report-card" key={index} onClick={() => setActiveIndex(index === activeIndex ? null : index)}>    
            <h3>{report.title}</h3>
            {activeIndex === index && (
              <>
              <p>{report.content}</p>
              {report.source && <p className='report-source'>{report.source}</p>}
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default MarketResearch;