import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <div>
            <h1>Error404 No encontrado</h1>
            <h3>la URL proporcionada no corresponde a ninguna página existente en el servidor.</h3>

            <div className="back-link">
                <Link to="/Home" className="btn btn-dark btn-sm">Home</Link>
            </div>
        </div>
    )
}

export default Error404