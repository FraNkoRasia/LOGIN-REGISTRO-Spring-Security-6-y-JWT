import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function Navbar({ user, setUser }) {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const closeDropdowns = (event) => {
            if (!event.target.closest('#profile')) {
                setIsProfileDropdownOpen(false);
            }
            if (!event.target.closest('.abrir-menu') && !event.target.closest('.nav')) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', closeDropdowns);

        return () => {
            document.removeEventListener('click', closeDropdowns);
        };
    }, [isProfileDropdownOpen]); // Agrega isProfileDropdownOpen como dependencia


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleProfileClick = (event) => {
        event.stopPropagation();
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    if (user === null) {
        // Representar contenido para usuarios no autenticados (sin cambios)
        return (
            <header className="header">
                <div>
                    <Link className='titPlay' to="/">
                        <p>PLAY CODE</p>
                    </Link>
                    <button id="abrir" className="abrir-menu" onClick={toggleMenu}>
                        {menuOpen ? <i className="bi bi-x"></i> : <i className="bi bi-list"></i>}
                    </button>
                    <nav id="nav" className={`nav ${menuOpen ? "visible" : ""}`}>
                        <button className="cerrar-menu" id="cerrar" onClick={toggleMenu}>
                            <i className="bi bi-x"></i>
                        </button>
                        <ul className="nav-list">
                            <li><Link to="/login" className="nav-list-color">LOGIN</Link></li>
                            <li><Link to="/registro" className="nav-list-color">REGISTRO</Link></li>
                            <li><Link to="/contacto" className="nav-list-color">CONTACTO</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    } else {
        // Representar contenido para usuarios autenticados
        const handleLogout = () => {
            localStorage.removeItem('token'); // Eliminar token del almacenamiento local
            setUser(null); // Borrar el estado del usuario al cerrar sesión
        };

        return (
            <header className="header">
                <Link className='titPlay' to="/">
                    <p>PLAY CODE</p>
                </Link>
                <button id="abrir" className="abrir-menu" onClick={toggleMenu}>
                    {menuOpen ? <i className="bi bi-x"></i> : <i className="bi bi-list"></i>}
                </button>
                <nav id="nav" className={`nav ${menuOpen ? "visible" : ""}`}>
                    <button className="cerrar-menu" id="cerrar" onClick={toggleMenu}>
                        <i className="bi bi-x"></i>
                    </button>
                    <ul className="nav-list">

                        <li>
                            <Link to="/dashboard" className="nav-list-color">PANEL</Link>
                        </li>

                        {user.role === 'ADMINISTRATOR' && ( // Representación condicional según el rol del usuario
                            <li><Link to="/lista-usuarios" className="nav-list-color">USUARIOS</Link></li>
                        )}

                        <li className="dropdown-container"> {/* Envolver "Perfil" en un contenedor */}
                            <Link id="profile" className="nav-list-color" onClick={handleProfileClick}>
                                PERFIL {isProfileDropdownOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                            </Link>

                            {isProfileDropdownOpen && ( // Representar condicionalmente el contenido desplegable
                                <ul className="dropdown-menu">
                                    <li><Link to="/perfil" className="nav-list-color" >Modificar Perfil</Link></li>
                                    <li><Link to="/editpassword" className="nav-list-color" >Modificar Contraseña</Link></li>
                                </ul>
                            )}
                        </li>

                        <li><Link to="/contacto" className="nav-list-color">CONTACTO</Link></li>
                        <li>
                            <button className='cerrarSesion' onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </nav>
            </header >
        );
    }
}
