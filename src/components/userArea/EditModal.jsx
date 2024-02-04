// EditUserModal.jsx
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditUserModal = ({ show, handleClose, handleSave }) => {
    const [newData, setNewData] = useState({
        // Inicializa los campos que puedes editar
        // newData: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveClick = () => {
        // Lógica para guardar los nuevos datos
        handleSave(newData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Agrega campos de formulario para los datos que deseas editar */}
                <label>Nombre:</label>
                <input type="text" name="newData" value={newData.newData} onChange={handleChange} />
                {/* Agrega más campos según sea necesario */}
            </Modal.Body>
            <Modal.Body>
                {/* Agrega campos de formulario para los datos que deseas editar */}
                <label>Apellido:</label>
                <input type="text" name="newData" value={newData.newData} onChange={handleChange} />
                {/* Agrega más campos según sea necesario */}
            </Modal.Body>
            <Modal.Body>
                {/* Agrega campos de formulario para los datos que deseas editar */}
                <label>Telefono:</label>
                <input type="text" name="newData" value={newData.newData} onChange={handleChange} />
                {/* Agrega más campos según sea necesario */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSaveClick}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserModal;
