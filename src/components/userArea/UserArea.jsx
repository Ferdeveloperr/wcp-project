import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logoWorldcoinApi from '../image/logoWorldcoinApi.png';
import logoBitcoinDos from '../image/logoBitcoinDos.png';
import EthereumLogoWine from '../image/EthereumLogoWine.png';
import AlejoValentina from '../image/AlejoValentina.mp4';
import tutorialWld from '../image/tutorialWld.mp4';
import LogoFinalWcp from '../image/LogoFinalWcp.jpeg';
import { Link } from 'react-router-dom';
import check from '../image/check.png';
import Swal from 'sweetalert2';
import videoPruebaaa from '../image/videoPruebaaa.mp4'
import { convertirSegundosAHorasMinutosSegundos } from '../userArea/timer';

const UserArea = () => {
    const [cantidadMonedas, setCantidadMonedas] = useState(0);
    const inputCantidadRef = useRef(null);
    const [tiempoRestante, setTiempoRestante] = useState(() => {
        const tiempoGuardado = localStorage.getItem('tiempoRestante');
        return tiempoGuardado ? parseInt(tiempoGuardado, 10) : 0;
    });


    const mostrarCantidad = () => {
        const inputCantidad = inputCantidadRef.current;
        const cantidad = inputCantidad.value.trim();

        if (!isNaN(cantidad) && cantidad > 0) {
            setCantidadMonedas(cantidad);
            exito();

            // Inicia el temporizador después de confirmar la operación
            startTimer();
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Ingrese una cantidad válida de monedas',
                icon: 'error',
            });
        }
    };

    const copiarLink = () => {
        const url = '0x3129bdddaa67f1c0430e525cccc4f9ee8b8ca898';

        navigator.clipboard.writeText(url)
            .then(() => {
                Swal.fire('Link copiado!', 'El link ha sido copiado correctamente.', 'success');
            })
            .catch((error) => {
                console.error('Error al intentar copiar al portapapeles:', error);

                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo copiar el link al portapapeles',
                    icon: 'error',
                });
            });
    };

    const exito = () => {
        Swal.fire({
            title: 'Confirmar Operacion.',
            html: `
                <img src=${check} alt="imagenDeUsuario" class="mb-3" />
                
                <p class="mb-1 fs-5">Rendimiento: 10WLD</p>
                <p class="mb-1 fs-5">Bono: Quincenalmente</p>
            `,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Copiar link',
            cancelButtonText: 'Cerrar',
        }).then((result) => {
            if (result.isConfirmed) {
                copiarLink();
            }
        });
    };

    const startTimer = () => {
        // Inicia el temporizador solo si no está activo
        if (tiempoRestante === 0) {
            // Establece el tiempo total a 72 horas en segundos
            const tiempoTotal = 72 * 60 * 60;

            // Actualiza el estado con el tiempo restante
            setTiempoRestante(tiempoTotal);

            // Configura el temporizador
            const intervalId = setInterval(() => {
                setTiempoRestante((prevTiempo) => {
                    const nuevoTiempo = prevTiempo - 1;

                    // Almacena el tiempo restante en el localStorage
                    localStorage.setItem('tiempoRestante', nuevoTiempo);

                    return nuevoTiempo;
                });
            }, 1000);

            // Limpia el temporizador cuando el componente se desmonta
            return () => clearInterval(intervalId);
        }
    };


    useEffect(() => {
        // Obtiene el tiempo restante del localStorage al cargar el componente
        const tiempoGuardado = localStorage.getItem('tiempoRestante');

        if (tiempoGuardado) {
            setTiempoRestante(parseInt(tiempoGuardado, 10));
        }
    }, []);


    useEffect(() => {
        // Almacenar en el localStorage cada vez que el tiempoRestante cambie
        localStorage.setItem('tiempoRestante', tiempoRestante.toString());
    }, [tiempoRestante]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cworldcoin&vs_currencies=usd"
                );
                const data = await response.json();

                document.getElementById("bitcoin").innerHTML = data.bitcoin.usd;
                document.getElementById("ethereum").innerHTML = data.ethereum.usd;
                document.getElementById("worldcoin").innerHTML = data.worldcoin.usd;
            } catch (error) {
                console.error("Error fetching crypto prices:", error);
            }
        };

        fetchData();
    }, []);

    const handleVerificationTime = () => {
        // Inicia manualmente el temporizador al hacer clic en el botón
        startTimer();
    };

    const handleTransactionId = () => {
        const idTransaccion = document.getElementById('transaccionId').value.trim();

        if (idTransaccion === '') {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, ingrese el ID de Transacción',
                icon: 'error',
            });
        } else {
            Swal.fire({
                title: 'Éxito',
                text: 'Ha ingresado su ID de transacción correctamente',
                icon: 'success',
            });
        }
    };

    return (
        <div>
            {/* U S E R  A R E A */}
            <header className="userHeader">
                {/* Agregamos el nav */}
                <nav className="navbar navbar-expand-lg bg-black border-bottom border-bottom-dark" data-bs-theme="dark">
                    <div className="container-fluid">
                        <a href="/Home" className="Logo">
                            <img src={LogoFinalWcp} alt="Logo" height="70px" width="70px" />
                        </a>
                        <div className="logoStyle">
                            <a className="navbar-brand" href="/UserArea">
                                WorldPlus
                            </a>
                        </div>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="index.html"></a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Terms" className="nav-link">Terminos y condiciones</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/WalletList" className="nav-link">Mis Billeteras</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/UserInfo" className="nav-link">Info de usuario</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/AccountConfirmation" className="nav-link">Confirmar email</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/ForgotPassword" className="nav-link">Recuperar contraseña</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#footerSection">
                                        Pie de pagina
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Logout" className="nav-link">Cerrar Sesion</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            {/* SECCION DE TITULO Y SUBTITLO */}
            <section className="titleSection">

                <div>
                    <h1>
                        ¡Bienvenido!
                    </h1>
                </div>
                <div>
                    <h4>
                        En el video a continuacion encontrara los pasos a seguir
                    </h4>
                </div>
            </section>

            <div className="videoStyle">
                <video src={videoPruebaaa} controls width="300"></video>
            </div>

            {/* Linea divisoria */}
            <hr className="custom-hr" />

            <section>
                <div className="user-area">
                    <h4 className="tittleUserArea">Ingrese la cantidad de monedas que utilizará para ver sus ganancias</h4>
                    <div className="form-floating mb-3 d-flex flex-column align-items-center">
                        <label htmlFor="floatingNumberr"></label>
                        <input
                            type="number"
                            className="form-control"
                            id="floatingNumberr"
                            placeholder="Ingrese la cantidad de monedas"
                            ref={inputCantidadRef}
                        />
                    </div>
                </div>

                {/* Button trigger modal */}
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-success btn-lg mt-2 w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={mostrarCantidad}
                    >
                        OK
                    </button>
                </div>

                {/* Modal  */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Operacion confirmada.
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body d-flex align-items-center justify-content-center">
                                <div className="text-center">
                                    <img src={check} alt="imagenDeUsuario" className="mb-3" />
                                    <p className="mb-1 fs-5">
                                        La cantidad ingresada es: <span id="cantidadMonedas">{cantidadMonedas}</span> WLD
                                    </p>
                                    <p className="mb-1 fs-5">Rendimiento: 10WLD</p>
                                    <p className="mb-1 fs-5">Bonos: Quincenalmente</p>
                                </div>
                            </div>
                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Cerrar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    id="copiarLinkBtn"
                                    onClick={copiarLink}
                                >
                                    Copiar link
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>



            <section className='UserAreaSectionText'>

                <br></br>
                <h4 className="tittleUserArea">Ingrese ID de transaccion</h4>
                <div className="form-floating mb-3 d-flex flex-column align-items-center">
                    <label htmlFor="floatingNumberr"></label>
                    <input type="text" className="form-control" id="transaccionId"
                        placeholder="Ingrese la dirección de su wallet" />
                </div>

                <button
                    type="button"
                    className="btn btn-success btn-lg mt-2 w-100"
                    onClick={handleTransactionId}
                >
                    OK
                </button>

            </section>



            {/* SECCION DE TIMER */}



            <div className='timerEstatico'>
                <h2 className='tituloEstatico'>
                    Tiempo estimado de procesamiento
                </h2>



                <h5>
                    El tiempo estimado que demora su transaccion sera de 3 a 5 dias habiles
                </h5>

                <br />

                <h6>Tenga en cuenta que si no se registra Operacion realizada el tiempo estimado queda sin efecto</h6>
            </div>





            {/* SECCION INGRESO WALLET */}




            <div className="walletStyle">
                <h3>
                    Recuerde ingresar su wallet en el menu superior dentro de la seccion "Mis Billeteras"
                </h3>

                <div className="walletStyleImg">
                    <img src={logoWorldcoinApi} alt="" />
                </div>
            </div>

            <hr className="custom-hr"></hr>

            {/* SECCION DE COTIZACIONES DE CRYPTO */}
            <div>
                <h3 className="TextCotizacion">Cotizacion cripto</h3>
            </div>
            <section className="sectionCrypto">
                <div className="containerCrypto">
                    <div className="coin-price">
                        <div className="log"><img src={logoBitcoinDos} alt="Bitcoin" height="150px" width="150px" /></div>
                        <div>
                            <h1> $<span id="bitcoin"></span></h1>
                            <h1>Bitcoin</h1>
                        </div>
                    </div>

                    <div className="coin-price">
                        <div className="log"><img src={EthereumLogoWine} alt="Ethereum" height="150px" width="150px" /></div>
                        <div>
                            <h1> $<span id="ethereum"></span></h1>
                            <h1>Ethereum</h1>
                        </div>
                    </div>

                    <div className="coin-price">
                        <div className="img-responsive"><img src={logoWorldcoinApi} alt="Worldcoin" height="60px" width="60px" /></div>
                        <div>
                            <h1> $<span id="worldcoin"></span></h1>
                            <h1>Worldcoin</h1>
                        </div>
                    </div>
                </div>
            </section>




            {/* SECCION DE VIDEO TUTORIAL */}
            <hr className="custom-hr" />


            <section className="titleSectionDos">
                <h2>
                    Tutorial para cambiar tus criptomonedas
                </h2>

                <br />

                <h5>
                    Siga los pasos que se muestran en el video a continuacion
                </h5>

            </section>


            <div className="videoStyle">
                <video src={tutorialWld} controls width="300"></video>
            </div>

            <hr className="custom-hr" />
            {/* F O O T E R  */}

            <section id="footerSection">
                <footer className="bg-black text-white py-4 mt-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <p><a href="/Terms" target="_blank" className="text-white">Términos y Condiciones</a></p>
                            </div>
                            <div className="col-lg-4">
                                <p>Derechos Reservados &copy; 2024 WorldPlus</p>
                            </div>
                            <div className="col-lg-4">
                                <p><a href="https://wa.me/tunumero" className="text-white" target="_blank">Área de Soporte
                                </a></p>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>


        </div>



    );
};

export default UserArea;
