import { createContext, FC } from 'react';
import useUser from '../hooks/useUser';

export const UserContext = createContext({} as ReturnType<typeof useUser>);

export const UserContextProvider: FC<{}> = (props) => {
  return (
    <UserContext.Provider value={useUser()}>
      {props.children}
    </UserContext.Provider>
  );
};
