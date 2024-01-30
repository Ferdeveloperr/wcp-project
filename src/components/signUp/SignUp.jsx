import React from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import usuarioGenericoDos from '../image/usuarioGenericoDos.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            // Realizar la solicitud al backend
            const response = await fetch('https://tu-api-endpoint.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                const responseData = await response.json();
                console.log('Datos enviados al backend:', responseData);
            } else {
                console.error('Error al enviar los datos al backend:', response.statusText);
            }
        } catch (error) {
            console.error('Error inesperado:', error);
        }

        reset();
    };


    return (
        <>
            <div className="back-link">
                <Link to="/Home" className="btn btn-info btn-sm">Home</Link>
            </div>

            <header className="container">
                <img src={usuarioGenericoDos} alt="logo" />
            </header>

            <section className="containerRegistro">
                <h1 className="tituloRegistro"><b>Registrate</b></h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-floating mb-3">
                        <label htmlFor="floatingText"><b>Nombre</b></label>
                        <input
                            type="text"
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            id="floatingText"
                            placeholder="Ingrese su nombre"
                        // {...register('firstName', { required: 'Este campo es requerido' })}
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
                    </div>

                    <div className="form-floating mb-3">
                        <label htmlFor="floatingTextSurname"><b>Apellido</b></label>
                        <input
                            type="text"
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            id="floatingTextSurname"
                            placeholder="Ingrese su nombre y apellido"
                        // {...register('lastName', { required: 'Este campo es requerido' })}
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                    </div>

                    <div className="form-floating mb-3">
                        <label htmlFor="floatingPhone"><b>Telefono</b></label>
                        <input
                            type="tel" // Utiliza el tipo "tel" para campos de número de teléfono
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            id="floatingPhone"
                            placeholder="Telefono"
                            {...register('phone', {
                                required: 'Este campo es requerido',
                                pattern: {
                                    value: /^\d{10}$/i,
                                    message: 'Ingrese un número de teléfono válido (10 dígitos)'
                                }
                            })}

                        />
                        {errors.tel && <div className="invalid-feedback">Este campo es requerido.</div>}
                    </div>



                    {/* Resto de los campos con la misma lógica para agregar validaciones */}

                    <div className="form-floating mb-3">
                        <label htmlFor="floatingInput"><b>Email</b></label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="floatingInput"
                            placeholder="Ingrese su direccion de correo electronico"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <div className="invalid-feedback">Este campo es requerido.</div>}
                    </div>

                    <div className="form-floating mb-3">
                        <label htmlFor="floatingPassword"><b>Contraseña</b></label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="floatingPassword"
                            placeholder="Ingrese su contraseña"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <div className="invalid-feedback">Este campo es requerido.</div>}
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg">Enviar</button>
                </form>
            </section>

            <section className="button-section">
                <label className="checkbox-label">
                    <input type="checkbox" /> ACEPTO LOS TERMINOS Y CONDICIONES
                </label>

                <Link to="/Home" className="btn btn-dark btn-lg">Ya tienes una cuenta? Ingresa</Link>

            </section>
        </>
    );
};

export default SignUp;
