import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'



function CreateEmployee() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  // const [id, setid] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirtsName] = useState('');
  const [email, setEmail] = useState('');

  const saveEmployee = (e) => {
    e.preventDefault();
    
    let dataJsonEmployer = { firstName: firstName, name: name, email: email };
    console.log('employee => ' + JSON.stringify(dataJsonEmployer));

    // Traiter les données du formulaire  ici, par exemple les envoyer à une API
    const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employer/id";
    axios.post(EMPLOYEE_API_BASE_URL , dataJsonEmployer)
      .then(response => {
        console.log(response.data); // Affiche la réponse du backend

      })
      .catch(error => {
        console.error(error);
      });

    // Réinitialiser les champs du formulaire
    setName('');
    setFirtsName('');
    setEmail('');
    handleClose();
    navigate('/employers');
    window.location.reload();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Empêche le comportement par défaut de la touche "Entrée"
      saveEmployee(event);
    }
  };


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='container mt-5'>
      <Button  variant="primary" onClick={handleShow}>
        Ajouter un employé
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un employé</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirtsName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label >Nom</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
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
          <Button variant="success" type="submit" onClick={saveEmployee}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateEmployee;

    // if (name === '' || firstName === '' || email === '') {
    //   return alert('Veuillez remplir tous les champs obligatoires (prénom, name et email).');
      
    // }