import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
/* IMPORTACION DE COMPONENTES (VISTAS) */
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Login from './Components/Login';
import Registro from './Components/Registro';
import Perfil from './Components/Perfil';
import Contacto from './Components/Contacto';
import EditPassword from './Components/EditPassword';
import ForgotPassword from './Components/ForgotPassword';
import ResetPasswordForm from './Components/ResetPasswordForm';
import ProtectedRoute from './Components/ProtectedRoute';
import Footer from './Components/Footer';
import UserList from './Components/ListaUsuarios';

import { useLocalStorage } from 'react-use';
import { jwtDecode } from 'jwt-decode';



function App() {
  const [user, setUser] = useLocalStorage('user');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);


  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        {/*RUTAS PARA USUARIOS NO LOGUEADOS Y LOGUEADOS*/}
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/" element={<Home />} />

        {/* RUTAS PROTEGIDAS - PARA USUARIOS LOGUEADOS */}
        <Route element={<ProtectedRoute canActivate={user} />}> {/* PROTECCION DE RUTA ACTIVADA */}
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/perfil" element={<Perfil user={user} />} />
          <Route path="/editPassword" element={<EditPassword user={user} />} />
          <Route path="/lista-usuarios" element={<UserList user={user} />} />
        </Route>

        {/* RUTAS PROTEGIDAS - PARA USUARIOS NO LOGUEADOS */}
        <Route element={<ProtectedRoute canActivate={!user} />}> {/* PROTECCION DE RUTA ACTIVADA */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPasswordForm />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
