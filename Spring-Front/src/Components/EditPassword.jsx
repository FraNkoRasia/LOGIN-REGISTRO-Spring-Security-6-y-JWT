import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import apiUrl from '../Components/ApiUrl/apiURL';

export default function EditPassword({ user }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const navigate = useNavigate(); // Obtiene la función de navegación

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== newPassword2) {
            alert("Las nuevas contraseñas no coinciden");
            return;
        }

        try {
            const response = await axios.put(`${apiUrl}/users/${user.userId}/password`, {
                currentPassword: currentPassword,
                newPassword: newPassword
            });
            console.log(response.data);
            alert("Contraseña modificada exitosamente");
            navigate('/dashboard'); // Redirige al usuario a la página de inicio del dashboard
            // Aquí podrías redirigir al usuario a otra página o realizar cualquier otra acción necesaria después de modificar la contraseña
        } catch (error) {
            console.error(error);
            alert("Error al modificar la contraseña");
        }
    };


    return (
        <div className="container">

            <form className='formEditPassword' onSubmit={handleSubmit}>
                <h1 className='titulo-formulario' align="center">Modificar Contraseña</h1>
                <div>
                    <label htmlFor="currentPassword" className="form-label">Contraseña actual</label>
                    <input type="password" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Ingresa tu contraseña Actual" className="form-control" id="currentPassword" required />
                </div>
                <div>
                    <label htmlFor="newPassword" className="form-label">Introduzca su nueva contraseña</label>
                    <input type='password' name='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Ingresa tu nueva Password" className="form-control" id="newPassword" minLength="6" />
                </div>
                <div>
                    <label htmlFor="newPassword2" className="form-label">Repita su nueva contraseña</label>
                    <input type="password" name='newPassword2' value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} placeholder="Repite tu nueva Password" className="form-control" id="newPassword2" minLength="6" />
                </div>
                <div className='botonEdit'>
                    <button type="submit" className="btn btn-dark">Modificar</button>
                </div>
            </form>
        </div>
    );
}
