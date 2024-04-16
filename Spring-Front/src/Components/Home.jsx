import React from 'react';


export default function Home() {
  return (
    <div className="container">

      <h1 className='titulo-home'>PLAYCODE</h1>
      <div className='userInfo'>
        <h2>Descripción del Proyecto:</h2>
        <p>Este proyecto es una aplicación web que permite a los usuarios registrarse,
          iniciar sesión de forma segura utilizando Java JWT para la autenticación, y
          administrar su perfil. <br /> Desarrollado como una API REST, utiliza Spring-Security 6
          para garantizar la seguridad en el backend.</p>
        <ul>
          <li><h2>Tecnologías Utilizadas:</h2></li>
          <ul>
            <li><h2>Backend:</h2></li>
            <ul>
              <li>Java JDK17</li>
              <li>Spring-Security 6</li>
              <li>JWT para autenticación</li>
              <li>MySQL Workbench para la base de datos</li>
              <li>Maven para la gestión de dependencias</li>
              <li>Postman para probar los endpoints de mi API REST</li>
            </ul>
            <li><h2>Frontend:</h2></li>
            <ul>
              <li>ReactJS para la interfaz de usuario</li>
              <li>HTML y CSS para el diseño y la estructura visual</li>
            </ul>
          </ul>
        </ul>
        <ul>
          <li><h2>Características Principales:</h2></li>
          <ul>
            <li><h3>Autenticación y Autorización:</h3></li>
            <ul>
              <li>Los usuarios pueden registrarse e iniciar sesión de forma segura.</li>
              <li>Se utiliza Java JWT para la generación y validación de tokens de acceso.</li>
            </ul>
          </ul>
        </ul>
        <ul>
          <li><h2>Gestión de Perfiles:</h2></li>
          <ul>
            <ul>
              <li>Los usuarios pueden ver y actualizar su información de perfil.</li>
              <li>Los administradores tienen la autoridad para ver la lista de usuarios registrados y modificar o eliminar sus datos según sea necesario.</li>
            </ul>
          </ul>
        </ul>
        <ul>
          <li><h2>Sección de Contactos:</h2></li>
          <ul>
            <ul>
              <li>Los usuarios, tanto registrados como no registrados, pueden acceder a esta sección.</li>
              <li>Permite enviar consultas por correo electrónico al administrador.</li>
            </ul>
          </ul>
        </ul>
        <ul>
          <li><h2>Despliegue:</h2></li>
          <ul>

            <li>El proyecto actualmente está desplegado localmente para pruebas y desarrollo.</li>
            <li>No se ha realizado el despliegue en un entorno de producción.</li>
          </ul>
        </ul>
      </div >
    </div >
  );
}
