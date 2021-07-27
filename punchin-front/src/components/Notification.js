import React,{} from 'react';
import {Card, Empty, Button, Space } from 'antd';
import {Link} from 'react-router-dom';

const Notification = ({notifications,visible}) => {
  
  const handlePregled = () =>{
    visible(false);
  }

  return(
  <div style={{maxHeight:"50vh", overflowY:"scroll"}}>
    { notifications.length !== 0 ? notifications.map((notification)=>{
      return (
        <Card key={notification.notificationId}>
          <Space direction="horizontal" style={{alignItems:'baseline'}}>
          
          {notification.notificationCode === 2 && <p>Admin [{notification.username}] potvrdio je radni dan [{notification.workdayDate}]</p>}
          {notification.notificationCode === 1 && <p>Korisnik [{notification.username}] dodao je novi radni dan [{notification.workdayDate}]</p>}
          <Button type="primary">Confirm</Button>
          <Link className="nav-link" to={`/workdays/${notification.username}/${notification.workdayDate}/${notification.workdayId}` /*PROMJENIT U USERNAME na backednu DTO napravi ili nest*/}  activeClassName="is-active"><Button onClick={handlePregled}>Pregled</Button></Link>
          
          </Space>
        </Card>
        );
      }) :
      <Card>
        <Empty description={false} />
      </Card>
    }
    </div>
    );
}

export {Notification as default}