import React from 'react';
import { Space, Progress, Row, Col } from 'antd';

const Employee = ({employee}) => {
    return(
        <div style={{width:300}}>
            <Row>
                <Col span={12}>{employee.firstName} {employee.lastName}</Col>
                <Col span={12}><Progress size="small" percent={100}/></Col>
            </Row>
        </div>

    );
}

export { Employee as default }