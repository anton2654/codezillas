import "./callout.css";
import { TriangleAlert, Check, XCircle } from "lucide-react";

const iconMap = {
    success: Check,
    error: XCircle,
    warning: TriangleAlert,
};

const Callout = ({ variant = "error", children }) => {
    const Icon = iconMap[variant] || TriangleAlert;

    return (
        <div className={`callout-wrapper callout-${variant}`} role="alert">
            <Icon className="icon" size={18} strokeWidth={1.5} />
            <span>{children}</span>
        </div>
    );
};

export default Callout;