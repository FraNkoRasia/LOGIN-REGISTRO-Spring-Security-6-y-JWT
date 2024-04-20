import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'


export default function Navbar({ user, setUser }) {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // Estado para visibilidad desplegable

    useEffect(() => {
        const closeProfileDropdown = () => {
            setIsProfileDropdownOpen(false);
        };

        // Cerrar el menú desplegable del perfil al hacer clic fuera de él
        document.addEventListener('click', closeProfileDropdown);

        // Limpiar el detector de eventos al desmontar
        return () => {
            document.removeEventListener('click', closeProfileDropdown);
        };
    }, []);

    const handleProfileClick = (event) => {
        event.stopPropagation(); // Evitar la propagación de eventos al detector de clics en el documento
        setIsProfileDropdownOpen(!isProfileDropdownOpen); // Alternar visibilidad del menú desplegable al hacer clic
    };

    // console.log("Valor actual de user en Navbar:", user); // Registrar información del usuario
    // console.log(JSON.stringify(user));

    if (user === null) {
        // Representar contenido para usuarios no autenticados (sin cambios)
        return (
            <header>
                <div className='flex align-center'>
                    <Link className='titPlay' to="/">
                        <p>PLAY CODE</p>
                    </Link>
                    <nav>
                        <ul className='flex nav-1'>
                            <li><Link to="/login" className="sin-subrayado">LOGIN</Link></li>
                            <li><Link to="/registro" className="sin-subrayado">REGISTRO</Link></li>
                            <li><Link to="/contacto" className="sin-subrayado">CONTACTO</Link></li>
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
            <header>
                <div className='flex align-center celu-responsive'>
                    <Link className='titPlay' to="/">
                        <p>PLAY CODE</p>
                    </Link>

                    <nav>
                        <ul className='flex nav-2'>

                            <li>
                                <Link to="/dashboard" className="sin-subrayado">PANEL</Link>
                            </li>

                            {user.role === 'ADMINISTRATOR' && ( // Representación condicional según el rol del usuario
                                <li><Link to="/lista-usuarios" className="sin-subrayado">USUARIOS</Link></li>
                            )}

                            <li className="dropdown-container"> {/* Envolver "Perfil" en un contenedor */}
                                <Link id="profile" className="sin-subrayado" onClick={handleProfileClick}>
                                    PERFIL {isProfileDropdownOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                                </Link>

                                {isProfileDropdownOpen && ( // Representar condicionalmente el contenido desplegable
                                    <ul className="dropdown-menu">
                                        <li><Link to="/perfil" className="sin-subrayado" >Modificar Perfil</Link></li>
                                        <li><Link to="/editpassword" className="sin-subrayado" >Modificar Contraseña</Link></li>
                                    </ul>
                                )}
                            </li>

                            <li><Link to="/contacto" className="sin-subrayado">CONTACTO</Link></li>
                        </ul>

                    </nav>
                    <li className="cerrarSesionContainer">
                        <button className="cerrarSesion" onClick={handleLogout}>
                            Cerrar Sesión
                        </button>
                    </li>

                </div>
            </header>
        );
    }
}
