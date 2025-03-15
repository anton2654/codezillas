import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer.jsx";
import "./create.css";
import { ArrowLeft } from 'lucide-react';

const Create = () => {
    return (
        <div>
            <Header />
            <div className="create-page">
                <div className="create-container">
                    <div className="create-header">
                        <div className="create-header-left">
                            <ArrowLeft className="go-back-icon"/>
                            <h2>Додавання рецепту</h2>
                        </div>
                        <div className="create-header-right">
                            <button className="clear-button">Очистити</button>
                            <button className="publish-button">Опублікувати</button>
                        </div>
                    </div>
                    <div className="create-form">
                        <div className="create-info">
                            <div className="create-image">
                                <div className="image">

                                </div>
                                <button>Завантажити з URL-адреси</button>
                            </div>
                            <div className="create-input">
                                <div className="input-group">
                                    <label htmlFor="name">Назва</label>
                                    <input type="text" id="name" placeholder="Додайте назву"/>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="description">Опис</label>
                                    <textarea id="description" placeholder="Додайте короткий опис"></textarea>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="ingredients">Інгредієнти</label>
                                    <textarea id="ingredients" placeholder="Додайте інгредієнти"></textarea>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="recipe">Рецепт</label>
                                    <textarea id="recipe" placeholder="Додайте рецепт"></textarea>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="category">Категорія</label>
                                    <input id="category" placeholder="Наприклад: десерт, перша страва, салат"></input>
                                </div>
                                <div className="radio-group">
                                    <label htmlFor="description">Тип</label>
                                    <div className="radio-options">
                                        <label className="radio-label">
                                            <input type="radio" name="type" value="dish" /> Страва
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="type" value="drink" /> Напій
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Create;