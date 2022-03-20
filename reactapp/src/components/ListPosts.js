import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Table, Tag, Space, Image, Popconfirm, notification } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListPosts = () => {
  let navigate = useNavigate();
  const [posts, setPosts] = useState();
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    axios.get('/api/posts')
      .then(function (response) {
        setPosts(response.data.posts);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        setLoadingTable(false)
      });
  }, [])

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const update = (record) => {
    navigate(`/admin/posts/${record.id}`)
  }

  const remove = (record) => {
    setLoadingTable(true)
    axios.post(`/api/posts/delete/${record.id}`)
      .then(function (response) {
        let newPosts = posts.filter(item => item.id !== record.id)
        setPosts(newPosts)
        openNotification('success', 'Delete Successfully')
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        setLoadingTable(false)
      });
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => update(record)}><EditOutlined /></Button>
          <Popconfirm title="Delete?" placement="leftTop" onConfirm={() => remove(record)}>
            <Button type="link" size="small" danger><DeleteOutlined /></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Posts</Breadcrumb.Item>
        <Breadcrumb.Item>List Posts</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 16, minHeight: 480 }}>
        <Button type='primary' style={{ marginBottom: '16px' }}><Link to="/admin/posts/detail">New Post</Link></Button>
        <Table
          bordered
          scroll={{ x: 480 }}
          columns={columns}
          dataSource={posts}
          rowKey='id'
          loading={loadingTable}
        />
      </div>
    </>
  )
}

export default ListPosts