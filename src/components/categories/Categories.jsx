import React, { useState } from "react";
import "./categories.css";

function Categories({categories}) {
  const categoriesDishes = [
    "Все",
    "Сніданки",
    "Обіди",
    "Вечері",
    "Десерти",
    "Салати",
    "Гарніри",
    "Закуски",
    "Снеки",
  ];

  const [activeCategory, setActiveCategory] = useState(0);
  

  return (
    <div className="tabs">
      {categories.map((categor, i) => (
        <button
          key={categor}
          onClick={() => setActiveCategory(i)}
          className={i === activeCategory ? "tab active" : "tab"}
        >
          {categor}
        </button>
      ))}
    </div>
  );
}

export default Categories;
