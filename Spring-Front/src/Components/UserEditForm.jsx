import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../Components/ApiUrl/apiURL';

const UserEditForm = ({ user, onClose }) => {
    const [formData, setFormData] = useState({
        username: user.username || '',
        name: user.name || '',
        lastname: user.lastname || '',
        passport: user.passport || '',
        phone: user.phone || '',
        role: user.role || ''
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${apiUrl}/users/${user.id}`, formData);
            console.log('Usuario modificado con éxito');
            onClose(); // Cerrar el formulario después de la modificación
            window.location.reload(); // Actualizar la página después de guardar los cambios
        } catch (error) {
            console.error('Error al modificar el usuario:', error);
        }
    };

    const handleCancel = () => {
        onClose(); // Cierra el modal sin guardar cambios
    };

    return (
        <div className="modal">
            <form onSubmit={handleFormSubmit}>
                <h1 className='titulo-editUser' align="center">Modificar Usuario</h1>
                <label id="labelEdit" htmlFor="username" >Email: </label>
                <input className='input' type="email" name="username" value={formData.username} onChange={handleFormChange} />
                <label id="labelEdit" htmlFor="name" >Nombre:</label>
                <input className='input' type="text" name="name" value={formData.name} onChange={handleFormChange} />
                <label id="labelEdit" htmlFor="lastname" >Apellido:</label>
                <input className='input' type="text" name="lastname" value={formData.lastname} onChange={handleFormChange} />
                <label id="labelEdit" htmlFor="email" >Documento:</label>
                <input className='input' type="number" name="passport" value={formData.passport} onChange={handleFormChange} />
                <label id="labelEdit" htmlFor="phone" >Telefono:</label>
                <input className='input' type="number" name="phone" value={formData.phone} onChange={handleFormChange} />
                <label id="labelEdit" htmlFor="selectRole" >Rol:</label>
                <select name="role" value={formData.role} onChange={handleFormChange}>
                    <option id="role" value="">-- Seleccionar Rol --</option>
                    <option id="role" value="ADMINISTRATOR">ADMINISTRATOR</option>
                    <option id="role" value="CUSTOMER">CUSTOMER</option>
                </select>
                <button id='btn-guardar' type="submit">Guardar Cambios</button>
                <button id='btn-cancelar' type="button" onClick={handleCancel}>Cancelar</button>
            </form>
        </div>
    );
};

export default UserEditForm;
