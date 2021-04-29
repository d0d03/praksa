import React from 'react';
import { Carousel } from 'antd';
import {SpringLogo, ReactLogo, AntdLogo} from '../images/spring';

const HomePage = () => {

    const contentStyle = {
        height: '200px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };

    return(
        <div className="slideshow">
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>This app serves for evidenting intern attendance.</h3> 
                </div>
                <div>
                <h3 style={contentStyle}>You can log in, and start evidenting your workday</h3>
                </div>
                <div>
                <h3 style={contentStyle}>... or add them later</h3>
                </div>
                <div>
                <h3 style={contentStyle}>App was made in following technologies</h3>
                </div>
                <div>
                    <h3 style={contentStyle}><ReactLogo /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}> <AntdLogo /></h3>
                </div>
                <div>
                    <h3 style={contentStyle}><SpringLogo /></h3>
                </div>
            </Carousel>
      </div>
    );
}

export { HomePage as default }