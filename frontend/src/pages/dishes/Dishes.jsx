import { useRef, useEffect, useState, useContext } from "react";
// import { categoriesDishes } from "./data";
import axios from "axios";

import "./dishes.css";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import DishCard from "../../components/dishCard/DishCard.jsx";
import SkeletonDishCard from "../../components/dishCard/SkeletonDishCard.jsx";
import Categories from "../../components/categories/Categories.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import Search from "../../components/search/Search.jsx";
import { SearchContext } from "../../App";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/scrollUp/scrollButt.jsx";

const Dishes = () => {
  const { searchValue } = useContext(SearchContext);
  const [dishesCategories, setDishCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const componentInited = useRef(false);

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

  const getDishesCategories = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/meal/categories/")
      .then((response) => {
        setDishCategory(["Все", ...response.data.categories]);
        console.log(response.data.categories);
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
      getDishesCategories();
      getDishes();
    }
  }, []);

  // Фільтрація за категорією та пошуком
  const filteredDishes = items.filter(
    (product) =>
      (activeCategory === "Все" || product.category === activeCategory) &&
      product.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // const filteredDishes =
  //   activeCategory === "Все"
  //     ? items
  //     : items.filter((product) => product.category === activeCategory);

  const indexOfLastDish = currentPage * itemsPerPage;
  const indexOfFirstDish = indexOfLastDish - itemsPerPage;
  const displayedDishes = filteredDishes.slice(
    indexOfFirstDish,
    indexOfLastDish
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // При зміні категорії повертаємося на першу сторінку
  };

  const skeletons = [...new Array(8)].map((_, index) => (
    <SkeletonDishCard key={index} />
  ));

  const nav = useNavigate()

  return (
    <div className="container">
      <Header />
      <div className="dishes-wrapper">
        {/* <div className="search-container-1">
          <Search />
        </div> */}
        <div className="dishes-wrapper-top">

          <Categories
            categories={dishesCategories}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryChange}
          />
          <Search />

          <button className="add-dish-button" onClick={() => nav("/create")}>
            <PlusCircle size={20} /> Додати страву
          </button>
        </div>

        <div className="product-list">
          {isLoading
            ? skeletons
            : displayedDishes.map((product) => (
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
      <ScrollToTop />
    </div>
  );
};

export default Dishes;
