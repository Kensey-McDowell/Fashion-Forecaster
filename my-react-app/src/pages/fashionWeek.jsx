import React from "react";
import "./fashionWeek.css";



function Hero() {
  return (
    <header className="hero">
      <div className="hero__grid-overlay" aria-hidden="true" />

      <h1 className="hero__title animate-fade-up delay-100">
        FASHION<br />WEEK
      </h1>

      <p className="hero__dates animate-fade-up delay-200">
        Fall 2024
      </p>

      <p className="hero__subtitle animate-fade-up delay-300">
        Ready to Wear
      </p>
      
      <div className="hero__divider" aria-hidden="true" />
    </header>
  );
}

const DESIGNERS = [
  { initial: "B", name: "Balenciaga" },
  { initial: "C", name: "Chanel" },
  { initial: "D", name: "Dior" },
  { initial: "LV", name: "Louis Vuitton" },
];


function Designers() {
  return (
    <section id="designers" className="designers">
      <div className="designers__inner">
        <div className="designers__header">
          <p className="designers__label animate-fade-up">Presenting</p>
          <h2 className="designers__heading animate-fade-up delay-100">Featured Designers</h2>
        </div>

        <div className="designers__grid">
          {DESIGNERS.map(({ initial, name }, i) => (
            <div
              key={name}
              className={`designer-card animate-scale-in delay-${(i + 2) * 100}`}
            >
              <div className="designer-card__image hover-lift">
                <div className="designer-card__initial-wrap">
                  <span className="designer-card__initial">{initial}</span>
                </div>
              </div>
              <p className="designer-card__name">{name}</p>
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
      <Hero />
      <Designers />
    </div>
  );
}