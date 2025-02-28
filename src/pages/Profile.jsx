import React, { useState } from 'react';
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);  // Стан для модального вікна

    const openModal = () => setIsModalOpen(true);  // Відкриває модальне вікно
    const closeModal = () => setIsModalOpen(false);  // Закриває модальне вікно

    return (
        <div>
            <Header/>

            <div className="profile-container">
                <div className="profile-photo"></div>

                <div className="profile-info">
                    <h3>Name Surname</h3>
                    <h4>@id1</h4>
                </div>

                <div className="profile-description">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                </div>

                {/* Кнопка для відкриття модального вікна */}
                <button className="primary-profile-info-button" onClick={openModal}>Редагувати</button>

                {/* Модальне вікно */}
                {isModalOpen && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>Редагувати профіль</h2>
                            <form>
                                <input type="text" placeholder="Ім'я" />
                                <input type="text" placeholder="Прізвище" />
                                <input type="text" placeholder="Біографія" />
                                <button className="modal-save-button" type="submit">Зберегти</button>
                                <button className="modal-close-button" onClick={closeModal}>Закрити</button>
                            </form>

                        </div>
                    </div>
                )}
                <button className="secondary-profile-info-button">Налаштування</button>
            </div>

            <div className="register-date-container">
                <span className="register-date-main-text">Дата приєднання</span>
                <span className="register-date-secondary-text">25.02.2025</span>
            </div>

            <Footer/>
        </div>
    );
};

export default Profile;
