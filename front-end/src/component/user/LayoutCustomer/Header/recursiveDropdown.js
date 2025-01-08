import { useState } from "react";
import { Link } from "react-router-dom";

export default function RecursiveDropdown({  }) {
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const handleMouseEnter = () => {
        setSubmenuOpen(true);
    };

    const handleMouseLeave = () => {
        setSubmenuOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <div className="nav-link" data-bs-toggle="dropdown">
                <span className="dropdown-toggle">Danh mục</span>
            </div>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                    <a className="dropdown-item" href="#">Mục 1.1</a>
                </li>
                <li
                    className="dropdown-submenu"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <a className="dropdown-item dropdown-toggle" href="#">
                    Mục 1.2
                    </a>
                    <ul className={`dropdown-menu ${submenuOpen ? 'show' : ''}`}>
                        <li>
                            <ul className={`dropdown-menu ${submenuOpen ? 'show' : ''}`}>
                                <li>
                                    <a className="dropdown-item" href="#">Mục 1.2.1</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Mục 1.2.2</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">Mục 1.2.2</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a className="dropdown-item" href="#">Mục 1.3</a>
                </li>
            </ul>
        </div>
        </nav>
    );
}