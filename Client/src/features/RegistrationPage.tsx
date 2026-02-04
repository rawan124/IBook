import { Row, Col } from 'antd';
import Registration from './Registration';
import Journey from './Journey';

const RegisterPage = () => {
  return (
 
    <Row
      //justify='space-around'
      align="middle"
      gutter={48}
      style={{ marginTop: '120px' }}
    >
    
      <Col xs={24} md={12}>
        <Registration />
      </Col>

      <Col  xs={24} md={12}>
        <Journey />
      </Col>
    </Row>
    
  );
};

export default RegisterPage;
