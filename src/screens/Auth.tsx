import React, { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook, GrGithub } from 'react-icons/gr';

import IconButton from '../components/IconButton';
import { UserContext } from '../context/User';
import { addUser, googleSignIn } from '../firebase';
import { User } from '../models/model';

const Auth = () => {
  const { loginUser } = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);

  const googleSignInHandler = async () => {
    setError(null);
    try {
      const userCredentials = await googleSignIn();
      const user: User = {
        id: userCredentials.user.uid,
        displayName: userCredentials.user.displayName,
        email: userCredentials.user.email,
        avatar: userCredentials.user.photoURL,
      };
      await addUser(user);
      loginUser(user);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const facebookSignInHandler = async () => {
    setError(null);
    try {
      const userCredentials = await googleSignIn();
      console.log(userCredentials);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const githubSignInHandler = async () => {
    setError(null);
    try {
      const userCredentials = await googleSignIn();
      console.log(userCredentials);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <div className='auth'>
      <h1 style={{ marginBottom: '1rem' }}>Authenticate</h1>

      <IconButton
        icon={<FcGoogle />}
        text='Google'
        onClick={googleSignInHandler}
      />

      <IconButton
        icon={<GrFacebook />}
        text='Facebook'
        onClick={facebookSignInHandler}
      />

      <IconButton
        icon={<GrGithub />}
        text='Github'
        onClick={githubSignInHandler}
      />

      <p className='error'>{error}</p>
    </div>
  );
};

export default Auth;
