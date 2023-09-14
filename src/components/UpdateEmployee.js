import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEmployee() {
    const navigate = useNavigate();
    const { id } = useParams();
    // console.log("idParams : " + id)

    const [show, setShow] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');  

    useEffect(() => {
        axios.get(`http://localhost:8080/employer/${id}`)
            .then(response => {
                const EmployeeData = response.data;
                setFirstName(EmployeeData.firstName);
                setName(EmployeeData.name);
                setEmail(EmployeeData.email);
                // console.log("response.dataUpdate"+ JSON.stringify(response.data))
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const updateEmployee = (e) => {
        e.preventDefault();

        let updatedData = { "id": id, firstName: firstName, name: name, email: email };
        console.log("updatedData : " + JSON.stringify(updatedData))
        console.log("idPut : " + id)
        const EMPLOYEE_API_BASE_URL = `http://localhost:8080/employer/${id}`;
        axios.put(EMPLOYEE_API_BASE_URL, updatedData, id)
        .then(response => {
            // console.log("response.data : "+response.data); // Affiche la réponse du backend
        })
        .catch(error => {
            console.error(error);
        });

        handleClose();
        console.log("Modifier")
        navigate('/employers');
        window.location.reload();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            updateEmployee(event);
        }
    };

    const handleClose = () => {
        setShow(false);
        navigate('/employers');
    }

    return (
        <div className='container mt-5'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="success" type="submit" onClick={updateEmployee}>
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UpdateEmployee;