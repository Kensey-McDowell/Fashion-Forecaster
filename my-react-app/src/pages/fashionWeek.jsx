import React from "react";
import { useState } from "react";
import "./fashionWeek.css";


// Chronological order: Season, City, Categories, Collection
const SEASONS = [
  { id: "fw2026", label: "Fall/Winter 2026" },
  { id: "ss2026", label: "Spring/Summer 2026" },
  { id: "fw2025", label: "Fall/Winter 2025" },
  { id: "ss2025", label: "Spring/Summer 2025" },
];

const CITIES = ["New York", "London", "Milan", "Paris"];

const MAIN_CATEGORIES = [
  { id: "couture",   label: "Haute Couture" },
  { id: "rtw",       label: "Ready-to-Wear" },
  { id: "resort",    label: "Resort (Cruise)" },
];

const SUB_CATEGORIES = [
  { id: "women", label: "Women's" },
  { id: "men",   label: "Men's" },
  { id: "kids",  label: "Children's" },
];

// Collections keyed by season → city → mainCat → subCat
const COLLECTIONS = {
  fw2026: {
    "New York": {
      couture:  { women: ["Ivory Sculptural Gown","Draped Column Dress","Embellished Cape Look"], men: ["Tailored Black Tuxedo","Velvet Dinner Jacket","Structured Overcoat"], kids: ["Mini Cape Dress","Velvet Bow Suit","Layered Tulle Skirt"] },
      rtw:      { women: ["Oversized Wool Coat","Asymmetric Blazer Set","Knit Column Dress"], men: ["Double-Breasted Suit","Wide-Leg Trousers Set","Leather Blouson Look"], kids: ["Mini Trench Coat","Varsity Knit Set","Relaxed Denim Duo"] },
      resort:   { women: ["Linen Wrap Dress","Printed Silk Set","Crochet Cover-Up"], men: ["Linen Drawstring Suit","Resort Print Shirt Set","Relaxed Shorts Look"], kids: ["Printed Swimwear Set","Linen Play Suit","Sundress & Hat Set"] },
    },
    "London": {
      couture:  { women: ["Corseted Ball Gown","Feather-Trim Coat Dress","Architectural Mini"], men: ["Hand-Tailored Morning Coat","Brocade Evening Suit","Draped Wool Coat"], kids: ["Smocked Party Dress","Miniature Blazer Set","Tartan Pinafore Look"] },
      rtw:      { women: ["Plaid Maxi Coat","Leather Trench Set","Chunky Knit Duo"], men: ["Heritage Check Suit","Waxed Cotton Jacket Look","Rollneck & Trouser Set"], kids: ["Tartan Coat Set","Ribbed Knit Duo","Mini Puffer Look"] },
      resort:   { women: ["Floral Midi Dress","Liberty Print Blouse Set","Broderie Anglaise Look"], men: ["Seersucker Suit","Floral Shirt & Short Set","Canvas Blouson Look"], kids: ["Floral Smock Dress","Striped Shirt Set","Cotton Pinafore Look"] },
    },
    "Milan": {
      couture:  { women: ["Draped Silk Toga Gown","Crystal-Embellished Sheath","Sculptural Shoulder Dress"], men: ["Embroidered Evening Suit","Silk Jacquard Tuxedo","Pleated Formal Look"], kids: ["Tulle Party Frock","Embroidered Velvet Suit","Organza Bow Dress"] },
      rtw:      { women: ["Belted Leather Coat","Knit Midi Dress","Wide-Leg Trouser Set"], men: ["Slim Italian Suit","Knit Polo & Trouser Set","Leather Blouson Look"], kids: ["Mini Leather Jacket Set","Knit Dress & Tights","Velvet Blazer Look"] },
      resort:   { women: ["Strappy Silk Dress","Printed Linen Set","Lightweight Trench Look"], men: ["Linen Blazer & Short Set","Printed Camp Shirt Look","Drawstring Trouser Set"], kids: ["Sundress & Sandal Set","Linen Romper Look","Printed Shirt & Short Set"] },
    },
    "Paris": {
      couture:  { women: ["Hand-Sewn Lace Gown","Bias-Cut Satin Column","Feathered Evening Cape"], men: ["Bespoke Double-Breasted Coat","Embroidered Tailcoat","Draped Wool Suit"], kids: ["Lace-Trimmed Pinafore","Silk Bow Dress","Velvet Romper Set"] },
      rtw:      { women: ["Trench Coat & Cigarette Set","Left-Bank Knit Duo","Silk Blouse & Wide Trouser"], men: ["Chalk-Stripe Suit","Relaxed Blazer & Jean Set","Turtleneck & Trouser Look"], kids: ["Mini Trench & Beret Set","Knit Dress & Legging","Striped Marinière Set"] },
      resort:   { women: ["Riviera Wrap Dress","Printed Silk Blouse Set","Espadrille & Linen Look"], men: ["Seersucker Blazer Set","Riviera Polo & Short","Linen Shirt & Trouser Set"], kids: ["Breton Stripe Dress","Cotton Smock Set","Printed Bloomer Look"] },
    },
  },
  ss2026: {
    "New York": {
      couture:  { women: ["Sheer Organza Gown","Floral Appliqué Column","Silk Bias Evening Dress"], men: ["White Linen Tailcoat","Embroidered Formal Suit","Draped Dinner Jacket"], kids: ["Organza Flower Dress","Linen Bow Suit","Pastel Tulle Frock"] },
      rtw:      { women: ["Linen Blazer Dress","Printed Wrap Set","Cotton Poplin Duo"], men: ["Seersucker Suit","Relaxed Chino Set","Printed Linen Look"], kids: ["Gingham Dress Set","Cotton Romper Look","Striped Shirt & Short"] },
      resort:   { women: ["Broderie Sundress","Floral Bikini Set","Linen Caftan Look"], men: ["Terry Polo & Short","Resort Print Set","Canvas Bucket Look"], kids: ["Ruffle Swimsuit Set","Cotton Sunhat Look","Printed Beach Romper"] },
    },
    "London": {
      couture:  { women: ["Ruffled Chiffon Gown","Beaded Column Dress","Floral Print Coat Dress"], men: ["Floral Brocade Suit","Ivory Tailcoat Look","Embroidered Blazer Set"], kids: ["Smocked Floral Dress","Embroidered Shorts Set","Liberty Print Romper"] },
      rtw:      { women: ["Floral Midi Skirt Set","Linen Trench Look","Crochet Knit Duo"], men: ["Linen Suit","Floral Camp Shirt Set","Cotton Blouson Look"], kids: ["Floral Pinafore Set","Linen Short Set","Stripe Polo & Trouser"] },
      resort:   { women: ["Printed Maxi Dress","Stripe Shirt & Short Set","Terry Towelling Look"], men: ["Canvas Short Set","Printed Resort Shirt","Drawstring Trouser Set"], kids: ["Stripe Swimwear Set","Linen Sundress Look","Terry Short Set"] },
    },
    "Milan": {
      couture:  { women: ["Crystal Mesh Gown","Draped Silk Column","Sculptural Floral Dress"], men: ["Crystal Embroidered Suit","Silk Tuxedo Look","Pleated Evening Jacket"], kids: ["Crystal Tulle Frock","Silk Bow Suit","Floral Romper Set"] },
      rtw:      { women: ["Linen Slip Dress","Wide-Leg Trouser Set","Draped Jersey Look"], men: ["Unstructured Linen Suit","Knit Polo Set","Relaxed Drawstring Look"], kids: ["Linen Shorts Set","Jersey Dress Look","Cotton Knit Duo"] },
      resort:   { women: ["Printed Silk Kaftan","Linen Beach Set","Macramé Cover-Up Look"], men: ["Linen Drawstring Set","Printed Short Set","Woven Bucket Look"], kids: ["Printed Romper Set","Linen Shorts Look","Woven Hat & Dress Set"] },
    },
    "Paris": {
      couture:  { women: ["Bias-Cut Silk Gown","Organza Volume Dress","Beaded Chiffon Column"], men: ["Ivory Bespoke Suit","Beaded Evening Jacket","Draped Tailcoat Look"], kids: ["Organza Bow Dress","Silk Romper Set","Pastel Lace Frock"] },
      rtw:      { women: ["Broderie Anglaise Dress","Silk Blouse & Skirt Set","Linen Trench Look"], men: ["Cotton Twill Suit","Linen Shirt & Trouser Set","Polo & Chino Look"], kids: ["Broderie Sundress","Cotton Stripe Set","Poplin Shirt Look"] },
      resort:   { women: ["Silk Pareo Set","Printed Swim Dress","Terry Robe Look"], men: ["Riviera Print Set","Linen Short & Shirt","Canvas Espadrille Look"], kids: ["Stripe Swimwear Set","Cotton Sundress Look","Printed Terry Set"] },
    },
  },
  fw2025: {
    "New York": {
      couture:  { women: ["Velvet Ballgown","Beaded Strapless Column","Feathered Hem Dress"], men: ["Velvet Dinner Suit","Embroidered Black Coat","Silk Lapel Tuxedo"], kids: ["Velvet Bow Dress","Mini Tuxedo Set","Feather-Trim Frock"] },
      rtw:      { women: ["Camel Wrap Coat","Leather Midi Skirt Set","Cashmere Knit Duo"], men: ["Plaid Overcoat Look","Cashmere Turtleneck Set","Tailored Trouser Look"], kids: ["Mini Puffer Set","Knit Dress Look","Camel Coat & Beret"] },
      resort:   { women: ["Floral Maxi Wrap","Silk Blouse & Short Set","Broderie Trim Look"], men: ["Linen Blouson Set","Resort Print Shirt Look","Canvas Short Set"], kids: ["Floral Romper Set","Linen Short Look","Stripe Shirt & Short"] },
    },
    "London": {
      couture:  { women: ["Dramatic Puff-Sleeve Gown","Brocade Fitted Dress","Velvet Opera Coat"], men: ["Velvet Frock Coat","Brocade Blazer Look","Silk Evening Suit"], kids: ["Velvet Pinafore Dress","Brocade Blazer Set","Mini Opera Coat Look"] },
      rtw:      { women: ["Check Maxi Coat","Leather Blazer Set","Ribbed Knit Duo"], men: ["Heritage Tweed Suit","Waxed Jacket Set","Wool Roll-Neck Look"], kids: ["Check Coat Set","Knit Dress Look","Cord Blazer & Trouser"] },
      resort:   { women: ["Floral Print Dress","Broderie Trim Set","Cotton Wrap Look"], men: ["Floral Shirt Set","Canvas Blouson Look","Drawstring Trouser Set"], kids: ["Floral Pinafore Look","Cotton Short Set","Stripe Dress Look"] },
    },
    "Milan": {
      couture:  { women: ["Draped Satin Gown","Beaded Tulle Column","Sequin Sheath Dress"], men: ["Sequin Evening Suit","Beaded Lapel Jacket","Satin Dinner Coat"], kids: ["Sequin Party Dress","Beaded Bow Set","Satin Romper Look"] },
      rtw:      { women: ["Belted Trench Coat","Plissé Midi Dress","Wide-Leg Knit Set"], men: ["Belted Trench Look","Pleated Trouser Set","Knit Polo Duo"], kids: ["Mini Trench Set","Pleated Skirt Look","Knit Cardigan Set"] },
      resort:   { women: ["Linen Wrap Dress","Printed Silk Set","Macramé Beach Look"], men: ["Linen Short Set","Camp Shirt Look","Canvas Bucket Set"], kids: ["Linen Romper Set","Print Dress Look","Cotton Short Set"] },
    },
    "Paris": {
      couture:  { women: ["Sculpted Ivory Gown","Layered Tulle Dress","Black Lace Column"], men: ["White Bespoke Tailcoat","Lace-Trim Evening Suit","Pleated Velvet Coat"], kids: ["Ivory Tulle Frock","Lace Bow Dress","Black Velvet Suit"] },
      rtw:      { women: ["Wool Wrap Coat","Silk Blouse & Trouser","Leather Biker Set"], men: ["Wool Overcoat Look","Turtle-Neck & Suit","Relaxed Blazer Set"], kids: ["Wool Coat & Beret","Knit Dress & Tights","Striped Shirt Set"] },
      resort:   { women: ["Riviera Wrap Dress","Printed Pareo Set","Linen Shirt Look"], men: ["Seersucker Short Set","Riviera Print Shirt","Canvas Espadrille Set"], kids: ["Breton Stripe Dress","Linen Play Set","Cotton Smock Look"] },
    },
  },
  ss2025: {
    "New York": {
      couture:  { women: ["Chiffon Flutter Gown","Silk Bandeau Column","Floral Appliqué Dress"], men: ["Floral Dinner Jacket","Silk Evening Suit","White Tailcoat Look"], kids: ["Chiffon Bow Dress","Floral Suit Set","Silk Romper Look"] },
      rtw:      { women: ["Cotton Poplin Coat","Printed Wrap Dress","Knit Co-Ord Set"], men: ["Cotton Twill Suit","Printed Shirt Set","Relaxed Chino Look"], kids: ["Gingham Coat Set","Printed Dress Look","Stripe Knit Duo"] },
      resort:   { women: ["Stripe Maxi Dress","Terry Beach Set","Printed Coverup Look"], men: ["Stripe Short Set","Terry Polo Look","Canvas Hat Set"], kids: ["Stripe Swimwear Set","Terry Dress Look","Printed Romper Set"] },
    },
    "London": {
      couture:  { women: ["Lace Corset Gown","Organza Ruffled Dress","Floral Embroidered Cape"], men: ["Floral Brocade Tailcoat","Embroidered Ivory Suit","Ruffled Dinner Jacket"], kids: ["Organza Party Frock","Embroidered Suit Set","Floral Romper Look"] },
      rtw:      { women: ["Trench & Wide-Leg Set","Floral Print Blouse Set","Linen Blazer Dress"], men: ["Linen Suit Look","Floral Shirt & Trouser","Relaxed Chino Set"], kids: ["Trench Coat Set","Floral Dress Look","Linen Shorts Set"] },
      resort:   { women: ["Liberty Print Dress","Broderie Swim Set","Floral Coverup Look"], men: ["Liberty Shirt Set","Canvas Short Look","Drawstring Trouser Set"], kids: ["Floral Swimwear Set","Cotton Sun Dress","Stripe Shirt Set"] },
    },
    "Milan": {
      couture:  { women: ["Draped Silk Toga","Crystal Column Dress","Sculptural Petal Gown"], men: ["Crystal Tuxedo Suit","Draped Evening Coat","Silk Lapel Jacket"], kids: ["Crystal Tulle Dress","Silk Bow Suit","Petal Romper Set"] },
      rtw:      { women: ["Linen Column Dress","Wide-Leg Trouser Set","Draped Jersey Duo"], men: ["Unstructured Suit","Knit Polo & Trouser","Drawstring Linen Set"], kids: ["Linen Dress Set","Cotton Trouser Look","Jersey Knit Duo"] },
      resort:   { women: ["Printed Kaftan Dress","Linen Beach Set","Woven Coverup Look"], men: ["Woven Short Set","Linen Shirt Look","Canvas Bucket Set"], kids: ["Woven Romper Set","Linen Play Look","Printed Dress Set"] },
    },
    "Paris": {
      couture:  { women: ["Ivory Bias Column","Silk Floral Gown","Beaded Chiffon Dress"], men: ["Ivory Bespoke Coat","Beaded Evening Suit","Silk Dinner Jacket"], kids: ["Ivory Tulle Frock","Beaded Bow Dress","Silk Romper Set"] },
      rtw:      { women: ["Broderie Dress","Blouse & Wide-Leg Set","Trench Coat Look"], men: ["Linen Blazer Set","Poplin Shirt & Chino","Cotton Roll-Neck Look"], kids: ["Broderie Dress Set","Linen Short Look","Stripe Shirt Set"] },
      resort:   { women: ["Riviera Print Dress","Silk Pareo Set","Terry Robe Look"], men: ["Riviera Short Set","Linen Shirt Look","Canvas Espadrille Set"], kids: ["Stripe Swimwear Set","Sundress & Hat Look","Terry Romper Set"] },
    },
  },
};

const DESIGNERS_FEATURED = [
  { initial: "B",  name: "Balenciaga",     link: "https://www.balenciaga.com/en-us/fall-24" },
  { initial: "C",  name: "Chanel",         link: "https://www.chanel.com" },
  { initial: "D",  name: "Dior",           link: "https://www.dior.com" },
  { initial: "LV", name: "Louis Vuitton",  link: "https://www.louisvuitton.com" },
];

const DESIGNERS_MORE =[
  { initial: "G",   name: "Gucci",             link: "https://www.gucci.com" },
  { initial: "P",   name: "Prada",             link: "https://www.prada.com" },
  { initial: "V",   name: "Valentino",         link: "https://www.valentino.com" },
  { initial: "YSL", name: "Saint Laurent",     link: "https://www.ysl.com" },
  { initial: "GV",  name: "Givenchy",          link: "https://www.givenchy.com" },
  { initial: "BV",  name: "Bottega Veneta",    link: "https://www.bottegaveneta.com" },
  { initial: "F",   name: "Fendi",             link: "https://www.fendi.com" },
  { initial: "VW",  name: "Vivienne Westwood", link: "https://www.viviennewestwood.com" },
];


//WELCOME section
function Welcome() {
  const [season,  setSeason]  = useState(SEASONS[0].id);
  const [city,    setCity]    = useState(CITIES[0]);
  const [mainCat, setMainCat] = useState(MAIN_CATEGORIES[0].id);
  const [subCat,  setSubCat]  = useState(SUB_CATEGORIES[0].id);

  const looks = COLLECTIONS[season]?.[city]?.[mainCat]?.[subCat] || [];
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


      {looks.length > 0 ? (
        <div className="collection_grid">
          {looks.map((look, i) => (
            <div
              key={`${season}-${city}-${mainCat}-${subCat}-${i}`} className="grid"
            >
              <div className="grid_num">0{i + 1}</div>
              <div className="grid_trend">{look}</div>
            </div>
          ))}
        </div>
      ) : null}
    </header>
  );
}


// Page component
export default function FashionPage(){
  return (
    <div>
      <Welcome />
      <Designers />
    </div>
  );
}