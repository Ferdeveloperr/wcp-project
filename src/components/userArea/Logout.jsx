import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {
    useEffect(() => {
        const logoutUser = async () => {
            try {
                // Realizar la solicitud al backend para desloguear al usuario
                const response = await fetch('https://tu-api-endpoint.com/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',

                    },

                });

                // Verificar si la solicitud fue exitosa
                if (response.ok) {
                    console.log('Usuario deslogueado exitosamente');
                } else {
                    console.error('Error al desloguear al usuario:', response.statusText);
                }
            } catch (error) {
                console.error('Error inesperado:', error);
            }
        };

        // Llamar a la función de deslogueo cuando el componente se monte
        logoutUser();
    }, []);


    return (
        <div>
            <h1>
                Su sesion ha expirado
            </h1>

            <Link to="/Home">Ir al home</Link>
        </div>
    )
}

export default Logout