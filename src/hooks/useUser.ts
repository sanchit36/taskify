import { useCallback, useReducer } from 'react';
import { User } from '../models/model';

export interface State {
  isLoggedIn: boolean;
  user: User | null;
}

type Actions =
  | {
      type: 'login';
      payload: User;
    }
  | {
      type: 'logout';
    };

const UserReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'login':
      return {
        isLoggedIn: true,
        user: action.payload,
      };
    case 'logout':
      return {
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

const INITIAL_STATE: State = {
  isLoggedIn: false,
  user: null,
};

const useValue = () => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  const loginUser = useCallback((user: User) => {
    dispatch({ type: 'login', payload: user });
  }, []);

  const logoutUser = useCallback(() => {
    dispatch({ type: 'logout' });
  }, []);

  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    loginUser,
    logoutUser,
  };
};

export default useValue;
