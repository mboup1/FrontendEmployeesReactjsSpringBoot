import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateEmployee from './CreateEmployee';



function EmployeesList() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/employers')
            .then(response => {
                setData(response.data);

            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const deleteEmployee = (employeeId, employeeFirstName, employeeName) => {
        let conf = window.confirm(`Etes-vous sûr de vouloir supprimer ${employeeFirstName + " "+ employeeName} ?`);
        if (conf){
        const EMPLOYEE_API_BASE_URL = "http://localhost:8080/employer/";
        axios.delete(EMPLOYEE_API_BASE_URL + employeeId);
        window.location.reload();
        }
    };



    return (       
        <> 
            <div className='mt-5'>
                <CreateEmployee />

                <h1 className='m-3 text-center'>Liste des employées</h1>

                <div className='container'>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(
                                        (employee, index) => 
                                            <tr key={index} className='m-3 w-25 mx-auto'>
                                                <td>{index+1}</td>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.email}</td>
                                            <td>
                                                    <button onClick={() => { navigate(`/employer/${employee.id}`) }} className="btn btn-success">Modifier </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => {deleteEmployee(employee.id, employee.firstName, employee.name) }} className="btn btn-danger">Supprimer </button>
                                            </td>
                                        </tr>
                                        
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeesList;
