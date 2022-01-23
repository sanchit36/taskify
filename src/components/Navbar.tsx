import React, { useContext } from 'react';
import { BiLogOut } from 'react-icons/bi';

import IconButton from './IconButton';
import { UserContext } from '../context/User';
import { logout } from '../firebase';
import './Navbar.css';

const Avatar: React.FC<{ image: string }> = ({ image }) => {
  return (
    <div className='avatar'>
      <img src={image} alt='avatar' />
    </div>
  );
};

const Navbar = () => {
  const { logoutUser, user, isLoggedIn } = useContext(UserContext);

  const logoutUserHandler = async () => {
    await logout();
    logoutUser();
  };

  return (
    <header className='navbar'>
      <h1 className='heading'>Taskify</h1>
      {isLoggedIn && (
        <nav className='nav'>
          <IconButton
            icon={<BiLogOut />}
            text='logout'
            onClick={logoutUserHandler}
            style={{
              fontSize: '15px',
              width: 'auto',
              margin: '0',
              marginRight: '1.5rem',
            }}
          />
          <Avatar image={user?.avatar!} />
        </nav>
      )}
    </header>
  );
};

export default Navbar;
