import Todo from '@/interfaces/Todo';
import TodoList from '@/app/todos/TodoList';
import { getAuthServer } from '@/utils/authServerRequests';

async function getTodos() {
  const res = await getAuthServer('/api/tasks/');

  const todos: Todo[] = await res.json();

  return todos;
}

export default async function TodoListPage() {
  const todos = await getTodos();

  return (
    <>
      <TodoList todos={todos} />
    </>

  );
}
