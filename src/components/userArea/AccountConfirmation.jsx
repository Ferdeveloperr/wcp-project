import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const AccountConfirmation = () => {
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [emailToVerify, setEmailToVerify] = useState('');
    const [verificationError, setVerificationError] = useState(null);

    const handleEmailVerification = async () => {
        try {
            const response = await fetch('https://tu-api-endpoint.com/confirm-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailToVerify }),
            });

            if (response.ok) {
                const data = await response.json();
                setVerificationStatus(data.status);
                setVerificationError(null);
                console.log(data);
            } else {
                const errorData = await response.json();
                setVerificationError(errorData.error);
                console.error('Error en la confirmación del correo electrónico:', errorData.error);
            }
        } catch (error) {
            setVerificationError('Error al confirmar el correo electrónico');
            console.error('Error al confirmar el correo electrónico:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Ingrese su dirección de correo electrónico:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailInput"
                            value={emailToVerify}
                            onChange={(e) => setEmailToVerify(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <button onClick={handleEmailVerification} className="btn btn-dark">Verificar Correo Electrónico</button>
                    </div>
                    {verificationStatus === 'success' ? (
                        <div className="alert alert-success" role="alert">
                            SU DIRECCIÓN DE CORREO ELECTRÓNICO HA SIDO VERIFICADA EXITOSAMENTE
                        </div>
                    ) : (
                        <div className="alert alert-danger" role="alert">
                            {verificationError || 'ERROR AL VERIFICAR LA DIRECCIÓN DE CORREO ELECTRÓNICO'}
                        </div>


                    )}
                    <div className='d-flex justify-content-center'>
                        <Link to="/Home" className="btn btn-info btn-lg">
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountConfirmation;
