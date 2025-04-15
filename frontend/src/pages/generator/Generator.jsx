import { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import "../dishes/dishes.css";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import DishCard from "../../components/dishCard/DishCard.jsx";
import SkeletonDishCard from "../../components/dishCard/SkeletonDishCard.jsx";
import Categories from "../../components/categories/Categories.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import ScrollToTop from "../../components/scrollUp/scrollButt.jsx";

import "./generator.css";

const Generator = () => {
  //   const [dishesCategories, setDishCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [ingredientAvailableMeals, setIngredientAvailableMeals] = useState([]);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { user, loading } = useContext(AuthContext);

  const componentInited = useRef(false);

  const getDishes = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/user/${user.id}/generator/`)
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
    if (loading) {
      console.log("Waiting for user to load...");
      return;
    }

    setIsLoading(true);

    if (!componentInited.current) {
      componentInited.current = true;
      //   getDishesCategories();
      getDishes();
    }
  }, [user, loading]);

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
        <div className="section-text">
          <h2>Доступні страви</h2>
          <p>Страви, які Ви можете приготувати вже зараз!</p>
        </div>
        <div className="product-list">
          {isLoading ? (
            skeletons
          ) : availableMeals.length > 0 ? (
            availableMeals.map((product) => (
              <DishCard key={product.id} dish={product} />
            ))
          ) : (
            <div className="generator-error">
              <p className="no-dishes-main">На жаль, зараз немає доступних страв для приготування з наявними продуктами!</p>
              <p className="no-dishes-main">Переконайтесь, що ви наповнили Холодильник!</p>
            </div>
          )}
        </div>

        <div className="section-text">
          <h2>Майже доступні страви</h2>
          <p>Ви б <strong>могли</strong> приготувати ці страви, якби мали достатньо інгредієнтів!</p>
        </div>
        <div className="product-list">
          {isLoading ? (
            skeletons
          ) : ingredientAvailableMeals.length > 0 ? (
            ingredientAvailableMeals.map((product) => (
              <DishCard key={product.id} dish={product} />
            ))
          ) : (
            <p className="no-dishes-sec">На жаль, немає страв, які можна приготувати!</p>
          )}
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
      <ScrollToTop />
    </div>
  );
};

export default Generator;
