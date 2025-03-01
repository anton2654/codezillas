import React from "react";
import "./productCard.css";
import { MoveDownRight } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
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
        </div>
    );
};

export default ProductCard;
