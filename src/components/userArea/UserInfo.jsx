import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LogoFinalWcp from '../image/LogoFinalWcp.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import EditUserModal from '../userArea/EditModal';

const UserInfo = () => {
    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = sessionStorage.getItem('token');

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
                    console.error('No hay token en sessionStorage');
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




    // PETICION DE DATOS DEL USUARIO AL BACKEND
    const handleSaveChanges = async (newData) => {
        try {
            const token = sessionStorage.getItem('token');

            if (token) {
                const response = await fetch('https://worldplus.com.ar/api/users/me', {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newData),
                });

                if (response.ok) {
                    const updatedData = await response.json();
                    // Actualizar el estado con los nuevos datos si es necesario
                    // setUserData(updatedData);
                    console.log('Datos actualizados:', updatedData);
                } else {
                    console.error('Error al guardar cambios:', response.statusText);
                }
            } else {
                console.error('No hay token en sessionStorage');
            }
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }

        handleCloseModal(); console.log(handleCloseModal)
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
            <div id='userAreaStyle'>
                <header className="userHeader">
                    <nav className="navbar navbar-expand-lg bg-black border-bottom border-bottom-dark" data-bs-theme="dark">
                        <div className="container-fluid">
                            <a href="/UserArea" onClick={(evento) => handleClick(evento, '/UserArea')} className="Logo">
                                <img src={LogoFinalWcp} alt="Logo" height="70px" width="70px" />
                            </a>
                            <div className="logoStyle">
                                <a href="#" onClick={(evento) => handleClick(evento, '/UserArea')} className="navbar-brand">
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
                                        <a href="#" className="nav-link" onClick={(evento) => handleClick(evento, '/WalletList')}>Mis Billeteras</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link" onClick={(evento) => handleClick(evento, '/UserArea')}>Pagina principal</a>
                                    </li>
                                    {/* <li className="nav-item">
                                    <a href="#" className="nav-link" onClick={(evento) => handleClick(evento, '/UserArea')}>Cambiar contraseña</a>
                                </li> */}
                                    <li className="nav-item">
                                        <a className="nav-link" href="#footerSection">
                                            Pie de pagina
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link" onClick={(evento) => handleClick(evento, '/Logout')}>Cerrar Sesion</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>

                <div>
                    <h1>Informacion de usuario</h1>
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
                    {/* <button className="btn btn-success btn-lg mt-2 w-100 text-center" onClick={handleOpenModal}>
                    Confirmar email
                </button> */}
                    {/* <button className="btn btn-success btn-lg mt-2 w-100 text-center" onClick={handleOpenModal}>
                    Cambiar contraseña
                </button> */}
                    <EditUserModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        handleSave={handleSaveChanges}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
