
import React from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import usuarioGenericoDos from '../image/usuarioGenericoDos.png';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';




const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    const onSubmit = async (data) => {
        try {
            // Realizar la solicitud al backend
            const response = await fetch('https://worldplus.com.ar/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Verificar si la solicitud fue exitosa
            if (response.ok) {
                const token = await response.json();
                console.log('Datos enviados al backend:', token);




                // ***********************************
                // *  TOKEN GUARDADO SESSION STORAGE *
                // * *********************************


                sessionStorage.setItem('token', token.token);



                // Alerta de creacion de usuario exitoso
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'Se ha registrado correctamente',
                });

            } else {
                console.error('Error al enviar los datos al backend:', response.statusText);
            }
        } catch (error) {
            console.error('Error inesperado:', error);
        }



        reset();

    };




    // let saved_token = sessionStorage.getItem('token');
    // let tkn = 'Bearer ' + saved_token;

    // const navigate = useNavigate();

    // const handleClick = async (e, pagina) => {
    //     e.preventDefault;
    //     try {
    //         await fetch('http://localhost:8000/refresh-token', {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': tkn,
    //                 'Content-Type': 'application/json',
    //             },
    //         }).then((response) => {
    //             if (response.status == 200) {
    //                 response.json().then((res) => {
    //                     let token = res.access_token;
    //                     sessionStorage.setItem('token', token);
    //                 })
    //             } else {
    //                 navigate('/403');
    //             }
    //         })
    //             .then(() => {
    //                 navigate(pagina);
    //             })
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }


    return (
        <>
            <div className="back-link">
                <Link to="/Home" className="btn btn-dark btn-sm">Home</Link>
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
                            {...register('firstName',)}
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
                            {...register('lastName',)}
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

                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                            <label className="form-check-label" htmlFor="invalidCheck">
                                Acepto los terminos y condiciones
                            </label>
                            <div className="invalid-feedback">
                                You must agree before submitting.
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg mb-3" >Registrarse</button>
                </form>
            </section>

            <section className="verifySign">

                <p>Verifica tu casilla de correo para confirmar la cuenta</p>

            </section>
        </>
    );
};

export default SignUp;
