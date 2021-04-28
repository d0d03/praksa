import React, { useState, useEffect } from 'react';
import { Progress, Row, Col, Button, Modal,notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


import fetcher from '../actions/login';

const Employee = ({employee, dispatch}) => {

    const [progress,setProgress] = useState();
    const { confirm } = Modal;

    useEffect(()=>{
        fetcher(`/progress/${employee.username}`,{method:'GET'})
        .then(response=>{
            if(response!==null){
                setProgress(parseInt(response * 100));
            }
        })
    },[employee])

    const removeEmployee = ()=>{
        console.log(employee.id);
        fetcher(`/employees/${employee.id}`,{method:'DELETE'})
        .then(response =>{
            notification['success']({
                message: response.message
            })
            dispatch({type:'REMOVE_EMPLOYEE', id:employee.id});
        })
    }

    function showDeleteConfirm() {
        confirm({
          title: 'Are you sure you want to delete this employee?',
          icon: <ExclamationCircleOutlined />,
          content: 'You will also delete all of his workdays. This cannot be undone!',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            removeEmployee();
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    return(
        <div className="employee-info">
            <Row>
                <Col span={6}>{employee.firstName} {employee.lastName}</Col>
                <Col span={6}><Progress size="small" percent={progress}/></Col>
                <Col style={{textAlign:"right"}} span={12}><Link to={`/workdays/${employee.username}`}><Button>Workdays</Button></Link><Button danger onClick={showDeleteConfirm}>Remove</Button></Col>
            </Row>
            {/* <p>{employee.firstName} {employee.lastName}</p>
            <Progress size="small" percent={progress} />
            <Link to={`/workdays/${employee.username}`}><Button>Workdays</Button></Link> */}
        </div>

    );
}

export { Employee as default }