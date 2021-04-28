import React, { useContext } from 'react';

import Workday from './Workday';
import WorkdayContext from '../context/workdays-context';

const WorkdayList = () => {

    const { workdays } = useContext(WorkdayContext);
    
    if(workdays.length === 0){
        return <p>You have no recorded workdays!</p>
    }
    return (
            workdays.map((workday)=>(
                <Workday key={workday.id} workday={workday} />  
            ))
    );
}

export { WorkdayList as default}