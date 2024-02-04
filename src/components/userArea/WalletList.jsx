import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../App.css';

const WalletList = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [wallets, setWallets] = useState([]);
    const [newWallet, setNewWallet] = useState('');


    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    useEffect(() => {
        // Recuperar las wallets almacenadas en el backend al cargar el componente
        fetchWalletsFromBackend();
    }, []);

    const fetchWalletsFromBackend = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                // Realizar la solicitud al backend para obtener las wallets del usuario
                const response = await fetch('https://www.worldplus.com.ar/api/wallets/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setWallets(data.wallets);
                } else {
                    console.error('Error al obtener las wallets del backend');
                }
            } else {
                console.error('No hay token en localStorage');
            }
        } catch (error) {
            console.error('Error en la solicitud al backend:', error);
        }
    };

    const addWallet = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                // Realizar la solicitud al backend para agregar una nueva wallet
                const response = await fetch('https://tu-api-endpoint.com/api/wallets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ wallet: newWallet }),
                });

                if (response.ok) {
                    // Actualizar las wallets después de agregar una nueva
                    fetchWalletsFromBackend();
                    // Limpiar el input de nueva wallet
                    setNewWallet('');
                } else {
                    console.error('Error al agregar la nueva wallet en el backend');
                }
            } else {
                console.error('No hay token en localStorage');
            }
        } catch (error) {
            console.error('Error en la solicitud al backend:', error);
        }
    };

    const removeWallet = async (index) => {
        try {
            const token = localStorage.getItem('token');

            if (token) {
                // Realizar la solicitud al backend para eliminar una wallet
                const response = await fetch(`https://tu-api-endpoint.com/api/wallets/${wallets[index].id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // Actualizar las wallets después de eliminar una
                    fetchWalletsFromBackend();
                } else {
                    console.error('Error al eliminar la wallet en el backend');
                }
            } else {
                console.error('No hay token en localStorage');
            }
        } catch (error) {
            console.error('Error en la solicitud al backend:', error);
        }
    };


    return (
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <div>
                <h2>Mis Wallets</h2>
            </div>

            <div className="container text-center">
                <button className="btn btn-dark mb-3" onClick={toggleOptions}>
                    Opciones
                </button>

                {showOptions && (
                    <div className="mb-3">
                        {/* Borrar Wallets */}
                        {wallets.map((wallet, index) => (
                            <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                                <span>{wallet.name}</span>
                                <button className="btn btn-danger" onClick={() => removeWallet(index)}>
                                    Borrar Wallet
                                </button>
                            </div>
                        ))}

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Nueva Wallet"
                            value={newWallet}
                            onChange={(e) => setNewWallet(e.target.value)}
                        />
                        <button className="btn btn-success mb-2" onClick={addWallet}>
                            Agregar Wallet
                        </button>
                    </div>
                )}
            </div>

            <Link to="/UserArea" className="btn btn-dark mb-3">
                Volver
            </Link>
        </div>
    );
};

export default WalletList;







