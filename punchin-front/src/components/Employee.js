import React, { useState, useEffect } from 'react';
import { Progress, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';


import fetcher from '../actions/login';

const Employee = ({employee}) => {

    const [progress,setProgress] = useState();

    useEffect(()=>{
        fetcher(`/progress/${employee.username}`,{method:'GET'})
        .then(response=>{
            if(response!==null){
                setProgress(parseInt(response * 100));
            }
        })
    },[employee])

    return(
        <div style={{width:500,height:50}}>
            <Row>
                <Col span={6}>{employee.firstName} {employee.lastName}</Col>
                <Col span={12}><Progress size="small" percent={progress}/></Col>
                <Col span={6}><Link to={`/workdays/${employee.username}`}><Button>Workdays</Button></Link></Col>
            </Row>
        </div>

    );
}

export { Employee as default }