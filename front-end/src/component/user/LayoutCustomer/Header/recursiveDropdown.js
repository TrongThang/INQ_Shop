import { useState } from "react";
import { Link } from "react-router-dom";

export default function RecursiveDropdown({ items }) {
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const handleMouseEnter = (index) => {
        setSubmenuOpen((prev) => ({ ...prev, [index]: true }));
    };

    const handleMouseLeave = (index) => {
        setSubmenuOpen((prev) => ({ ...prev, [index]: false }));
    };

    const renderDropdown = (items, level = 0) => {
        return (
            <ul className={`dropdown-menu ${level > 0 ? 'dropdown-submenu' : ''}`}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <a className="dropdown-item" href={item.link}>
                            {item.label}
                        </a>
                        {item.children && (
                            <div className={`dropdown-menu ${submenuOpen[index] ? 'show' : ''}`}>
                                {renderDropdown(item.children, level + 1)}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return renderDropdown(items);
}