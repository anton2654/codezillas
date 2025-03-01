import React, { useState } from "react";
import { categories, productsData } from "./data";
import "./dishes.css";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import ProductCard from "../../components/productCard/ProductCard.jsx";

const Dishes = () => {
    const [activeCategory, setActiveCategory] = useState("Все");
    const [visibleCount, setVisibleCount] = useState(10);

    const filteredProducts =
        activeCategory === "Все"
            ? productsData
            : productsData.filter((product) => product.category === activeCategory);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setVisibleCount(10);
    };

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };

    return (
        <div className="container">
            <Header />
            <div className="dishes-wrapper">
                <div className="tabs">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={cat === activeCategory ? "tab active" : "tab"}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="product-list">
                    {filteredProducts.slice(0, visibleCount).map((product) => (
                        <ProductCard key={product.id} product={product} />
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
