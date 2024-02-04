import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LogoFinalWcp from '../image/LogoFinalWcp.jpeg';
import { Link } from 'react-router-dom';
import EditUserModal from '../userArea/EditModal';

const UserInfo = () => {
    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    const response = await fetch('https://worldplus.com.ar/api/users/me', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUserData(userData);
                        console.log(userData);
                    } else {
                        console.error('Error al obtener datos del usuario:', response.statusText);
                    }
                } else {
                    console.error('No hay token en localStorage');
                }
            } catch (error) {
                console.error('Error al cargar datos del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveChanges = (newData) => {
        // Lógica para guardar los nuevos datos en el backend
        // ...

        // Actualizar el estado con los nuevos datos si es necesario
        // setUserData(newUserData);

        handleCloseModal();
    };

    return (
        <div>
            <header className="userHeader">
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
                                    <Link to="/ForgotPassword" className="nav-link">Recuperar contraseña</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#footerSection">
                                        Pie de pagina
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Home" className="nav-link">Cerrar Sesion</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <div>
                <h1>UserInfo</h1>
                {/* Mostrar datos del usuario en la pantalla */}
                {userData && userData.map((user) => (
                    <div key={user.id}>
                        <p>Email: {user.email_address}</p>
                        <p>Nombre: {user.first_name}</p>
                        <p>Apellido: {user.last_name}</p>
                        <p>Número de teléfono: {user.phone_number}</p>
                        <p>Estado de usuario: {user.is_active}</p>
                    </div>
                ))}
            </div>

            <div>
                <button className="btn btn-success btn-lg mt-2 w-100 text-center" onClick={handleOpenModal}>
                    Editar usuario
                </button>
                <EditUserModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleSave={handleSaveChanges}
                />
            </div>
        </div>
    );
};

export default UserInfo;
