import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import LogoFinalWcp from '../image/LogoFinalWcp.jpeg';
import QRCode from 'qrcode';

const UserAreaConsultant = () => {
    const [url, setUrl] = useState('');
    const [showQR, setShowQR] = useState(false);
    const qrContainerRef = useRef(null);



    // FETCH para pedir datos al backend

    const generateQRCode = async () => {
        const qrContainer = qrContainerRef.current;

        // Verificar si el elemento existe y es un canvas
        if (!qrContainer || qrContainer.tagName.toLowerCase() !== 'div') {
            // Si no existe o no es un div, crealo como un elemento div
            const newQRContainer = document.createElement('div');
            newQRContainer.id = 'qrcode';
            qrContainerRef.current = newQRContainer;

            // Agrega el nuevo contenedor al DOM
            document.body.appendChild(newQRContainer);
        }

        // Limpiamos el contenedor
        qrContainer.innerHTML = '';

        // Creamos un nuevo canvas y lo adjuntamos al contenedor
        const canvas = document.createElement('canvas');
        canvas.width = 228;
        canvas.height = 228;
        qrContainer.appendChild(canvas);

        // Generamos el QR en el nuevo canvas
        await QRCode.toCanvas(canvas, url);

        // Mostramos el contenedor del QR
        setShowQR(true);
    };


    let saved_token = sessionStorage.getItem('token');
    let tkn = 'Bearer ' + saved_token;

    const navigate = useNavigate();

    const handleClick = async (e, pagina) => {
        e.preventDefault;
        try {
            await fetch('http://localhost:8000/refresh-token', {
                method: 'GET',
                headers: {
                    'Authorization': tkn,
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((res) => {
                        let token = res.access_token;
                        sessionStorage.setItem('token', token);
                    })
                } else {
                    navigate('/403');
                }
            })
                .then(() => {
                    navigate(pagina);
                })
        } catch (error) {
            console.error('Error:', error);
        }
    }


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
                            <a className="navbar-brand" href="/UserAreaConsultant">
                                WorldPlus
                            </a>
                        </div>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav" npm install qrcode

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
                                    <Link to="/ReceiveWallet" className="nav-link">Mi Billetera</Link>
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
                                    <Link to="/Logout" className="nav-link">Cerrar Sesion</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#footerSection">
                                        Pie de pagina
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <section className="sectionAdmin">
                <h1>Panel de control</h1>
                <br />
                <h3>Escanea e ingresa</h3>
            </section>

            <div className="app">
                <div id="qrContainer" className="d-flex flex-column align-items-center">
                    <input
                        type="text"
                        id="url"
                        placeholder="https://example.com"
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button id="btnQR" type="button" className="btn btn-primary" onClick={generateQRCode}>
                        Generar QR
                    </button>

                    {showQR && (
                        <div id="qrcode" className="qrcode" ref={qrContainerRef}></div>
                    )}
                </div>
            </div>



            <hr className="custom-hr" />



            <hr className="custom-hr" />

            {/* F O O T E R */}
            <section id="footerSection">
                <footer className="bg-black text-white py-4 mt-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <p>
                                    <a href="/Terms" className="text-white">
                                        Términos y Condiciones
                                    </a>
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <p>Derechos Reservados &copy; 2024 WorldPlus</p>
                            </div>
                            <div className="col-lg-4">
                                <p>
                                    <a href="https://wa.me/tunumero" className="text-white" >
                                        Área de Soporte
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
        </div>
    );
};

export default UserAreaConsultant;
