import { X } from "lucide-react";
import "./DishCard.css";

const ModalWindow = ({
  dish,
  productsForDish,
  calculatedNutrition,
  closeModal,
}) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{dish.name}</h2>
          <X className="modal-close-button1" size={30} onClick={closeModal} />
        </div>
        <div className="recipe-details">
          <img src={dish.photo} alt={dish.name} className="product-img" />
          <p className="recipe-description">{dish.description}</p>
          <div className="recipe-section">
            <h2 className="section-title">Інгредієнти</h2>
            <ul className="ingredients-list">
              {productsForDish.map((item, index) => (
                <li key={index}>
                  {item.ingredient.name} - {item.quantity} г
                </li>
              ))}
            </ul>
          </div>
          <div className="recipe-section">
            <h3>
              Загальна вага:{" "}
              {productsForDish.reduce((sum, item) => sum + item.quantity, 0)} г
            </h3>

            <h3>Калорії: {calculatedNutrition.calories}</h3>
            <h3>Білки: {calculatedNutrition.proteins}</h3>
            <h3>Жири: {calculatedNutrition.fats}</h3>
            <h3>Вуглеводи: {calculatedNutrition.carbohydrates}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
