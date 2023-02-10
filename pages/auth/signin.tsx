import React, { useEffect, useState } from 'react';
import {
  Button, Form, Input, Row, Col, Spin,
} from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { status } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/todos/');
    }
  }, [router, status]);

  async function onFinish(values: any) {
    setLoading(true);

    await signIn('credentials', values);

    setLoading(false);
    router.push('/todos/');
  }

  return (
    <>
      <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={8}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Row>
              <Col span={6} />
              <Col span={18}>
                <h1>Login:</h1>
              </Col>
            </Row>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              {loading
                ? <Spin />
                : (
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                )}
            </Form.Item>
          </Form>

        </Col>
      </Row>
    </>
  );
}
