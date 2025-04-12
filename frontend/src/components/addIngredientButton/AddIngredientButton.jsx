import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import "../dishCard/dishCard.css";

const AddIngredientButton = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDishName, setNewDishName] = useState("");
  const [newDishWeight, setNewDishWeight] = useState("");
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/ingredient/all/"
        );
        setIngredients(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("Помилка отримання списку інгредієнтів:", error);
      }
    };
    fetchIngredients();
  }, []);

  const handleAddDish = async () => {
    if (
      newDishName.trim() === "" ||
      isNaN(newDishWeight) ||
      newDishWeight <= 0
    ) {
      alert("Введіть коректні дані!");
      return;
    }

    try {
      const ingredientsResponse = await axios.get(
        "http://127.0.0.1:8000/api/ingredient/all/"
      );
      const ingredients = ingredientsResponse.data;

      const foundIngredient = ingredients.find(
        (item) => item.name.toLowerCase() === newDishName.toLowerCase()
      );
      if (!foundIngredient) {
        alert("Інгредієнт не знайдено!");
        return;
      }

      // Формуємо об'єкт у правильному форматі
      const newDish = {
        ingredients: [
          {
            quantity: parseFloat(newDishWeight),
            ingredient: foundIngredient.id, // Використовуємо знайдений ID
          },
        ],
      };
      console.log("Відправляємо об'єкт:", JSON.stringify(newDish, null, 2));
      const response = await axios.post(
        `http://127.0.0.1:8000/api/user/${userId}/fridge/add/`,
        JSON.stringify(newDish, null, 2),
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Відповідь від сервера:", response.data);

      window.location.reload();

    } catch (error) {
      console.error("Помилка при відправці запиту:", error);
      alert("Не вдалося додати інгредієнт.");
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
            <h3>Додати продукт</h3>
            <input
              list="ingredients-list"
              placeholder="Назва продукту"
              value={newDishName}
              onChange={(e) => setNewDishName(e.target.value)}
            />

            <datalist id="ingredients-list">
              {ingredients.map((ingredient) => (
                <option key={ingredient.id} value={ingredient.name} />
              ))}
            </datalist>   

            <input
              type="number"
              placeholder="Вага (г)"
              value={newDishWeight}
              onChange={(e) => setNewDishWeight(e.target.value)}
            />
            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Закрити
              </button>
              <button className="add-btn" onClick={handleAddDish}>
                Додати
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddIngredientButton;
