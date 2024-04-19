import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const AntdButtons: React.FC = () => (
  <>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <br />
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
    <Link to='/card?from=button'>to card</Link>
  </>
);

export default AntdButtons;
