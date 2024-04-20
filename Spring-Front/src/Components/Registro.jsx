import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import apiUrl from '../Components/ApiUrl/apiURL';

export default function Registro() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    username: '',
    password: '',
    repitePassword: '',
    passport: '',
    phone: ''
  });

  const [passwordError, setPasswordError] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repitePassword) {
      setPasswordError('Las contraseñas no coinciden');
       setTimeout(() => setPasswordError(''), 5000); // Limpiar el mensaje de error después de 5 segundos
      return;
    } else {
      setPasswordError('');
    }

    try {
      const response = await axios.post(`${apiUrl}/registro`, formData);
      console.log(response.data); // Manejar la respuesta del backend según sea necesario
      setRegistrationMessage('Registro Exitoso');
       setTimeout(() => setRegistrationMessage(''), 5000); // Limpiar el mensaje de registro después de 5 segundos
    } catch (error) {
      console.error('Error al registrar: Email en uso', error);
      setRegistrationMessage('El Email ya se encuentra Registrado');
         setTimeout(() => setRegistrationMessage(''), 5000); // Limpiar el mensaje de registro después de 5 segundos
    }
  };

  return (

    <div className="contenedor-registro">
      <form className="formularioRegistro" onSubmit={handleSubmit}>
        <h1 className='titulo'>Registro</h1>
        <div className="nombre-apellido">
          <div className="input-pair">
            <label htmlFor="name">Nombre </label>
            <input type="text" name="name" id="name" placeholder="Ingresa tu nombre" onChange={handleChange} required />
          </div>
          <div className="input-pair">
            <label htmlFor="lastname">Apellido </label>
            <input type="text" name="lastname" id="lastname" placeholder="Ingresa tu apellido" onChange={handleChange} required />
          </div>
        </div>
        <div className='input-email'>
          <label htmlFor="username">Email </label>
          <input type="email" name="username" id="username" placeholder="Ingresa tu email" onChange={handleChange} required />
        </div>
        <div className="passwords">
          <div className="input-pair">
            <label htmlFor="password">Contraseña </label>
            <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" onChange={handleChange} required />
          </div>
          <div className="input-pair">
            <label htmlFor="repitePassword">Repite tu contraseña </label>
            <input type="password" name="repitePassword" id="repitePassword" placeholder="Repite tu contraseña" onChange={handleChange} required />

          </div>
        </div>
        <div className="documento-pais">
          <div className="input-pair">
            <label htmlFor="passport">Documento </label>
            <input type="number" name="passport" id="passport" placeholder="Ingresa tu documento" onChange={handleChange} required />
          </div>
          <div className="input-pair">
            <label htmlFor="phone">Telefono </label>
            <input type="text" name="phone" id="phone" placeholder="Ingresa tu teléfono" onChange={handleChange} required />
          </div>
        </div>
        <button type="submit">Registrar</button>
        <p className='tienes-cuenta'>¿Ya tienes una cuenta? =&gt; <Link to="/login">Login</Link></p>
      </form>
      <div className='container'>
        {passwordError && <p className="error-message">{passwordError}</p>}
        {registrationMessage && <p className={`registration-message ${registrationMessage === 'Registro Exitoso' ? 'success' : 'error'}`}>{registrationMessage}</p>}
      </div>
    </div>
  );
}
