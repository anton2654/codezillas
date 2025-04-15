import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import "./create.css";
import { ArrowLeft, X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Create = () => {
    const [mealName, setMealName] = useState("");
    const [mealDescription, setMealDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [photoUrl, setPhotoUrl] = useState("");

    const [ingredientsList, setIngredientsList] = useState([]);
    const [addedIngredients, setAddedIngredients] = useState([]);
    const [currentIngredientName, setCurrentIngredientName] = useState("");
    const [currentIngredientWeight, setCurrentIngredientWeight] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/meal/categories/");
                console.log("Отримані категорії:", response.data);
                setCategories(response.data.categories || []);
            } catch (error) {
                console.error("Помилка завантаження категорій:", error);
                setCategories([]);
            }
        };

        const fetchIngredients = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/ingredient/all/");
                setIngredientsList(response.data);
            } catch (error) {
                console.error("Помилка завантаження інгредієнтів:", error);
                setIngredientsList([]);
            }
        };

        fetchCategories();
        fetchIngredients();
    }, []);

    const handleAddIngredient = () => {
        if (!currentIngredientName.trim() || !currentIngredientWeight.trim()) {
            alert("Введіть назву та вагу інгредієнта!");
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
            weight: currentIngredientWeight,

        };
        setAddedIngredients([...addedIngredients, newIngredient]);
        setCurrentIngredientName("");
        setCurrentIngredientWeight("");
    };

    const handleDeleteIngredient = (index) => {
        const updatedIngredients = addedIngredients.filter((_, i) => i !== index);
        setAddedIngredients(updatedIngredients);
    };

    const handleCreateMeal = async () => {
        if (!mealName || !selectedCategory) {
            alert("Заповніть назву та оберіть категорію!");
            return;
        }

        const mealData = {
            name: mealName,
            description: mealDescription,
            category: selectedCategory,
            photo: photoUrl,
        };

        try {
            const mealResponse = await axios.post("http://127.0.0.1:8000/api/meal/create/", mealData);
            const mealId = mealResponse.data.id;

            if (addedIngredients.length > 0) {
                const ingredientsData = addedIngredients.map((ingredient) => ({
                    ingredient: ingredient.id,
                    quantity: ingredient.weight,
                }));

                await axios.post(`http://127.0.0.1:8000/api/meal/add_ingredients/${mealId}/`, {
                    ingredients: ingredientsData,
                });
            }

            alert("Страву успішно додано!");
            setMealName("");
            setMealDescription("");
            setSelectedCategory("");
            setAddedIngredients([]);
        } catch (error) {
            console.error("Помилка при створенні страви:", error);
            alert("Виникла помилка при додаванні страви!");
        }
    };

    const nav = useNavigate();

    return (
      <div>
        <Header />
        <div className="create-page">
          <div className="create-container">
            <div className="create-header">
              <div className="create-header-left">
                <ArrowLeft className="go-back-icon" onClick={() => nav(-1)} />
                <h2>Додавання рецепту</h2>
              </div>
              <div className="create-header-right">
                <button className="clear-button">Очистити</button>
                <button className="publish-button" onClick={handleCreateMeal}>
                  Опублікувати
                </button>
              </div>
            </div>
            <div className="create-form">
              <div className="create-info">
                <div className="create-image">
                  {photoUrl ? (
                      <div className="image-added">
                        <img
                          src={photoUrl}
                          alt="Meal preview"
                          className="preview-image"
                        />
                      </div>
                  ) : (
                    <div className="image"></div>
                  )}
                </div>

                <div className="create-input">
                  <div className="input-group">
                    <label htmlFor="photo">Фото (URL)</label>
                    <input
                      type="text"
                      id="photo"
                      placeholder="Вставте URL фото"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="name">Назва</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Додайте назву"
                      value={mealName}
                      onChange={(e) => setMealName(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="description">Опис</label>
                    <textarea
                      id="description"
                      placeholder="Додайте короткий опис"
                      value={mealDescription}
                      onChange={(e) => setMealDescription(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="category">Категорія</label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Оберіть категорію</option>
                      {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))
                      ) : (
                        <option disabled>Категорії не завантажено</option>
                      )}
                    </select>
                  </div>
                  <div className="input-group-ingredients">
                    <label htmlFor="ingredients">Інгредієнти</label>
                    <ul className="added-ingredients">
                      {addedIngredients.map((ingredient, index) => (
                        <li key={index} className="ingredient-box">
                          <span>{ingredient.name}</span>
                          {ingredient.weight} г
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
                        onChange={(e) =>
                          setCurrentIngredientName(e.target.value)
                        }
                      />
                      <datalist id="ingredients-list">
                        {ingredientsList.map((ingredient) => (
                          <option key={ingredient.id} value={ingredient.name} />
                        ))}
                      </datalist>
                      <input
                        className="weight-input"
                        placeholder="Маса (г)"
                        value={currentIngredientWeight}
                        onChange={(e) =>
                          setCurrentIngredientWeight(e.target.value)
                        }
                      />
                      <button
                        className="add-button"
                        onClick={handleAddIngredient}
                      >
                        Додати
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
};

export default Create;