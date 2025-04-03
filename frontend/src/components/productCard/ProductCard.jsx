import { useState } from "react";
import "../dishCard/dishCard.css";
import "./removeDialog.css";
import { MoveDownRight, X } from "lucide-react";
import axios from "axios";
import ModalWindow from "../dishCard/ModalWindow";

const ProductCard = ({ product, weight, userId, onRemove }) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);


    const handleRemove = async () => {
        if (isRemoving) return;
        setIsRemoving(true);
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/user/${userId}/fridge/remove/${product.id}`
            );
            onRemove(product.id);
        } catch (error) {
            console.error("Помилка при видаленні продукту:", error);
        } finally {
            setIsRemoving(false);
            setIsConfirmOpen(false);
            document.body.style.overflow = "auto";
        }
    };

    return (
        <div className="product-card">
            <img src={product.photo} alt={product.name} className="product-img" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-category">Калорій на 100 г: <b>{product.calories}</b> ккал</p>
            <p className="product-category">БЖВ: <b>{product.proteins}</b>б / <b>{product.fats}</b>ж / <b>{product.carbohydrates}</b>в</p>
            <p className="product-category">Вага: <b>{weight}</b> г</p>

            <button className="remove-btn" onClick={(e) => { e.stopPropagation(); setIsConfirmOpen(true); document.body.style.overflow = "hidden"; }} disabled={isRemoving}>
                <X strokeWidth={1.5} size={18} />
            </button>

            {isConfirmOpen && (
                <div className="modal-overlay">
                    <div className="confirm-modal">
                        <h2>Ви впевнені?</h2>
                        <p>Ви дійсно хочете видалити {product.name} з холодильника?</p>
                        <div className="modal-buttons">
                            <button className="cancel-btn" onClick={() => { setIsConfirmOpen(false); document.body.style.overflow = "auto"; }}>Скасувати</button>
                            <button className="confirm-btn" onClick={handleRemove} disabled={isRemoving}>Видалити</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;