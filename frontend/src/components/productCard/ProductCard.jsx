import { useState, useEffect, useRef } from "react";
import "../dishCard/dishCard.css";
import { MoveDownRight } from "lucide-react";
import { X } from "lucide-react";
import axios from "axios";
import SkeletonDishCard from "../dishCard/SkeletonDishCard";
import ModalWindow from "../dishCard/ModalWindow";

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable page scroll
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Enable page scroll
  };

  //   const [productsForDish, setProductsForDish] = useState([]);
  //   const [calculatedNutrition, setCalculatedNutrition] = useState([]);
  //
  //   const componentInited = useRef(false);
  //
  //   const getIngredients = async () => {
  //     await axios
  //       .get(`http://127.0.0.1:8000/api/meal/ingredients/${dish.id}/`)
  //       .then((response) => {
  //         setProductsForDish(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   const getСalculate_nutrition = async () => {
  //     await axios
  //       .get(`http://127.0.0.1:8000/api/meal/calculate_nutrition/${dish.id}/`)
  //       .then((response) => {
  //         setCalculatedNutrition(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //   useEffect(() => {
  //     if (!componentInited.current) {
  //       componentInited.current = true;
  //       getIngredients();
  //       getСalculate_nutrition();
  //     }
  //   }, []);

  // const [dishId, setDishId] = useState(0);

  return (
    <div className="product-card" onClick={openModal}>
      {/* <img src={product.photo} alt={product.name} className="product-img" /> */}

      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-description">{product.description}</p>

      <div className="icon-wrapper">
        <MoveDownRight strokeWidth={1.25} className="go-icon" />
      </div>

      {isModalOpen && (
        <ModalWindow
          dish={dish}
          productsForDish={productsForDish}
          calculatedNutrition={calculatedNutrition}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ProductCard;
