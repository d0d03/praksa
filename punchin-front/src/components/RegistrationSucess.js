import React from 'react';
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const RegistrationSucess = () => (

    <Result 
        icon={<SmileOutlined />}
        title="Just one more step!"
        subTitle="Please check your email to complete the registration proccess."
    />
);

export { RegistrationSucess as default }