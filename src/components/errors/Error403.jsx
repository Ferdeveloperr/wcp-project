import React from 'react'
import { Link } from 'react-router-dom'

const Error403 = () => {
    return (
        <div>
            <h1>Error 403 Prohibido </h1>
            <h3>No tiene los permisos para ingresar al sitio</h3>

            <div className="back-link">
                <Link to="/Home" className="btn btn-dark btn-sm">Home</Link>
            </div>
        </div>
    )
}

export default Error403