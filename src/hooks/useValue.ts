import { useEffect, useReducer } from 'react';
import { addTodos, getTodos } from '../helpers/localStore';
import { Todo } from '../models/model';

type Actions =
  | { type: 'add'; payload: string }
  | {
      type: 'update';
      payload: {
        id: number;
        text: string;
      };
    }
  | { type: 'delete'; payload: number }
  | { type: 'done'; payload: number }
  | { type: 'set'; payload: Todo[] };

const TodoReducer = (state: Todo[], action: Actions) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: Date.now(),
          todo: action.payload,
          isDone: false,
        },
      ];

    case 'update':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.text }
          : todo
      );

    case 'delete':
      return state.filter((todo) => todo.id !== action.payload);

    case 'done':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
      );

    case 'set':
      return action.payload;

    default:
      return state;
  }
};

const useValue = () => {
  const [state, dispatch] = useReducer(TodoReducer, []);

  useEffect(() => {
    const todos = getTodos();
    dispatch({ type: 'set', payload: todos });
  }, []);

  useEffect(() => {
    addTodos(state);
  }, [state]);

  return {
    todos: state,
    dispatch,
  };
};

export default useValue;
