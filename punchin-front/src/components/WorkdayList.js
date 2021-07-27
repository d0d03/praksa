import React, { useState, useContext, useEffect } from 'react';

import Workday,{BtnExtra} from './Workday';
import WorkdayContext from '../context/workdays-context';
import { Collapse } from 'antd';

const WorkdayList = ({defaultActive}) => {

    const { workdays } = useContext(WorkdayContext);
    const {Panel} = Collapse;
    const [defActive ,setDefActive] = useState(defaultActive);
    //const [defaultActiveKey, setDefaultActiveKey] = useState(defaultActive);
    useEffect(()=>{
        console.log(defActive);
    },[defActive]);
    
    const callback = (key) => {
        setDefActive(key)
    }

    if(workdays.length === 0){
        return <p>You have no recorded workdays!</p>
    }
    return (
        <div>
            <Collapse accordion ghost defaultActiveKey={defActive} onChange={callback}>
            {
                workdays.map((workday)=>( 
                    <Panel header={<span>{workday.date}</span>} extra={<BtnExtra workday={workday}/>}  key={workday.id} >
                        <Workday key={workday.id} workday={workday} />  
                    </Panel>
                ))
            }
            </Collapse>
        </div>
    );
}

export { WorkdayList as default}