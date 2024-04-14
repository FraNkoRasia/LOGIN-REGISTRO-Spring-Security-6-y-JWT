import React from 'react';


export default function Home() {
  return (
    <div className="container">

      <h1 className='titulo-home'>PLAYCODE</h1>
      <div className='userInfo'>
        <ul>
          <li><h2>Tecnologías Utilizadas:</h2></li>
          <ul>

            <li><h2>Backend:</h2></li>
            <ul>
              <li>Java Spring con Maven: Esto representa la estructura principal del servidor,
                manejando todo desde la lógica del negocio hasta las dependencias del proyecto.</li>
              <li>MySQL: Es como el armario donde guardo todos los datos de la aplicación,
                y lo hace de manera muy ordenada y fácil de manejar.</li>
              <li>Autenticación y Manejo de Sesión con JWT: Para mantener todo seguro y protegido,
                usé JSON Web Tokens para la autenticación y para asegurarme de que las sesiones de usuario sean seguras.</li>
            </ul>
            <br />
            <li><h2>Frontend:</h2></li>
            <ul>
              <li>ReactJS: Aquí es donde se desarrolla la parte visual de la aplicación. ReactJS me permitió crear
                una interfaz de usuario interactiva y atractiva, ofreciendo una experiencia fluida para los usuarios.</li>
              <li>CSS: Bueno, sin CSS, todo se vería bastante feo, ¿verdad? Usé CSS para darle estilo a la aplicación y
                hacerla lucir profesional y moderna.</li>

            </ul>
            <br />
            <li><h2>Herramientas Adicionales:</h2></li>
            <ul>
              <li>Postman: Esto fue súper útil durante el desarrollo. Me permitió probar todas las partes de mi API REST
                para asegurarme de que funcionaran correctamente y de que la aplicación estuviera haciendo lo que se
                suponía que debía hacer.</li>
            </ul>
            <br />
            <li><h2>Objetivo del Proyecto:</h2></li>
            <ul>
              <li>En resumen, este proyecto tiene como objetivo crear una aplicación web completa y funcional que sea fácil
                de usar y segura para los usuarios. Quiero que la gente pueda interactuar con ella de manera intuitiva y
                sin preocuparse por la seguridad de sus datos</li>
            </ul>
          </ul>
        </ul>
      </div>
    </div >
  );
}
