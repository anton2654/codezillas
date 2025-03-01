import React from 'react';
import './footer.css'

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
                <p>Страви</p>
                <p>Напої</p>
                <p>Генератор</p>
                <p>Холодильник</p>
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