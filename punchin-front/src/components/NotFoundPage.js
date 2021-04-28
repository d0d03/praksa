import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const NotFoundPage = () => {

    const [home,setHome] = useState('/login');
    useEffect(()=>{
        if(localStorage.username){
            setHome('/dash'); 
        }
    },[])

    return(
        <div>
    <Result
        status="404" 
        title="404" 
        subtitle="Sorry, the page you visited does not exist."
        extra={<Link to={home}><Button type="primary">Back Home</Button></Link>}
    />
    </div>

    );
}

export { NotFoundPage as default }