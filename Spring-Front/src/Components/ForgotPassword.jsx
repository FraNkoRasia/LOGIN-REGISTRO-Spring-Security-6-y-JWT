import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../Components/ApiUrl/apiURL';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/users/forgot-password`, { email });
            setSuccessMessage(response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div className="container">
        
            <form onSubmit={handleSubmit}>
                <h1 className='Titulo-RestablecerContraseña'>Restablecer Contraseña</h1>
                <label id="colorwhite">
                    Correo Electrónico:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    placeholder='Ingresa tu Email'/>
                </label>
                <button id="boton" type="submit">Enviar Solicitud</button>
            </form>
            {successMessage && <p id="successMessage">{successMessage}</p>}
            {errorMessage && <p id="errorMessage">{errorMessage}</p>}
        </div>
    );

}

export default ForgotPassword;
