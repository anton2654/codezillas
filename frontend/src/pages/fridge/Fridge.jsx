import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";

import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Categories from "../../components/categories/Categories.jsx";
import SkeletonDishCard from "../../components/dishCard/SkeletonDishCard.jsx";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import AddIngredientButton from "../../components/addIngredientButton/AddIngredientButton.jsx";

import "../dishes/dishes.css";

const Fridge = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productCategories, setProductCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [weights, setWeights] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [currentPage, setCurrentPage] = useState(1);

  const componentInited = useRef(false);
  const itemsPerPage = 10;

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading) return;

    setIsLoading(true);

    if (!componentInited.current) {
      componentInited.current = true;
      getProductCategories();
      getProductsId();
    }
  }, [user, loading]);

  const getProductCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/ingredient/categories/"
      );
      setProductCategories(["Все", ...response.data.categories]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsId = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user/${user.id}/fridge/`
      );
      const products = response.data.map((item) => item.ingredient);
      const weights_of_products = response.data.map((item) => item.quantity);
      setItems(products);
      setWeights(weights_of_products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveProduct = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const filteredProducts =
    activeCategory === "Все"
      ? items
      : items.filter((product) => product.category === activeCategory);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <Header />
      <div className="dishes-wrapper">
        <div className="dishes-wrapper-top">
          <Categories
            categories={productCategories}
            activeCategory={activeCategory}
            onCategoryClick={(category) => {
              setActiveCategory(category);
              setCurrentPage(1);
            }}
          />
          <AddIngredientButton
            userId={user?.id}
          />
        </div>

        <div className="product-list">
          {isLoading
            ? [...new Array(8)].map((_, index) => (
                <SkeletonDishCard key={index} />
              ))
            : displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  weight={weights[items.indexOf(product)]}
                  userId={user?.id}
                  onRemove={handleRemoveProduct}
                />
              ))}
        </div>

        {filteredProducts.length > itemsPerPage && (
          <div className="button-container">
            <Pagination
              onChangePage={(number) => setCurrentPage(number)}
              pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Fridge;
