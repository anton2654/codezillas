import { useState } from "react";
import "../dishCard/dishCard.css";
import { MoveDownRight, X } from "lucide-react";
import axios from "axios";
import ModalWindow from "../dishCard/ModalWindow";

const ProductCard = ({ product, weight, userId, onRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleRemove = async (event) => {
    event.stopPropagation(); // Щоб не відкривався модальний вікно при кліку на "X"
    if (isRemoving) return;

    setIsRemoving(true);
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/user/${userId}/fridge/remove/${product.id}`
      );
      onRemove(product.id); // Оновити список у Fridge.jsx
    } catch (error) {
      console.error("Помилка при видаленні продукту:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="product-card" onClick={openModal}>
      <img src={product.photo} alt={product.name} className="product-img" />

      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-category">
        Калорій на 100 г: <b>{product.calories}</b> ккал
      </p>
      <p className="product-category">
        БЖВ: <b>{product.proteins}</b>б / <b>{product.fats}</b>ж /{" "}
        <b>{product.carbohydrates}</b>в
      </p>
      <p className="product-category">
        Вага: <b>{weight}</b> г
      </p>

      <div className="icon-wrapper">
        <MoveDownRight strokeWidth={1.25} className="go-icon" />
      </div>

      <button
        className="remove-btn"
        onClick={handleRemove}
        disabled={isRemoving}
      >
        <X strokeWidth={1.5} size={18} />
      </button>

      {isModalOpen && (
        <ModalWindow
          dish={product}
          productsForDish={[]} // можна додати продукти для страви
          calculatedNutrition={[]} // можна додати нутрієнти
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ProductCard;
