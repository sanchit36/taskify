import { createContext, FC } from 'react';
import useValue from '../hooks/useValue';

export const TodoContext = createContext({} as ReturnType<typeof useValue>);

export const TodoContextProvider: FC<{}> = (props) => {
  return (
    <TodoContext.Provider value={useValue()}>
      {props.children}
    </TodoContext.Provider>
  );
};
