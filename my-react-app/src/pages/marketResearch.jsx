import React,  {useState} from 'react';
import "./marketResearch.css";

function MarketResearch() {
  const reports = [
    {
      title: "Weekly Trend Summary",
      content: "A weekly overview of the latest fashion trends and consumer insights.",
      // source: "Inspired by Business of Fashion & McKinsey State of Fashion",
      link: "https://www.vogue.com/fashion/trends"
    },
    {
      title: "Consumer Behavior Insights",
      content: "An analysis of how consumer behavior is evolving in the fashion industry.",
      link: "https://www.vogue.com/business/consumers/consumer-behavior"
    },
    {
      title: "Retail Forecasts",
      content: "Predictions for retail performance and emerging market opportunities.",
      link: "https://www.wgsn.com/en/blog"
    }
  ];
  
  const [activeIndex, setActiveIndex] = useState(null);
  return(
    <div className="market-research-container">
      <h1>Market Research</h1>

      <section className="section">
        <h2>Zeitgeist</h2>
        <div className="zeitgeist-grid">
          {/* <div className="zeitgeist-card">
            <span role="img" aria-label="leaf">🍃</span>
            <h3>Sustainability</h3>
            <p>The zeigeist movement represents a shift towards redefining normalcy and ethical consumption.
              Consumers are increasingly prioritizing eco-friendly products and brands. 
            </p>
          </div> */}

          <div className="zeitgeist-card">
            <span>🍃</span>
            <h3>Sustainability</h3>

            <div className="hidden-text">
              <p>
                The Zeitgeist Movement represents a shift towards redefining normalcy and ethical production.
                Advocates of the movement and consumers are increasingly prioritizing eco-friendly products and brands. 
              </p>
            </div>
          </div>

          {/* <div className="zeitgeist-card">
            <span role="img" aria-label="digital">📱</span>
            <h3>Digital Culture</h3>
            <p>Social media and online communities are shaping consumer preferences and trends.</p>
          </div> */}

          <div className="zeitgeist-card">
            <span>📱</span>
            <h3>Digital Culture</h3>
            
            <div className="hidden-text">
              <p>
                Social media has accelerated the rise of microtrends, contributing to digital fatigue. 
                As a result, younger generations are shifting away from rapid trend cycles and 
                seeking brands that prioritize authenticity and transparency.
              </p>
            </div>
          </div>

          {/* <div className="zeitgeist-card">
            <span role="img" aria-label="streetwear">🧢</span>
            <h3>Streetwear Influence</h3>
            <p>Streetwear continues to dominate fashion, blending casual and high-end styles.</p>
          </div> */}

          <div className="zeitgeist-card">
            <span>🎭</span>
            <h3>Individualism & Identity Expression</h3>

            <div className="hidden-text">
              <p>
                Fashion is increasingly used as a tool for self-expression and identity exploration.
                Consumers are blending styles, cultures, and eras to communicate their personality and values 
                through their clothing.
              </p>
            </div>
          </div>


          {/* <div className="zeitgeist-card">
            <span role="img" aria-label="minimalism">🎨</span>
            <h3>Minimalism</h3>
            <p>Consumers are gravitating towards simple, timeless designs and quality over quantity.</p>
          </div> */}

          <div className="zeitgeist-card">
            <span>🎨</span>
            <h3>Minimalism</h3>

            <div className="hidden-text">
              <p>
                Minimalism reflects a cultural response to digital overload and rapid microtrend cycles.
                It emphasizes timeless, versatile pieces that prioritize quality and sustainability over 
                quantity and fast fashion.
              </p>
            </div>
          </div>

          <div className="zeitgeist-card">
            <span>🕰️</span>
            <h3>Nostalgia and Escapism</h3>

            <div className="hidden-text">
              <p>
                Contemporary fashion is heavily influenced by nostalgia, with consumers seeking comfort 
                and emotional familiarity in styles from past decades. Revivals of Y2K, 90s, and 80s fashion 
                reflect a desire for escapism and connection to simpler times amid ongoing global uncertainties.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="section">
        <h2>Street Style Monitoring</h2>
        <div className="city-grid">
          {[  {name: "New York", link: "https://theimpression.com/street-style/new-york-fashion-week/"},
              {name: "Los Angeles", link: "https://www.whowhatwear.com/tag/los-angeles"},
              {name: "London", link: "https://theimpression.com/street-style/london-fashion-week/"},
              {name: "Milan", link: "https://www.whowhatwear.com/fashion/street-style/milan-street-style-trends"},
              {name: "Paris", link: "https://www.whowhatwear.com/fashion/street-style/paris-street-style-shopping"},
              {name: "Tokyo", link: "https://www.vogue.com/slideshow/the-best-street-style-photos-from-the-fall-2026-shows-in-tokyo"},
              {name: "Seoul", link: "https://www.vogue.com/slideshow/the-best-street-style-photos-from-the-fall-2026-shows-in-seoul"},
          ].map((city, index) => (
            <div className= "city-card" key={index} onClick={() => window.open(city.link, "_blank")}>
              <h3>{city.name}</h3>
              <p>Emerging street style trends in {city.name}.</p>
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

              <button className="visit-btn" 
              onClick={(e) => {
                e.stopPropagation();
                window.open(report.link, "_blank");
              }}>
                View Report
              </button>
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default MarketResearch;