import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import apiUrl from '../Components/ApiUrl/apiURL';


// Login page

export default function Login({ setUser }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === "" || password === "") {
            setError("Username and password are required.");
            return;
        }
        setError("");

        try {
            const response = await axios.post(
                `${apiUrl}/auth/authenticate`, // Corrección aquí
                {
                    username: name,
                    password,
                }
            );
            if (response.status === 200) {
                const { jwt } = response.data;
                localStorage.setItem("token", jwt);
                setUser(jwtDecode(jwt));
                navigate('/dashboard');
            } else {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            setError("Invalid username or password.");
            console.error("Error:", error);
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        navigate('/forgot-password');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setError("");
        }, 5000);

        return () => clearTimeout(timer);
    }, [error]);

    return (
        <div className="contenedor-login">
            <form className="formularioLogin" onSubmit={handleSubmit}>
                <h1 className='titulo'>Login</h1>

                <div className="label-login">
                    <label>Usuario</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Username" />
                </div>
                <div className="label-login">
                    <label>Contraseña</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />
                </div>
                <button type="submit">Iniciar Sesión</button>
                <br />
                <a className="Olvidaste" href="#" onClick={handleForgotPassword}>
                    ¿Has olvidado tu contraseña?</a>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}
