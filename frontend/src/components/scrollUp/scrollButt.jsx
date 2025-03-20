import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import "./ScrollToTop.css";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [bottomOffset, setBottomOffset] = useState(20);
    const footerRef = useRef(null);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    useEffect(() => {
        const checkFooterPosition = () => {
            const footer = document.querySelector("footer"); // Отримуємо футер
            if (footer) {
                const rect = footer.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight) {
                    setBottomOffset(windowHeight - rect.top + 20);
                } else {
                    setBottomOffset(20);
                }
            }
        };

        window.addEventListener("scroll", checkFooterPosition);
        return () => window.removeEventListener("scroll", checkFooterPosition);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div
            className={`scroll-to-top ${isVisible ? "show" : ""}`}
            onClick={scrollToTop}
            style={{ bottom: `${bottomOffset}px` }} // Динамічно змінюємо позицію
        >
            <ArrowUp strokeWidth={1.5} />
        </div>
    );
};

export default ScrollToTop;
