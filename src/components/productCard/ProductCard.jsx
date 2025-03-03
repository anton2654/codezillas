import React, {useState} from "react";
import "./productCard.css";
import { MoveDownRight } from 'lucide-react';
import { X } from 'lucide-react';

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
                className=""
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
                        <div className="close-button-container">
                            <h2>{product.name}</h2>
                            <X className="modal-close-button1" onClick={closeModal} />
                        </div>
                        <div className="modal-content1">
                            <p className="modal-description">{product.description}</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductCard;
