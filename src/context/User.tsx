import { onAuthStateChanged } from 'firebase/auth';
import { createContext, FC, useEffect, useState } from 'react';

import { addUser, auth } from '../firebase';
import useUser from '../hooks/useUser';
import { User } from '../models/model';

export const UserContext = createContext(
  {} as ReturnType<typeof useUser> & { loading: boolean }
);

export const UserContextProvider: FC<{}> = (props) => {
  const { isLoggedIn, loginUser, logoutUser, user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          const myUser: User = {
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          };
          await addUser(myUser);
          loginUser(myUser);
        } else {
          logoutUser();
        }
        setLoading(false);
      },
      (error) => {
        console.log(error);
        logoutUser();
        setLoading(false);
      }
    );
  }, [loginUser, logoutUser]);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, loginUser, logoutUser, user, loading }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
