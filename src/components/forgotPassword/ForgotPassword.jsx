import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logoPruebaa from '../image/logoPruebaa.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://worldplus.com.ar/forget-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message); // Muestra el mensaje del servidor
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error inesperado:', error);
            setMessage('Error inesperado. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <Link to="/Home" className="btn btn-dark btn-sm">
                Home
            </Link>

            <header className="container">
                <img src={logoPruebaa} alt="" />
            </header>

            <section className="containerRegistro">
                <div>
                    <h1 className="tituloRegistro">
                        Olvidaste tu contraseña?
                    </h1>
                </div>

                <div>
                    <h4>
                        Ingresa tu email para enviarte las instrucciones y así poder recuperar tu contraseña
                    </h4>
                </div>
            </section>

            <section className="button-section">
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <label htmlFor="floatingInput"></label>
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Ingrese su dirección de correo electrónico"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg">
                        Cambiar contraseña
                    </button>
                </form>

                {message && <p>{message}</p>}
            </section>
        </div>
    );
};

export default ForgotPassword;

