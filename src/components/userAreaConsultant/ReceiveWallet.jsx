import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../App.css';

const ReceiveWallet = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [wallets, setWallets] = useState([]);
    const [newWallet, setNewWallet] = useState('');

    useEffect(() => {
        // Cuando el componente se monta, realizar una solicitud al backend para obtener las wallets del usuario
        fetchWalletsFromBackend();
    }, []);

    const fetchWalletsFromBackend = async () => {
        try {
            const response = await fetch('https://tu-api-endpoint.com/api/wallets/me', {
                method: 'GET',
                headers: {
                    // Agrega cualquier encabezado necesario para autenticación, etc.
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer tu-token-de-autenticacion',
                },
                // Puedes incluir cualquier otra información de encabezado necesaria
            });

            if (response.ok) {
                const data = await response.json();
                setWallets(data.wallets);
            } else {
                console.error('Error al obtener las wallets del backend');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud al backend:', error);
        }
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const addWallet = async () => {
        try {
            // Realizar una solicitud al backend para agregar la nueva wallet
            const response = await fetch('https://tu-api-endpoint.com/api/wallets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer tu-token-de-autenticacion',
                },
                body: JSON.stringify({ wallet: newWallet }),
            });

            if (response.ok) {
                // Si la solicitud es exitosa, actualizar la lista de wallets desde el backend
                await fetchWalletsFromBackend();
            } else {
                console.error('Error al agregar la nueva wallet');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud al backend:', error);
        }

        // Limpiar el input de nueva wallet
        setNewWallet('');
    };

    const removeWallet = async (walletId) => {
        try {
            // Realizar una solicitud al backend para borrar la wallet
            const response = await fetch(`https://tu-api-endpoint.com/api/wallets/${walletId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer tu-token-de-autenticacion',
                },
            });

            if (response.ok) {
                // Si la solicitud es exitosa, actualizar la lista de wallets desde el backend
                await fetchWalletsFromBackend();
            } else {
                console.error('Error al borrar la wallet');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud al backend:', error);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center h-100">

            <div>
                <h2>Mi Wallet</h2>
            </div>

            <div className="container text-center">

                <button className="btn btn-dark mb-3" onClick={toggleOptions}>
                    Opciones
                </button>

                {showOptions && (
                    <div className="mb-3">
                        {/* Borrar Wallets */}
                        {wallets.map((wallet) => (
                            <div key={wallet.id} className="d-flex justify-content-between align-items-center mb-2">
                                <span>{wallet.name}</span>
                                <button className="btn btn-danger" onClick={() => removeWallet(wallet.id)}>
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

            <Link to="/UserAreaConsultant" className="btn btn-dark mb-3">
                Volver
            </Link>
        </div>
    );
};

export default ReceiveWallet;
