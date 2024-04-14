import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import apiUrl from '../Components/ApiUrl/apiURL';

export default function Perfil({ user }) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [passport, setPassport] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const navigate = useNavigate(); // Obtiene la función de navegación

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`${apiUrl}/users/${user.userId}/modifyProfile`, {
        currentPassword: currentPassword,
        name: name,
        lastname: lastname,
        username: username,
        phone: phone,
        passport: passport
      });
      console.log(response.data);
      alert("Perfil modificado exitosamente");
      navigate('/dashboard'); // Redirige al usuario a la página de inicio del dashboard
      // Aquí podrías redirigir al usuario a otra página o realizar cualquier otra acción necesaria después de modificar la contraseña
    } catch (error) {
      console.error(error);
      alert("Error al modificar el Perfil");
    }
  };
  return (

    <div className="container">

      <form className='perfil' onSubmit={handleSubmit}>
        <h1 className='titulo-formulario' align="center" >Modifica tu Perfil</h1>

        <div>
          <label htmlFor="name" class="form-label">Nombre</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name' />
        </div>

        <div>
          <label htmlFor="lastname" class="form-label">Apellido</label>
          <input type="text" name="lastname" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder='Your Lastname' />
        </div>

        <div>
          <label htmlFor="username">Email</label>
          <input type="email" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your Email" />
        </div>

        <div>
          <label htmlFor="phone" class="form-label">Telefono</label>
          <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Your Phone' />
        </div>

        <div>
          <label htmlFor="passport" class="form-label">Documento</label>
          <input type="text" name="passport" id="passport" value={passport} onChange={(e) => setPassport(e.target.value)} placeholder='Your Passport' />
        </div>

        <div>
          <label htmlFor="currentPassword" class="form-label" >Introducir la contraseña actual</label>
          <input type="password" name="currentPassword" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Ingresar contraseña Actual" required />
        </div>

        <div className='botonPerfil'>
          <button type="submit">Modificar</button>
        </div>

      </form>
    </div>


  );
}
