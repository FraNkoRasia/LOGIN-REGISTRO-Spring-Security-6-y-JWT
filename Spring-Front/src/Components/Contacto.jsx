import React, { useState } from 'react';
import axios from 'axios';
import apiUrl from '../Components/ApiUrl/apiURL';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
            await axios.post(`${apiUrl}/message/contact`, formData);
            console.log('Mensaje enviado con éxito');
            setSuccessMessage('Message sent successfully!');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setErrorMessage('');
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            setErrorMessage('Error sending message. Please try again later.');
            setSuccessMessage('');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    return (
        <div>
            <h1 className='titulo-contacto'>Contacta con Nosotros</h1>

            <form onSubmit={handleFormSubmit}>
                <label id="labelcontacto" htmlFor="name" >Nombre: </label>
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleFormChange} />
                <label id="labelcontacto" htmlFor="Email" >Email: </label>
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleFormChange} />
                <label id="labelcontacto" htmlFor="name" >Asunto: </label>
                <input type="text" name="subject" placeholder="Reason" value={formData.subject} onChange={handleFormChange} />
                <label id="labelcontacto" htmlFor="name" >Mensaje: </label>
                <textarea name="message" placeholder="Your Message" onChange={handleFormChange} value={formData.message} rows={10} style={{ width: '98.5%' }} />

                <button className='botonContacto' type="submit">Enviar</button>
                {successMessage && <p id="succesmessage" >{successMessage}</p>}
                {errorMessage  && <p id="errormessage">{errorMessage}</p>}
            </form>

        </div>
    );
};

export default ContactForm;
