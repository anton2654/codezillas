import { X } from "lucide-react";
import "./DishCard.css";
import "./modalWindow.css"

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
                  <span>{item.ingredient.name}</span> {item.quantity} г
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe-section">
            <h3 className="section-title">Харчова цінність</h3>
            <ul className="nutrition-info-list">
              <li><span>Загальна вага</span> {productsForDish.reduce((sum, item) => sum + item.quantity, 0)} г</li>
              <li><span>Калорії</span> {calculatedNutrition.calories}</li>
              <li><span>Білки</span> {calculatedNutrition.proteins}</li>
              <li><span>Жири</span> {calculatedNutrition.fats}</li>
              <li><span>Вуглеводи</span> {calculatedNutrition.carbohydrates}</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
