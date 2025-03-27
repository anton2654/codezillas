import { useState, useEffect } from "react";
import "./header.css";
import { Refrigerator, Beef, CupSoda, Calculator } from "lucide-react";
import { NavLink } from "react-router-dom";
import UserButton from "../userButton/userButton.jsx";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`header-container ${isScrolled ? "scrolled" : ""}`}>
            <div className='header-logo'>
                <NavLink to="/" style={{textDecoration: 'none'}}>
                    <img src="/logo.png" alt="Логотип" className='header-logo-img'/>
                </NavLink>
            </div>
            <nav className='header-nav'>
                <div className='header-nav-link'>
                    <NavLink to="/fridge" className='header-nav-link'>
                        <Refrigerator size={25} strokeWidth={1.25}/>
                        <span>Холодильник</span>
                    </NavLink>
                </div>
                <div className='header-nav-link'>
                    <NavLink to="/dishes" className='header-nav-link'>
                        <Beef size={25} strokeWidth={1.25}/>
                        <span>Страви</span>
                    </NavLink>

                </div>
                <div className='header-nav-link'>
                    <NavLink to="/drinks" className='header-nav-link'>
                        <CupSoda size={25} strokeWidth={1.25}/>
                        <span>Напої</span>
                    </NavLink>
                </div>
                <div className='header-nav-link'>
                    <NavLink to="/generator" className='header-nav-link'>
                        <Calculator size={25} strokeWidth={1.25}/>
                        <span>Генератор</span>
                    </NavLink>
                </div>
            </nav>
            <div className='header-profile'>
                <UserButton />
            </div>
        </div>
    );
};

export default Header;
