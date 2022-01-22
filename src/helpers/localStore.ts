import { State } from '../hooks/useValue';

export const addTodos = (todos: State) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const getTodos: () => State = () => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : { active: [], completed: [] };
};
