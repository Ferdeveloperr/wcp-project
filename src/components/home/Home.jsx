import React from 'react'
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import wcp_logo_t1 from '../image/wcp_logo_t1.png'


const Home = () => {

    //FETCH CON URL DEL BACKEND

    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = async (data) => {
        try {
            // Realiza la solicitud al API endpoint
            const response = await fetch('https://worldplus.com.ar/signin', {
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



                // ***********************************
                // *  TOKEN GUARDADO SESSION STORAGE *
                // * *********************************


                sessionStorage.setItem('token', token.token);



            } else {
                // Autenticación fallida
                console.error('Autenticación fallida:', response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la autenticación:', error);
        }
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
            <div id='containerTop'>
                <p className='titleDif'>WORLDPLUS</p>
            </div>

            <div className="app-container">
                {/* LANDING PAGE */}


                <header className="container">
                    <img src={wcp_logo_t1} alt="logo" style={{ borderRadius: '100px', marginTop: '20px' }} />
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
                        <p className="mainP">Registrate y comenza a invertir con nosotros! </p>
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

                            <button type="submit" className="btn btn-dark btn-lg mb-3" onClick={(evento) => handleClick(evento, '/UserArea')}>Ingresar</button>

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
            </div>
        </>
    )
}

export default Home;