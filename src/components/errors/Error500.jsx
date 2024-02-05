import React from 'react'
import { Link } from 'react-router-dom'

const Error500 = () => {
    return (
        <div>
            <h1>Error500 Error interno del servidor</h1>
            <h3>Algo salio mal, reintente mas tarde</h3>

            <div className="back-link">
                <Link to="/Home" className="btn btn-dark btn-sm">Home</Link>
            </div>
        </div>



    )
}

export default Error500