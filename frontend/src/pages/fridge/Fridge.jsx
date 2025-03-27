import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Categories from "../../components/categories/Categories.jsx";
import SkeletonDishCard from "../../components/dishCard/SkeletonDishCard.jsx";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";

import "../dishes/dishes.css";
import { CaseLower } from "lucide-react";

const Fridge = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productCategories, setProductCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [currentPage, setCurrentPage] = useState(1);

  const componentInited = useRef(false);
  const itemsPerPage = 10;

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
        "http://127.0.0.1:8000/api/user/1/fridge/"
        // "http://127.0.0.1:8000/api/ingredient/all/"
      );
      setItems(response.data);
      const products = response.data.map((item) => item.ingredient);
      setItems(products);
      // console.log(response.data); // Весь об'єкт
      console.log(products); // Масив тільки з `ingredient`
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const getProducts = async () => {
  //   try {
  //     const prodId = productsId.map((item) => item.ingredient).join(",");

  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/api/user/1/fridge/${prodId}`
  //       // `http://127.0.0.1:8000/api/ingredient/${prodId}`
  //     );
  //     setItems(response.data);
  //     // console.log(prodId);
  //     console.log(response.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    setIsLoading(true);

    if (!componentInited.current) {
      componentInited.current = true;
      getProductCategories();
      getProductsId();
      // getProducts();
    }
  }, []);

  const filteredProducts =
    activeCategory === "Все"
      ? items
      : items.filter((product) => product.category === activeCategory);

  // Визначення продуктів для поточної сторінки
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
          onCategoryClick={(category) => {
            setActiveCategory(category);
            setCurrentPage(1); // Скидаємо пагінацію при зміні категорії
          }}
        />

        <div className="product-list">
          {isLoading
            ? skeletons
            : filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {/* Відображаємо пагінацію тільки якщо є більше 1 сторінки */}
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
