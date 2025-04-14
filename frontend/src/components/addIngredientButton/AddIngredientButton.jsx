import { useState, useEffect } from "react";
import { PlusCircle, X } from "lucide-react";
import axios from "axios";
import "../dishCard/dishCard.css";

const AddIngredientButton = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [currentIngredientName, setCurrentIngredientName] = useState("");
  const [currentIngredientWeight, setCurrentIngredientWeight] = useState("");
  const [addedIngredients, setAddedIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/ingredient/all/"
        );
        setIngredientsList(response.data);
      } catch (error) {
        console.error("Помилка отримання списку інгредієнтів:", error);
      }
    };
    fetchIngredients();
  }, []);

  const handleAddIngredient = () => {
    if (
      !currentIngredientName.trim() ||
      isNaN(currentIngredientWeight) ||
      currentIngredientWeight <= 0
    ) {
      alert("Введіть коректні дані для інгредієнта!");
      return;
    }
    const foundIngredient = ingredientsList.find(
      (item) => item.name.toLowerCase() === currentIngredientName.toLowerCase()
    );
    if (!foundIngredient) {
      alert("Інгредієнт не знайдено!");
      return;
    }

    const newIngredient = {
      id: foundIngredient.id,
      name: foundIngredient.name,
      weight: parseFloat(currentIngredientWeight),
    };

    setAddedIngredients((prev) => [...prev, newIngredient]);
    setCurrentIngredientName("");
    setCurrentIngredientWeight("");
  };

  const handleDeleteIngredient = (index) => {
    setAddedIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveIngredients = async () => {
    if (addedIngredients.length === 0) {
      alert("Додайте хоча б один інгредієнт!");
      return;
    }

    const payload = {
      ingredients: addedIngredients.map((item) => ({
        quantity: item.weight,
        ingredient: item.id,
      })),
    };

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/user/${userId}/fridge/add/`,
        JSON.stringify(payload, null, 2),
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Відповідь від сервера:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Помилка при відправці запиту:", error);
      alert("Не вдалося додати інгредієнти.");
    }
  };

  return (
    <>
      <button className="add-dish-button" onClick={() => setIsModalOpen(true)}>
        <PlusCircle size={20} /> Додати продукт
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content-add">
            <h3>Додати продукти</h3>

            <ul className="added-ingredients">
              {addedIngredients.map((ingredient, index) => (
                <li key={index} className="ingredient-box">
                  <span>{ingredient.name}</span> {ingredient.weight} г
                  <X
                    className="delete-icon"
                    size={16}
                    onClick={() => handleDeleteIngredient(index)}
                  />
                </li>
              ))}
            </ul>

            <div className="add-ingredients">
              <input
                className="ing-input"
                list="ingredients-list"
                placeholder="Додайте інгредієнт"
                value={currentIngredientName}
                onChange={(e) => setCurrentIngredientName(e.target.value)}
              />
              <datalist id="ingredients-list">
                {ingredientsList.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.name} />
                ))}
              </datalist>

              <input
                className="weight-input"
                placeholder="Маса (г)"
                type="number"
                value={currentIngredientWeight}
                onChange={(e) => setCurrentIngredientWeight(e.target.value)}
              />

              <button className="add-button" onClick={handleAddIngredient}>
                Додати
              </button>
            </div>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Закрити
              </button>
              <button className="add-btn" onClick={handleSaveIngredients}>
                Зберегти
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddIngredientButton;
