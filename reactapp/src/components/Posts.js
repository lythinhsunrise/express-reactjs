import { Breadcrumb, Button, Card, Col, Form, Input, notification, Row, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};

const Posts = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [itemCP, setItemCP] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [form] = Form.useForm();

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  useEffect(() => {
    if (params.id) {
      setLoadingForm(true)
      axios.get(`/api/posts/${params.id}`)
        .then(function (response) {
          setItemCP(response.data.post[0])
          form.setFieldsValue(response.data.post[0])
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          setLoadingForm(false)
        });
    }
  }, []);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      setLoadingForm(true)
      if (params.id) {
        //update
        axios.post(`/api/posts/${params.id}`, values)
          .then(function (response) {
            setLoadingForm(false)
            openNotification('success', 'Update Successfully')
            navigate("/admin/posts")
          })
          .catch(function (error) {
            console.log(error);
            setLoadingForm(false)
            openNotification('error', 'Update Fail')
            navigate("/admin/posts")
          });
      } else {
        //store
        axios.post('/api/posts', values)
          .then(function (response) {
            setLoadingForm(false)
            openNotification('success', 'Add Successfully')
            navigate("/admin/posts")
          })
          .catch(function (error) {
            console.log(error);
            setLoadingForm(false)
            openNotification('error', 'Add Fail')
            navigate("/admin/posts")
          });
      }
    })
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Posts</Breadcrumb.Item>
        <Breadcrumb.Item>Post</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Card
          size="small"
          title={
            itemCP.title ? <h3>{itemCP.title}<br /></h3> : <h3>{'New Posts'}</h3>
          }
          style={{ width: '100%' }}
        >
          <Spin tip="Loading..." spinning={loadingForm}>
            <Form
              {...formItemLayout}
              layout="horizontal"
              form={form}
              labelAlign="left"
            >
              <Row>
                <Col xs={24} xl={12}>
                  <Form.Item
                    label="Title"
                    name="title"
                    style={{ marginBottom: 15 }}
                    rules={[{ required: true, message: 'Please Input' }]}
                  >
                    <Input placeholder="Please Input" />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name="description"
                    style={{ marginBottom: 15 }}
                  >
                    <Input placeholder="Description" />
                  </Form.Item>
                  <Button onClick={() => onSubmit()} type="primary" style={{ marginRight: 8 }}>
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Card>
      </div>
    </>
  )
}

export default Posts