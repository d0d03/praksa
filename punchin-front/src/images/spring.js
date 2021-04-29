import { Image } from 'antd';

import spring from './spring.png';
import react from './react.png';
import antd from './antd.png';

export function SpringLogo() {
  return <Image width={200} src={spring} />;
}

export function ReactLogo() {
  return <Image width={200} src={react} />;
}

export function AntdLogo() {
  return <Image width={200} src={antd} />;
}