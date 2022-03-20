import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Col, Form, Input, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const Login = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoginFail, setIsLoginFail] = useState(false);

  let user = localStorage.getItem("user")
  user = JSON.parse(user)
  useEffect(() => {
    if(user){
      navigate('/admin/posts')
    }
  },[])

  const onFinish = (values) => {
    const axios = require('axios')
    axios.post('/api/login', values)
      .then(function (response) {
        console.log(response.data.user[0]);
        if (response.data.user[0]) {
          localStorage.setItem("user", JSON.stringify(response.data.user[0]));
          navigate('/admin/posts')
        } else {
          setIsLoginFail(true);
          setMessage("Wrong Username or Password")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Layout>
      <Content style={{ minHeight: '100vh' }}>
        <Row gutter={16}>
          <Col span={8}>

          </Col>
          <Col span={8}>
            <Card title="Login CMS" bordered={false}>
              {isLoginFail && <Alert message={message} type="error" showIcon closable onClose={() => setIsLoginFail(false)} style={{ marginBottom: '16px' }} />}
              <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={8}>

          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default Login