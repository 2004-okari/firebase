import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { authentication } from '../firebase.config';

const notify = (message) => toast(message, {
  duration: 3000,
  position: 'top-center',
  icon: '👏',
  iconTheme: {
    primary: '#000',
    secondary: '#007F73',
  },
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
});

const FirebaseHome = () => {
  const navigation = useNavigate();
  const handleSignOut = () => {
    signOut(authentication)
      .then(() => {
        localStorage.clear();
        notify('Sign out successful');
        setTimeout(() => {
          navigation('/');
        }, 800);
      })
      .catch((error) => {
        notify(error, 'SIGN OUT failed');
      });
  };

  return (
    <div>
      <Toaster />
      <h1>
        Firebase Home for
        {' '}
        {localStorage.getItem('name')}
        {' '}
        {localStorage.getItem('email')}
      </h1>
      <button type="button" onClick={handleSignOut}>
        Log out
      </button>
    </div>
  );
};

export default FirebaseHome;
