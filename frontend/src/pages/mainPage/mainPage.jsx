import React from 'react';
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import "./mainPage.css";
import { Search } from 'lucide-react';
import { productsData } from "./data";
import ProductCard from "../../components/productCard/ProductCard.jsx";

const MainPage = () => {

    return (
        <div>
            <Header />
            <div className="main-page">
                <div className="generator-container">
                    <div className="description">
                        <h1>Смачні страви з того,
                            що вже є у вас вдома.</h1>
                        <p>Додайте продукти до інвентарю, і ми згенеруємо рецепти саме для вас.
                            Економте час, гроші та насолоджуйтеся приготуванням!</p>
                    </div>
                    <button>Спробувати!</button>
                </div>
                <div className="search-container">
                    <h2>Знайдіть страву за вашим настроєм і запасами</h2>
                    <div className="search-wrapper">
                        <div className="search">
                            <Search strokeWidth={1.5}/>
                            <input placeholder="Знайти страву..."/>
                        </div>
                        <button>Шукати</button>
                    </div>
                </div>
                <div className="section">
                    <h2>Популярне</h2>
                    <div className="product-list">
                        {productsData.slice(0, 5).map((product) => (
                            <ProductCard key={product.id} dish={product} />
                        ))}
                    </div>
                    <button>Більше</button>
                </div>
                <div className="section">
                    <h2>Вам може сподобатись</h2>
                    <div className="product-list">
                        {productsData.slice(0, 5).map((product) => (
                            <ProductCard key={product.id} dish={product} />
                        ))}
                    </div>
                    <button>Більше</button>
                </div>
                <div className="section">
                    <h2>Вибір редакції</h2>
                    <div className="product-list">
                        {productsData.slice(0, 5).map((product) => (
                            <ProductCard key={product.id} dish={product} />
                        ))}
                    </div>
                    <button>Більше</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainPage;