import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserEditForm from './UserEditForm';
import apiUrl from '../Components/ApiUrl/apiURL';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    lastname: '',
    passport: '',
    phone: '',
    role: ''
  });

  const getUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users`);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleModifyUser = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/users/${userId}`);
      const userData = response.data;
      setEditingUser(userData);
      setFormData(userData);
    } catch (error) {
      console.error('Usuario con ID:', userId, 'Error al obtener los detalles para modificarlo', error);
    }
  };

  const handleFormSubmit = async (updatedUser) => {
    try {
      await axios.put(`${apiUrl}/users/${updatedUser.id}`, updatedUser);
      console.log('Usuario modificado con éxito');
      getUsers(); // Actualizar la lista de usuarios después de la modificación
      setEditingUser(null);
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
    }
  };
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${apiUrl}/users/${userId}`);
      console.log('Usuario eliminado con éxito');
      // Actualizar la lista de usuarios después de la eliminación
      getUsers();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div className='container'>
      <h1 className='titulo-listaUsuario'>Lista de Usuarios</h1>
      <table className="table-large">
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Documento</th>
            <th>Telefono</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className={user.deleted ? 'deleted' : ''}>
              <td data-titulo="ID Usuario">{user.id}</td>
              <td data-titulo="Email">{user.username}</td>
              <td data-titulo="Nombre">{user.name}</td>
              <td data-titulo="Apellido">{user.lastname}</td>
              <td data-titulo="Documento">{user.passport}</td>
              <td data-titulo="Telefono">{user.phone}</td>
              <td data-titulo="Rol">{user.role}</td>
              <td className='botones'>
                <button className='btn-modificar' onClick={() => handleModifyUser(user.id)}>Modificar</button>
                <button className='btn-eliminar' onClick={() => handleDeleteUser(user.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <UserEditForm user={editingUser} onClose={() => setEditingUser(null)} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default UserList;
