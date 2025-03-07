import React, {useState} from "react";
import "./productCard.css";
import { MoveDownRight } from 'lucide-react';
import { X } from 'lucide-react';
import SkeletonProductCard from "./SkeletonProductCard";

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

    return (
        <div className="product-card" onClick={openModal}>
            <img
                src={product.image}
                alt={product.name}
                className="product-img"
            />

            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>

            <div className="icon-wrapper">
                <MoveDownRight strokeWidth={1.25} className="go-icon" />
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-window" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{product.name}</h2>
                            <X className="modal-close-button1" size={30} onClick={closeModal} />
                        </div>
                        <div className="recipe-details">
                            <p className="recipe-description">{product.description}</p>

                            <div className="time-info">
                                <div className="time-item">
                                    <span className="time-value">15 хв</span>
                                    <span className="time-label">Підготовка</span>
                                </div>
                                <div className="time-item">
                                    <span className="time-value">10 хв</span>
                                    <span className="time-label">Приготування</span>
                                </div>
                                <div className="time-item">
                                    <span className="time-value">25 хв</span>
                                    <span className="time-label">Загалом</span>
                                </div>
                            </div>

                            <div className="recipe-section">
                                <h2 className="section-title">Інгридієнти</h2>
                                <ul className="ingredients-list">
                                    <li>1 римський салат</li>
                                    <li>1 куряче філе</li>
                                    <li>50 г пармезану</li>
                                    <li>100 г білих сухариків</li>
                                    <li>3 ст. л. оливкової олії</li>
                                    <li>1 ч. л. гірчиці</li>
                                    <li>1 ч. л. лимонного соку</li>
                                    <li>1 зубчик часнику</li>
                                    <li>2 анчоуси (за бажанням)</li>
                                    <li>Сіль, перець – за смаком</li>
                                </ul>
                            </div>

                            <div className="recipe-section">
                                <h2 className="section-title">Рецепт</h2>
                                <ol className="instructions">
                                    <li>Куряче філе обсмажити на сковороді з 1 ст. л. оливкової олії до золотистої скоринки. Дати охолонути і нарізати смужками.</li>
                                    <li>Сухарики підсмажити на сковороді з оливковою олією і часником до золотистого кольору.</li>
                                    <li>Приготувати соус: змішати гірчицю, лимонний сік, анчоуси (за бажанням) і залишкову оливкову олію.</li>
                                    <li>Римський салат нарвати руками і викласти у велику миску.</li>
                                    <li>Додати куряче філе, сухарики і натертий пармезан.</li>
                                    <li>Полити все соусом і добре перемішати.</li>
                                    <li>Подавати одразу після приготування.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductCard;
