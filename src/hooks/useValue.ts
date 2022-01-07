import { useEffect, useReducer } from 'react';
import { addTodos, getTodos } from '../helpers/localStore';
import { Todo } from '../models/model';

export interface Context {
  active: Todo[];
  completed: Todo[];
}

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
  | { type: 'done'; payload: Todo }
  | { type: 'set'; payload: Context };

const TodoReducer = (state: Context, action: Actions): Context => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        active: [
          ...state.active,
          {
            id: Date.now(),
            todo: action.payload,
            isDone: false,
          },
        ],
      };

    case 'update':
      return {
        ...state,
        active: state.active.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, todo: action.payload.text }
            : todo
        ),
      };

    case 'delete':
      return {
        ...state,
        completed: state.completed.filter((todo) => todo.id !== action.payload),
        active: state.active.filter((todo) => todo.id !== action.payload),
      };

    case 'done':
      if (action.payload.isDone) {
        return {
          ...state,
          active: [
            ...state.active,
            { ...action.payload, isDone: !action.payload.isDone },
          ],
          completed: state.completed.filter(
            (todo) => todo.id !== action.payload.id
          ),
        };
      } else
        return {
          ...state,
          completed: [
            ...state.completed,
            { ...action.payload, isDone: !action.payload.isDone },
          ],
          active: state.active.filter((todo) => todo.id !== action.payload.id),
        };

    case 'set':
      return action.payload;

    default:
      return state;
  }
};

const INITIAL_STATE: Context = {
  active: [],
  completed: [],
};

const useValue = () => {
  const [state, dispatch] = useReducer(TodoReducer, INITIAL_STATE);

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
