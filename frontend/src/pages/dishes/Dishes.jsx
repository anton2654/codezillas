import { useRef, useEffect, useState } from "react";
import { categoriesDishes, productsData } from "./data";
import axios from "axios";

import "./dishes.css";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import SkeletonProductCard from "../../components/productCard/SkeletonProductCard.jsx";
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
        console.log(response.data)
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

  const filteredProducts =
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

  const skeletons = [...new Array(6)].map((_, index) => (
    <SkeletonProductCard key={index} />
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
          {/* <SkeletonProductCard /> */}
          {isLoading
            ? skeletons
            : filteredProducts
                .slice(0, visibleCount)
                .map((product) => (
                  <ProductCard key={product.id} dish={product} />
                ))}
        </div>
        {visibleCount < filteredProducts.length && (
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
