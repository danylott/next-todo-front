'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button, DatePicker, Form, Input, Spin, Switch,
} from 'antd';
import { useSession } from 'next-auth/react';
import { post } from '@/utils/requests';

export default function CreateTodoForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  async function onFinish(values: any) {
    setLoading(true);
    await post('/api/tasks/', values, session?.access);

    setLoading(false);
    router.push('/todos');
  }

  return (
    <Form
      name="basic"
      layout="horizontal"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input task title!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Is Completed?" name="is_completed" valuePropName="checked" initialValue={false}>
        <Switch />
      </Form.Item>

      <Form.Item label="DatePicker" name="deadline" rules={[{ required: true, message: 'Please add deadline' }]}>
        <DatePicker />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>

        {loading
          ? <Spin />
          : (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
      </Form.Item>
    </Form>
  );
}
