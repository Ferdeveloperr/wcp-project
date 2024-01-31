import React from 'react'
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import LogoFinalWcp from '../image/LogoFinalWcp.jpeg';



const Home = () => {




    //FETCH CON URL DEL BACKEND


    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = async (data) => {
        try {
            // Realiza la solicitud al API endpoint
            const response = await fetch('https://tu-api-endpoint.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Autenticación exitosa, realiza las acciones necesarias
                const responseData = await response.json();
                console.log('Autenticación exitosa:', responseData);
            } else {
                // Autenticación fallida
                console.error('Autenticación fallida:', response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la autenticación:', error);
        }
    };


    // analisis tecnico super explicado
    // analisis fundamental noticias, volumenes, deuda, si pagan terminos, diviendo

    return (
        <>
            {/* LANDING PAGE */}
            <div className="containerTop">
                <p>WORLDPLUS</p>
            </div>

            <header className="container">
                <img src={LogoFinalWcp} alt="logo" style={{ borderRadius: '180px', marginTop: '20px' }} />
            </header>

            {/* SECTION CREAR CUENTA */}
            <section>
                <div className="mainButton">
                    <h1 className="d-flex justify-content-center">
                        <div className="d-grid gap-2">
                            <Link to="/SignUp" className="btn btn-dark btn-lg custom-btn-width">Crear Cuenta</Link>
                        </div>
                    </h1>
                </div>

                <div className="mainText">
                    <p className="mainP">Registrate y obtene tus 10 monedas extra </p>
                </div>
            </section>

            {/* ZONA DE USUARIOS */}
            <section>
                <h3 className="userZone">Usuarios</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

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
                    <div className="row justify-content-center">
                        <button type="submit" className="btn btn-dark btn-lg mb-3">Ingresar</button>
                    </div>
                </form>

                <div className="buttonFormMain">
                    <Link to="/UserArea" className="btn btn-dark btn-lg">Visitante</Link>
                </div>
            </section>

            {/* OPCIONES ADICIONALES */}
            <section className="button-section">
                <label className="checkbox-label-index">
                    <input type="checkbox" /> Recordarme
                </label>

                <a href="/ForgotPassword" className="btn btn-dark btn-lg">Olvidaste tu contraseña</a>
            </section>

            <div className="divAdmin">
                <p>
                    <Link to="/UserAreaConsultant" className="btn btn-dark btn-sm">Admin</Link>
                </p>
            </div>
        </>
    )
}

export default Home;