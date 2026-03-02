import React from "react";
import "./fashionWeek.css";


//Welcome Section
function Welcome() {
  return (
    <header className="welcome">
      <div className="welcome_grid-overlay" aria-hidden="true" />

      <h1 className="welcome_title"> FASHION WEEK </h1>

      <p className="welcome_dates"> Fall 2024 </p>

      <p className="welcome_subtitle"> Ready to Wear </p>

      <div className="center_line" />
      
    </header>
  );
}

//Feature Designer Section
const DESIGNERS = [
  { initial: "B", name: "Balenciaga" },
  { initial: "C", name: "Chanel" },
  { initial: "D", name: "Dior" },
  { initial: "LV", name: "Louis Vuitton" },
];

function Designers() {
  return (
    <section id="designers" className="designers">
      <div className="designers_inner">
        <div className="designers_header">
          <p className="designers_label">Presenting</p>
          <h2 className="designers_heading">Featured Designers</h2>
        </div>

        <div className="designers_grid">
          {DESIGNERS.map(({ initial, name }, i) => (
            <div key={name}
              className={`designer-card ${(i + 2) * 100}`}
            >
              <div className="designer-card_image hover-lift">
                <div className="designer-card_initial-wrap">
                  <span className="designer-card_initial">{initial}</span>
                </div>
              </div>
              <p className="designer-card_name">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Page component
export default function FashionPage() {
  return (
    <div>
      <Welcome />
      <Designers />
    </div>
  );
}