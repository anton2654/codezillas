import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Categories from "../../components/categories/Categories.jsx";
import SkeletonDishCard from "../../components/dishCard/SkeletonDishCard.jsx";
import ProductCard from "../../components/productCard/ProductCard.jsx";

import "../dishes/dishes.css";

const Fridge = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productCategories, setProductCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(productCategories[0]);
  const [visibleCount, setVisibleCount] = useState(10);

  const componentInited = useRef(false);

  const getProductCategories = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/ingredient/categories/")
      .then((response) => {
        setProductCategories(response.data.categories);
        productCategories.unshift("Все");

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProducts = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/ingredient/all/")
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
      getProductCategories();
      getProducts();
    }
  }, []);

  const filteredProducts =
    activeCategory === "Все"
      ? items
      : items.filter((product) => product.category === activeCategory);

  const skeletons = [...new Array(8)].map((_, index) => (
    <SkeletonDishCard key={index} />
  ));

  return (
    <div>
      <Header />
      <div className="dishes-wrapper">
        <Categories
          categories={productCategories}
          activeCategory={activeCategory}
          onCategoryClick={setActiveCategory}
        />

        <div className="product-list">
          {/* {isLoading
            ? skeletons
            : items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))} */}

          {isLoading
            ? skeletons
            : filteredProducts
                .slice(0, visibleCount)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Fridge;
