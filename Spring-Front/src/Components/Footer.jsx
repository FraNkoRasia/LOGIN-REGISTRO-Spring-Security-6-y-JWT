import React from 'react';
import linkedinImage from './Imagenes/linkedin.png'; // Importa la imagen de LinkedIn
import githubImage from './Imagenes/github.png'; // Importa la imagen de GitHub

export default function Footer() {
    return (
        <footer>
        <section className='redes'>
            <div className="redes-container">
                <a href="https://www.linkedin.com/in/francorasia" className="redes-sociales">
                    <img className="linkedin" src={linkedinImage} alt="imagen de linkedin" />
                </a>
                <a href="https://github.com/FraNkoRasia" className="redes-sociales">
                    <img className="github" src={githubImage} alt="imagen de github" />
                </a>
            </div>
        </section>
        <p className="copyright">Web Desarrollada por RASIA FRANCO </p>
        <p className="copyright">&copy; Todos los derechos reservados | Rasia Franco 2024</p>
    </footer>
    
    );
}

