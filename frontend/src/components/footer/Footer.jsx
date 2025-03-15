import React from 'react';
import './footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className="logo1">
                <img src="/white-logo.png" alt="Smart Meal Logo" className='footer-logo-img'/>
            </div>
            <div className="about-container">
                <p>© 2025 Codezillas Corp. Всі права захищено.</p>
                <p>м. Львів, вул. Кульпарківська, 95.</p>
                <p>support@smartmeal.com</p>
            </div>

            <div className="text1">
                <span className="main_text">Меню</span>
                <Link to="/dishes" style={{textDecoration: 'none'}}>
                    <p>Страви</p>
                </Link>
                <Link to="/drinks" style={{textDecoration: 'none'}}>
                    <p>Напої</p>
                </Link>
                <Link to="/generator" style={{textDecoration: 'none'}}>
                    <p>Генератор</p>
                </Link>
                <Link to="/fridge" style={{textDecoration: 'none'}}>
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


            <button className="footer-support-button">Підтримати</button>

        </footer>
    );
};

export default Footer;