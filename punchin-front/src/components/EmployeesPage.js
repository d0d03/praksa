import React, { useEffect, useReducer } from 'react';
import { Redirect } from 'react-router';
import { Button } from 'antd';

import Employee from './Employee';
import employeesReducer from '../reducers/employees';
import fetcher from '../actions/login';

const EmployeesPage = () => {

    const [employees, dispatchEmployees] = useReducer(employeesReducer, []);

    useEffect(()=>{
        fetcher("/employees",{method:'GET'})
        .then(response => {
            response.map(employee =>{
                dispatchEmployees({
                    type:'ADD_EMPLOYEE', 
                    id:employee.id, 
                    firstName:employee.firstName, 
                    lastName:employee.lastName,
                    maxHours:employee.maxHours,
                    username:employee.username
                });
            });
        });
    },[]);

    return(
        <div>
            {localStorage.roles.includes("_ADMIN") ? 
                <div className="employee-container">
                    <div className="container-header">
                        <h1>Employees</h1>
                    </div>
                    <div className="employee-list">
                        {employees.map((employee)=>(
                            <div className="individual-employee" key={employee.id}>
                                <Employee employee={employee} dispatch={dispatchEmployees}/>
                            </div>
                        ))}
                    </div>
                </div>
            :
                <Redirect to="/" />
            }
        </div>
    );
}

export { EmployeesPage as default }