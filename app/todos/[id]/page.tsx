import { notFound } from 'next/navigation';
import Todo from '@/interfaces/Todo';
import UpdateTodoForm from '@/app/todos/[id]/UpdateTodoForm';
import { getAuthServer } from '@/utils/authServerRequests';

interface Params {
  params: {
    id: string;
  };
}

async function getTodo(id: number) {
  const res = await getAuthServer(`/api/tasks/${id}/`);

  if (!res.ok) {
    notFound();
  }

  const todo: Todo = await res.json();

  return todo;
}

export default async function TodoDetailPage({ params }: Params) {
  const todo = await getTodo(+params.id);

  return (
    <>
      <h1>Todo Detail</h1>
      <UpdateTodoForm todo={todo} />
    </>
  );
}
