import { useState, useEffect } from "react";
import "./header.css";
import { Refrigerator, Beef, CupSoda, Calculator } from "lucide-react";

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
                <img src="/logo.png" alt="Логотип" className='header-logo-img'/>
            </div>
            <nav className='header-nav'>
                <div className='header-nav-link'>
                    <Refrigerator size={25} strokeWidth={1.25}/>
                    <span>Холодильник</span>
                </div>
                <div className='header-nav-link'>
                    <Beef size={25} strokeWidth={1.25}/>
                    <span>Страви</span>
                </div>
                <div className='header-nav-link'>
                    <CupSoda size={25} strokeWidth={1.25}/>
                    <span>Напої</span>
                </div>
                <div className='header-nav-link'>
                    <Calculator size={25} strokeWidth={1.25}/>
                    <span>Калькулятор</span>
                </div>
            </nav>
            <div className='header-profile'>
                <div className='header-profile-pic'></div>
            </div>
        </div>
    );
};

export default Header;
