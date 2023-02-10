'use client';

import { FloatButton, List } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import TodoItem from '@/app/todos/TodoItem';
import Todo from '@/interfaces/Todo';

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos }: Props) {
  const { data: session, status } = useSession();

  return (
    <div>

      <h1>Todos:</h1>

      <List
        bordered
        dataSource={todos}
        renderItem={(todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        )}
      />

      <Link href="/todos/create">
        <FloatButton
          shape="circle"
          icon={<PlusCircleOutlined />}
        />
      </Link>
    </div>
  );
}
