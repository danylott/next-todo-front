'use client';

import { List } from 'antd';
import Link from 'next/link';
import Todo from '@/interfaces/Todo';

interface Props {
  todo: Todo;
}

export default function TodoItem({ todo }: Props) {
  return (
    <List.Item>
      <Link href={`/todos/${todo.id}`}>
        {todo.title}
        {' '}
        {todo.is_completed
          ? 'Done'
          : 'Not Done'}
      </Link>
    </List.Item>
  );
}
