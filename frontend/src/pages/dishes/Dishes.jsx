import { useRef, useEffect, useState } from "react";
import { categoriesDishes, productsData } from "./data";
import axios from "axios";

import "./dishes.css";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import DishCard from "../../components/dishCard/DishCard.jsx";
import SkeletonDishCard from "../../components/dishCard/SkeletonDishCard.jsx";
import Categories from "../../components/categories/Categories.jsx";

const Dishes = () => {
  const [activeCategory, setActiveCategory] = useState(categoriesDishes[0]);
  const [visibleCount, setVisibleCount] = useState(10);

  const componentInited = useRef(false);

  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const getDishes = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/meal/all/")
      .then((response) => {
        setItems(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    if (!componentInited.current) {
      componentInited.current = true;
      getDishes();
    }
  }, []);

  const filteredDishes =
    activeCategory === "Все"
      ? items
      : items.filter((product) => product.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(10);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const skeletons = [...new Array(8)].map((_, index) => (
    <SkeletonDishCard key={index} />
  ));

  return (
    <div className="container">
      <Header />
      <div className="dishes-wrapper">
        <Categories
          categories={categoriesDishes}
          activeCategory={activeCategory}
          onCategoryClick={setActiveCategory}
        />
        <div className="product-list">
          {isLoading
            ? skeletons
            : filteredDishes
                .slice(0, visibleCount)
                .map((product) => <DishCard key={product.id} dish={product} />)}
        </div>
        {visibleCount < filteredDishes.length && (
          <div className="button-container">
            <button className="more-button" onClick={handleShowMore}>
              Більше
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dishes;
