import { Context } from '../hooks/useValue';

export const addTodos = (todos: Context) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const getTodos: () => Context = () => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
};
