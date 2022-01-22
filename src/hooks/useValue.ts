import { useEffect, useReducer } from 'react';
import { addTodos } from '../helpers/localStore';
import { Todo } from '../models/model';

export interface State {
  active: Todo[];
  completed: Todo[];
}

type Actions =
  | { type: 'add'; payload: Todo }
  | {
      type: 'update';
      payload: {
        id: string;
        text: string;
      };
    }
  | { type: 'delete'; payload: string }
  | { type: 'done'; payload: Todo }
  | { type: 'set'; payload: State };

const TodoReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        active: [...state.active, action.payload],
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

const INITIAL_STATE: State = {
  active: [],
  completed: [],
};

const useValue = () => {
  const [state, dispatch] = useReducer(TodoReducer, INITIAL_STATE);

  useEffect(() => {
    addTodos(state);
  }, [state]);

  return {
    todos: state,
    dispatch,
  };
};

export default useValue;
