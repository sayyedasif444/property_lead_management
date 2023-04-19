import React from 'react';
import LoginForm from '../../components/LoginForm';
import { Card, Row, Col } from 'antd';
import { useSelector } from 'react-redux';

const backgroundStyle = {
  backgroundImage: '',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const LoginOne = (props) => {
  const theme = useSelector((state) => state.theme.currentTheme);
  return (
    <div className='h-100' style={backgroundStyle}>
      <div className='container d-flex flex-column justify-content-center h-100'>
        <Row justify='center'>
          <Col xs={24} sm={24} md={24} lg={9}>
            <Card className='shadow' style={{ background: '#1245A8' }}>
              <div className='my-4'>
                <div className='text-center mb-3'>
                  <img
                    className='img-fluid'
                    src={`/img/${
                      theme === 'light' ? 'logo-white.png' : 'logo-white.png'
                    }`}
                    alt=''
                    style={{ height: '70px' }}
                  />
                  
                  {/* <p>
                    Don't have an account yet?{' '}
                    <a href='/auth/register-1'>Sign Up</a>
                  </p> */}
                </div>
                <Row justify='center'>
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <LoginForm {...props} />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginOne;
