import React, { useContext } from 'react';
import { List } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import Workday from './Workday';
import WorkdayContext from '../context/workdays-context';

const WorkdayList = () => {

    const { workdays } = useContext(WorkdayContext);
    
    if(workdays.length === 0){
        return <p>You have no recorded workdays!</p>
    }
    return (
        <div style={{height:"15rem",overflow:"auto"}}>
            {workdays.map((workday)=>(
                <Workday key={workday.id} workday={workday} />  
            ))}
        </div>
    );
}

export { WorkdayList as default}