import { useRef, useEffect, useState } from "react";
// import { categoriesDishes } from "./data";
import axios from "axios";

import "../dishes/dishes.css";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import DishCard from "../../components/dishCard/DishCard.jsx";
import SkeletonDishCard from "../../components/dishCard/SkeletonDishCard.jsx";
import Categories from "../../components/categories/Categories.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";

const Generator = () => {
  //   const [dishesCategories, setDishCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [ingredientAvailableMeals, setIngredientAvailableMeals] = useState([]);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const componentInited = useRef(false);

  const getDishes = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/user/1/generator/")
      .then((response) => {
        setAvailableMeals(response.data["available meals"]);
        setIngredientAvailableMeals(
          response.data["ingredient available meals"]
        );
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   const getDishesCategories = async () => {
  //     await axios
  //       .get("http://127.0.0.1:8000/api/meal/categories/")
  //       .then((response) => {
  //         setDishCategory(["Все", ...response.data.categories]);
  //         console.log(response.data.categories);
  //         setIsLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  useEffect(() => {
    setIsLoading(true);

    if (!componentInited.current) {
      componentInited.current = true;
      //   getDishesCategories();
      getDishes();
    }
  }, []);

  const filteredDishes =
    activeCategory === "Все"
      ? ingredientAvailableMeals
      : ingredientAvailableMeals.filter(
          (product) => product.category === activeCategory
        );

//   const indexOfLastDish = currentPage * itemsPerPage;
//   const indexOfFirstDish = indexOfLastDish - itemsPerPage;
  //   const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // При зміні категорії повертаємося на першу сторінку
  };

  const skeletons = [...new Array(8)].map((_, index) => (
    <SkeletonDishCard key={index} />
  ));

  return (
    <div className="container">
      <Header />
      <div className="dishes-wrapper">
        {/* <Categories
          categories={dishesCategories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryChange}
        /> */}
        <h2>Available meals</h2>

        <div className="product-list">
          {isLoading
            ? skeletons
            : ingredientAvailableMeals.map((product) => (
                <DishCard key={product.id} dish={product} />
              ))}
        </div>

        <h2>Ingredient available meals</h2>

        <div className="product-list">
          {isLoading
            ? skeletons
            : ingredientAvailableMeals.map((product) => (
                <DishCard key={product.id} dish={product} />
              ))}
        </div>
        {filteredDishes.length > itemsPerPage && (
          <div className="button-container">
            <Pagination
              onChangePage={(number) => setCurrentPage(number)}
              pageCount={Math.ceil(filteredDishes.length / itemsPerPage)}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Generator;
