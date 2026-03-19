import React from "react";
import { useState } from "react";
import "./fashionWeek.css";

// ── DATA ─────────────────────────────────────────────────────────────────────

const SEASONS = [
  { id: "fall2026",   label: "Fall 2026" },
  { id: "spring2026", label: "Spring 2026" },
  { id: "fall2025",   label: "Fall 2025" },
  { id: "spring2025", label: "Spring 2025" },
  { id: "fall2024",   label: "Fall 2024" },
  { id: "spring2024", label: "Spring 2024" },
];

const CITIES = ["New York", "London", "Milan", "Paris"];

const CITY_INFO = {
  "New York": "Known for modern American sportswear and commercial-ready fashion.",
  "London":   "Famous for experimental design and emerging talent.",
  "Milan":    "Home of Italian luxury craftsmanship and tailoring.",
  "Paris":    "The center of haute couture and historic fashion houses.",
};

const MAIN_CATEGORIES = [
  { id: "rtw",     label: "Ready-to-Wear" },
  { id: "couture", label: "Haute Couture" },
  { id: "resort",  label: "Resort (Cruise)" },
];

const SUB_CATEGORIES = [
  { id: "women", label: "Women's" },
  { id: "men",   label: "Men's" },
  { id: "kids",  label: "Children's" },
];



// ── CITY-SPECIFIC DESIGNERS ───────────────────────────────────────────────────

const CITY_DESIGNERS = {
  "New York": {
    featured: [
      { initial: "A",
        name: "Area",
        link: "",
        categories:{ "fall2026":["rtw"], "spring2026": ["rtw"], "fall2024":["rtw", "couture"], "spring2024": ["rtw", "resort"], },      
        seasons: ["fall2026", "spring2026", "fall2024", "spring2024"],
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2024": ["women"], "spring2024": ["women"]} 
      },
    
      { initial: "C",
        name: "Coach",
        link: "",
        categories: {"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw","resort"], "spring2025": ["rtw","resort"], "fall2024":["rtw", "resort"], "spring2024": ["rtw", "resort"], },  
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"] }
      },

      { initial: "MM",
        name: "Maria McManus",
        link: "",
        categories: {"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw","resort"], "spring2025": ["rtw","resort"], "fall2024":["rtw", "resort"], "spring2024": ["rtw", "resort"],},
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]}
      },

      { initial: "MM",
        name: "Marina Moscone",
        link: "",
        categories:  {"fall2026":["rtw"], "spring2026": ["rtw"], "fall2025":["rtw"], "spring2025": ["rtw"], "fall2024":["rtw"], "spring2024": ["rtw"],},
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]}
      },
    ],

    more: [
      { initial: "MK", 
        name: "Michael Kors Collection",
        link: "", 
        categories:  {"fall2026":["rtw"], "spring2026": ["rtw"], "fall2025":["rtw"], "spring2025": ["rtw"], "fall2024":["rtw"], "spring2024": ["rtw"],},                   
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],   
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]} 
      },

      { initial: "RL", 
        name: "Ralph Lauren",           
        link: "",
        categories: {"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw"], "spring2025": ["rtw"], "fall2024":["rtw","resort"], "spring2024": ["rtw","resort"],},        
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],    
        subcategories: {"fall2026": ["women", "men"], "spring2026": ["women", "men"], "fall2025": ["women","men"], "spring2025": ["women","men"], "fall2024": ["women","men"], "spring2024": ["women","men"] } 
      },

      { initial: "TB", 
        name: "Tory Burch",              
        link: "", 
        categories:{"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw","resort"], "spring2025": ["rtw","resort"], "fall2024":["rtw", "resort"], "spring2024": ["rtw", "resort"],},     
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],     
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]} 
      },

      { initial: "UL", 
        name: "Ulla Johnson",              
        link: "", 
        categories:  {"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw","resort"], "spring2025": ["rtw","resort"], "fall2024":["rtw", "resort"], "spring2024": ["rtw", "resort"],},        
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],    
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]} 
      },
    ],
  },

  "London": {
    featured: [
      { initial: "BB", 
        name: "Burberry",            
        link: "", 
        categories: {"fall2026":["rtw"], "spring2026": ["rtw"], "fall2024":["rtw"], },          
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],   
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]} 
      },

      { initial: "EM", 
        name: "Erdem",                
        link: "", 
        categories:{"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw","resort"], "spring2025": ["rtw","resort"], "fall2024":["rtw", "resort"], "spring2024": ["rtw", "resort"],},          
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],    
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]} 
      },

      { initial: "SR", 
        name: "Simone Rocha",         
        link: "",
        categories: {"fall2026":["rtw"], "spring2026": ["rtw"], "fall2025":["rtw"], "spring2025": ["rtw"], "fall2024":["rtw"], "spring2024": ["rtw"],},            
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],    
        subcategories: { "fall2026": ["women"], "spring2026": ["women","men"], "fall2025": ["women","men"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]} 
      },

      { initial: "JW", 
        name: "JW Anderson",         
        link: "",   
        categories:{ "fall2026": ["rtw", "resort"], "spring2025": ["rtw"], "fall2024": ["rtw", "resort"], "spring2024": ["rtw","resort"]},          
        seasons: ["fall2026", "spring2025", "fall2024", "spring2024"],      
        subcategories: {"fall2026": ["women"], "spring2025": ["women","men"], "fall2024": ["women","men"], "spring2024": ["men"]}},
      ],

      more: [
      { initial: "R",
        name: "Roksanda",               
        link: "", 
        categories: {"fall2026":["rtw"], "spring2026": ["rtw"], "fall2025":["rtw"], "spring2025": ["rtw"], "fall2024":["rtw"], "spring2024": ["rtw"],},                      
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],  
        subcategories:  {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]} 
      },
      
      { initial: "VK", 
        name: "Victoria Beckham",              
        link: "", 
        categories:{"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw","resort"], "spring2025": ["rtw","resort"], "fall2024":["rtw", "resort"], "spring2024": ["rtw", "resort"],},             
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"], 
        subcategories:  {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"] } 
      },
    ],
  },




//Begin Milan Collection
  "Milan": {
    featured: [
      { initial: "G",  
        name: "Gucci",                    
        link: "", 
        categories:{"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw","resort"], "spring2025": ["rtw","resort"], "fall2024":["rtw", "resort"], "spring2024": ["rtw", "resort"],},         
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],                         
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women","men"], "spring2025": ["women","men"], "fall2024": ["women","men"], "spring2024": ["women","men"] } 
      }, 
        
      { initial: "P",  
        name: "Prada",                    
        link: "", 
        categories:  {"fall2026":["rtw"], "spring2026": ["rtw"], "fall2025":["rtw"], "spring2025": ["rtw"], "fall2024":["rtw"], "spring2024": ["rtw"],},           
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],                          
        subcategories: {"fall2026": ["women","men"], "spring2026": ["women","men"], "fall2025": ["women","men"], "spring2025": ["women","men"], "fall2024": ["women","men"], "spring2024": ["women","men"]} 
      },

      { initial: "F",  
        name: "Fendi",                    
        link: "", 
        categories:{"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw"], "spring2025": ["rtw"], "fall2024":["rtw"], "spring2024": ["rtw","couture","resort"],},  
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],                          
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women","men"], "fall2024": ["women","men"], "spring2024": ["women"],}
      },

      { initial: "BV",
        name: "Bottega Veneta",           
        link: "", 
        categories:{"fall2026":["rtw"], "spring2026": ["rtw"], "spring2025": ["rtw","resort"], "fall2024":["rtw"], "spring2024": ["rtw","resort"],},  
        seasons: ["fall2026", "spring2026", "spring2025", "fall2024", "spring2024"],                          
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]}
      },
    ],

    more: [
      { initial: "V",  
        name: "Valentino",                
        link: "", 
        categories:{"fall2026":["rtw","resort"], "spring2026": ["rtw","couture","resort"], "fall2025":["rtw","resort"], "spring2025": ["rtw","couture","resort"], "fall2024":["rtw","resort"], "spring2024": ["rtw","couture","resort"],},  
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],                          
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women","men"], "spring2024": ["women"]}
      },

      { initial: "VS", 
        name: "Versace",                  
        link: "", 
        categories:{ "spring2026": ["rtw"], "fall2025":["rtw"], "spring2025": ["rtw","resort"], "fall2024":["rtw"], "spring2024": ["rtw"],},  
        seasons: [ "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],                          
        subcategories: { "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women","men"], "fall2024": ["women","men"], "spring2024": ["women"]}
      },

      { initial: "MM", 
        name: "Max Mara",                   
        link: "", 
        categories:{"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw","resort"], "spring2025": ["rtw","resort"], "fall2024":["rtw","resort"], "spring2024": ["rtw","resort"],},  
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],                          
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]}
      },

      { initial: "M", 
         name: "Missoni",                  
         link: "", 
         categories:{"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw","resort"], "spring2025": ["rtw","resort"], "fall2024":["rtw","resort"], "spring2024": ["rtw","resort"],}, 
         seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],                          
         subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women","men"], "fall2024": ["women"], "spring2024": ["women","men"]}
       },
    ],
  },




  "Paris": {
    featured: [
      { initial: "C",  
        name: "Chanel",                   
        link: "", 
        categories: {"fall2026":["rtw","resort"], "spring2026": ["rtw","couture","resort"], "fall2025":["couture","rtw","resort"], "spring2025": ["rtw","couture","resort"], "fall2024":["rtw","couture","resort"], "spring2024": ["rtw","couture","resort"],},  
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025","fall2024", "spring2024"],                         
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women","men"], "fall2024": ["women"], "spring2024": ["women","men"]}
      },

      { initial: "LV", 
        name: "Louis Vuitton",           
        link: "", 
        categories:{"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw","resort"], "spring2025": ["rtw","resort"], "fall2024":["rtw","resort"], "spring2024": ["rtw","resort"],},            
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],                       
        subcategories: {"fall2026": ["women","men"], "spring2026": ["women","men"], "fall2025": ["women","men"], "spring2025": ["women","men"], "fall2024": ["women","men"], "spring2024": ["women","men"]}
      },

      { initial: "B",  
        name: "Balenciaga",               
        link: "", 
        categories: {"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw","resort","couture"], "spring2025": ["rtw","resort"], "fall2024":["rtw","resort","couture"], "spring2024": ["rtw","resort"],},           
        seasons:["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],                              
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]}
      },
    ],

    more: [

      { initial: "GV", 
        name: "Givenchy",                 
        link: "", 
        categories: {"fall2026":["rtw"], "spring2026": ["rtw"], "fall2025":["rtw","resort"], "spring2025": ["rtw","resort"], "fall2024":["rtw","resort"], "spring2024": ["rtw","resort"],},            
        seasons:["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],      
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women","men"], "spring2024": ["women","men"]}
      },

      { initial: "YSL", 
        name: "Saint Laurent",                 
        link: "", 
        categories: {"fall2026":["rtw","resort"], "spring2026": ["rtw","resort"], "fall2025":["rtw","resort"], "spring2025": ["rtw","resort"], "fall2024":["rtw","resort"], "spring2024": ["rtw","resort"],},            
        seasons:["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],      
        subcategories: {"fall2026": ["women","men"], "spring2026": ["women"], "fall2025": ["women","men"], "spring2025": ["women","men"], "fall2024": ["women","men"], "spring2024": ["women","men"]}
      },

      { initial: "D", 
        name: "Christian Dior",                   
        link: "", 
        categories: {"fall2026":["rtw","resort"], "spring2026": ["rtw","resort","couture"], "fall2025":["rtw","resort","couture"], "spring2025": ["rtw","resort","couture"], "fall2024":["rtw","resort","couture"], "spring2024": ["rtw","resort","couture"],},            
        seasons: ["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],      
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women"], "fall2024": ["women"], "spring2024": ["women"]}
      },

      { initial: "LW", 
        name: "Loewe",                    
        link: "", 
        categories: {"fall2026":["rtw"], "spring2026": ["rtw"], "fall2025":["rtw"], "spring2025": ["rtw"], "fall2024":["rtw"], "spring2024": ["rtw"],},    
        seasons:["fall2026", "spring2026", "fall2025", "spring2025", "fall2024", "spring2024"],                 
        subcategories: {"fall2026": ["women"], "spring2026": ["women"], "fall2025": ["women"], "spring2025": ["women","men"], "fall2024": ["women","men"], "spring2024": ["women","men"]}
      },
    ],
  },
};

// ── VOGUE URL BUILDER ─────────────────────────────────────────────────────────
// URL patterns:
//   Women's RTW:     /fall-2026-ready-to-wear/brand
//   Women's Couture: /spring-2026-couture/brand
//   Men's (any cat): /fall-2026-menswear/brand
//   Resort:          /resort-2026/brand  (no fall/spring prefix)

const VOGUE_SEASON = {
  fall2026:   "fall-2026",
  spring2026: "spring-2026",
  fall2025:   "fall-2025",
  spring2025: "spring-2025",
  fall2024:   "fall-2024",
  spring2024: "spring-2024",
};

const VOGUE_SLUG = {
  // New York
  "Area":                   "area",
  "Maria McManus":          "maria-mcmanus",
  "Marina Moscone":         "marina-moscone",
  "Coach":                  "coach",
  "Michael Kors Collection":"michael-kors-collection",
  "Ralph Lauren":           "ralph-lauren",
  "Tory Burch":       "tory-burch",
  "Ulla Johnson":            "ulla-johnson",




  // London
  "Burberry":               "burberry",
  "Erdem":                  "erdem",
  "Simone Rocha":      "simone-rocha",


  "Roksanda":       "roksanda",
  "Victoria Beckham":             "victoria-beckham",
  "JW Anderson":            "j-w-anderson",

  "Richard Quinn":          "richard-quinn",
  // Milan
  "Gucci":                  "gucci",
  "Prada":                  "prada",
  "Fendi":                  "fendi",
  "Bottega Veneta":         "bottega-veneta",
  "Valentino":              "valentino",
  "Versace":                "versace",
  "Max Mara":                 "max-mara",
  "Missoni":                "missoni",
  // Paris
  "Chanel":                 "chanel",
  "Dior":                   "christian-dior",
  "Louis Vuitton":          "louis-vuitton",
  "Balenciaga":             "balenciaga",
  "Saint Laurent":          "saint-laurent",
  "Givenchy":               "givenchy",
  "Celine":                 "celine",
  "Loewe":                  "loewe",
};

// Builds the correct Vogue URL based on subCat:
//   men    → /{season}-menswear/{slug}
//   women, couture → /{season}-couture/{slug}
//   women, rtw     → /{season}-ready-to-wear/{slug}
//   resort (any gender) → /resort-{year}/{slug}
function getDesignerLink(name, season, mainCat, subCat, directLink) {
  if (directLink?.trim()) return directLink.trim();

  const slug      = VOGUE_SLUG[name];
  const seasonSeg = VOGUE_SEASON[season];
  if (!slug || !seasonSeg) return "#";

  // Resort: different pattern — just year, no fall/spring
  if (mainCat === "resort") {
    const year = seasonSeg.split("-")[1];
    return `https://www.vogue.com/fashion-shows/resort-${year}/${slug}`;
  }

  // Men's always uses "menswear" regardless of rtw/couture
  if (subCat === "men") {
    return `https://www.vogue.com/fashion-shows/${seasonSeg}-menswear/${slug}`;
  }

  // Women's & kids: use the category segment
  const catSeg = mainCat === "couture" ? "couture" : "ready-to-wear";
  return `https://www.vogue.com/fashion-shows/${seasonSeg}-${catSeg}/${slug}`;
}







// ── COMPONENTS ───────────────────────────────────────────────────────────────

function Welcome({ season, setSeason, city, setCity, mainCat, setMainCat, subCat, setSubCat }) {
  const seasonLabel = SEASONS.find(s => s.id === season)?.label;
  const mainLabel   = MAIN_CATEGORIES.find(c => c.id === mainCat)?.label;
  const subLabel    = SUB_CATEGORIES.find(c => c.id === subCat)?.label;

  return (
    <header className="welcome_header">
      <h1 className="welcome_title">FASHION WEEK</h1>

      <div className="welcome_filters">
        <div className="welcome_filter_word">
          <label className="welcome_filter_label">Season</label>
          <select className="welcome_select_word" value={season} onChange={e => setSeason(e.target.value)}>
            {SEASONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

        <div className="welcome_filter_word">
          <label className="welcome_filter_label">City</label>
          <select className="welcome_select_word" value={city} onChange={e => setCity(e.target.value)}>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="welcome_filter_word">
          <label className="welcome_filter_label">Category</label>
          <select className="welcome_select_word" value={mainCat} onChange={e => setMainCat(e.target.value)}>
            {MAIN_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>

        <div className="welcome_filter_word">
          <label className="welcome_filter_label">Collection</label>
          <select className="welcome_select_word" value={subCat} onChange={e => setSubCat(e.target.value)}>
            {SUB_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
      </div>

      <p className="welcome_selected_word">
        <span>{seasonLabel}</span> -- {city} -- {mainLabel} -- {subLabel}
      </p>
    </header>
  );
}

function DesignerCard({ initial, name, link, season, mainCat, subCat, index = 0 }) {
  const resolvedLink = getDesignerLink(name, season, mainCat, subCat, link);
  return (
    <a
      href={resolvedLink}
      target="_blank"
      rel="noreferrer"
      className="fw-designer-card"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <span className="fw-designer-initial">{initial}</span>
      <p className="fw-designer-name">{name}</p>
    </a>
  );
}

function Designers({ season, city, mainCat, subCat }) {
  const { featured, more } = CITY_DESIGNERS[city];

  const allDesigners = [...featured, ...more].filter(d =>
    d.seasons.includes(season) &&
    (d.categories[season] || []).includes(mainCat) &&
    (d.subcategories[season] || []).includes(subCat)
  );

  const seasonLabel   = SEASONS.find(s => s.id === season)?.label;
  const categoryLabel = MAIN_CATEGORIES.find(c => c.id === mainCat)?.label;
  const subLabel      = SUB_CATEGORIES.find(c => c.id === subCat)?.label;

  const gridKey = `${season}-${city}-${mainCat}-${subCat}`;

  return (
    <section className="fw-designers">
      <div className="fw-section-header">
        <span className="fw-section-label">Presenting</span>
        <h2 className="fw-section-title">Featured Designers</h2>
        <p className="fw-section-sublabel">{CITY_INFO[city]}</p>
      </div>

      {allDesigners.length === 0 ? (
        <p className="fw-no-results" key={gridKey}>
          No {city} brands have a {subLabel} {categoryLabel} collection for {seasonLabel}.
        </p>
      ) : (
        <div key={gridKey} className="fw-designers-grid">
          {allDesigners.map((d, i) => (
            <DesignerCard key={d.name} season={season} mainCat={mainCat} subCat={subCat} index={i} {...d} />
          ))}
        </div>
      )}
    </section>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function FashionPage() {
  const [season,  setSeason]  = useState(SEASONS[0].id);
  const [city,    setCity]    = useState(CITIES[0]);
  const [mainCat, setMainCat] = useState(MAIN_CATEGORIES[0].id);
  const [subCat,  setSubCat]  = useState(SUB_CATEGORIES[0].id);

  return (
    <div>
      <Welcome
        season={season}   setSeason={setSeason}
        city={city}       setCity={setCity}
        mainCat={mainCat} setMainCat={setMainCat}
        subCat={subCat}   setSubCat={setSubCat}
      />
      <Designers season={season} city={city} mainCat={mainCat} subCat={subCat} />
    </div>
  );
}
