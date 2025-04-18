import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer>
            <div className="logo1">
                <Link to="/">
                    <img src="/white-logo.png" alt="Smart Meal Logo" className="footer-logo-img" />
                </Link>
            </div>

            <div className="about-container">
                <p>© 2025 Codezillas Corp. Всі права захищено.</p>
                <p>м. Львів, вул. Кульпарківська, 95.</p>
                <p>support@smartmeal.com</p>
            </div>

            <div className="text1">
                <span className="main_text">Меню</span>
                <Link to="/dishes" style={{ textDecoration: 'none' }}>
                    <p>Страви</p>
                </Link>
                <Link to="/drinks" style={{ textDecoration: 'none' }}>
                    <p>Напої</p>
                </Link>
                <Link to="/generator" style={{ textDecoration: 'none' }}>
                    <p>Генератор</p>
                </Link>
                <Link to="/fridge" style={{ textDecoration: 'none' }}>
                    <p>Холодильник</p>
                </Link>
            </div>

            <div className="text1">
                <span className="main_text">Про Codezillas</span>
                <p>Контакти</p>
                <p>Штаб квартира</p>
            </div>

            <div className="text1">
                <span className="main_text">Документи</span>
                <p>Політика конфіденційності</p>
                <p>Приватні консультації</p>
            </div>

            <div className="text1">
                <span className="main_text">Соціальні мережі</span>
                <div className="footer-socials">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <Instagram />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <Facebook />
                    </a>
                    <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                        <Send />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter />
                    </a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
