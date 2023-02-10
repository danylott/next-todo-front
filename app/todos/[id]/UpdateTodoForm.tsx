'use client';

import {
  Button, DatePicker, Form, Input, notification, Spin, Switch,
} from 'antd';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Todo from '@/interfaces/Todo';
import { errorTemplate, infoTemplate } from '@/utils/notifications';
import { patch } from '@/utils/requests';

interface Props {
  todo: Todo;
}

export default function UpdateTodoForm({ todo }: Props) {
  const [loading, setLoading] = useState(false);
  const [notificationsApi, contextHolder] = notification.useNotification();
  const router = useRouter();
  const { data: session } = useSession();

  async function onFinish(values: any) {
    setLoading(true);

    const res = await patch(`/api/tasks/${todo.id}/`, values, session?.access);

    setLoading(false);
    if (!res.ok) {
      notificationsApi.error(errorTemplate(res.statusText));

      return;
    }

    router.refresh();
    notificationsApi.info(infoTemplate('Updated Todo'));
  }

  return (
    <>
      {contextHolder}
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
          initialValue={todo.title}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your password!' }]}
          initialValue={todo.description}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Is Completed?" name="is_completed" valuePropName="checked" initialValue={todo.is_completed}>
          <Switch defaultChecked={todo.is_completed} />
        </Form.Item>

        <Form.Item
          label="DatePicker"
          name="deadline"
          rules={[{ required: true, message: 'Please add deadline' }]}
          initialValue={dayjs(todo.deadline.slice(0, 10), 'YYYY-MM-DD')}
        >
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
    </>
  );
}
