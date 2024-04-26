import React from 'react';
import linkedinImage from './Imagenes/linkedin.png'; // Importa la imagen de LinkedIn
import githubImage from './Imagenes/github.png'; // Importa la imagen de GitHub
import whatsappImage from './Imagenes/whatsapp.png';

export default function Footer() {
    return (
        <footer>
            <section class="footer">
                <p id="redes">Mis Redes Sociales</p>
                <a href="https://www.linkedin.com/in/francorasia">
                    <img className="linkedin" src={linkedinImage} alt="imagen de linkedin" />
                </a>
                <a href="https://github.com/FraNkoRasia">
                    <img className="github" src={githubImage} alt="imagen de github" />
                </a>
                <a href="https://wa.me/543583415501">
                    <img className="whatsapp" src={whatsappImage} alt="imagen de whatsapp" />
                </a>
                <p>Web Desarrollada por RASIA FRANCO </p>
                <p align="center" className="copy">&copy; Todos los derechos reservados | Rasia Franco 2024</p>
            </section>
        </footer>
    );
}

