import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import "./mainPage.css";
import { Search } from "lucide-react";
import ScrollToTop from "../../components/scrollUp/scrollButt.jsx";
import DishCard from "../../components/dishCard/DishCard.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDishes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/meal/all/");
        setItems(response.data);
      } catch (error) {
        console.error("Помилка при завантаженні страв:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getDishes();
  }, []);

  const renderSection = (title, items) => (
    <div className="section">
      <h2>{title}</h2>
      <div className="product-list">
        {isLoading ? (
          <p>Завантаження...</p>
        ) : (
          items.slice(0, 5).map((product) => (
            <DishCard key={product.id} dish={product} />
          ))
        )}
      </div>
      <button>Більше</button>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="main-page">
        <div className="generator-container">
          <div className="description">
            <h1>Смачні страви з того, що вже є у вас вдома.</h1>
            <p>
              Додайте продукти до інвентарю, і ми згенеруємо рецепти саме для
              вас. Економте час, гроші та насолоджуйтеся приготуванням!
            </p>
          </div>
          <Link to="/generator">
            <button>Спробувати!</button>
          </Link>
        </div>

        <div className="search-container">
          <h2>Знайдіть страву за вашим настроєм і запасами</h2>
          <div className="search-wrapper">
            <div className="search">
              <Search strokeWidth={1.5} />
              <input placeholder="Знайти страву..." />
            </div>
            <button>Шукати</button>
          </div>
        </div>

        {renderSection("Популярне", items)}
        {renderSection("Вам може сподобатись", items)}
        {renderSection("Вибір редакції", items)}
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainPage;
