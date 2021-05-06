import React, { useContext } from 'react';

import Workday,{BtnExtra} from './Workday';
import WorkdayContext from '../context/workdays-context';
import { Collapse } from 'antd';

const WorkdayList = () => {

    const { workdays } = useContext(WorkdayContext);
    const {Panel} = Collapse;
    
    if(workdays.length === 0){
        return <p>You have no recorded workdays!</p>
    }
    return (
        <div>
            <Collapse accordion ghost>
            {
                workdays.map((workday)=>( 
                <Panel header={<span>{workday.date}</span>} extra={<BtnExtra workday={workday}/>} key={workday.id}>
                    <Workday key={workday.id} workday={workday} />  
                </Panel>
                ))
            }
            </Collapse>
        </div>
    );
}

export { WorkdayList as default}