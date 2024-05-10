import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
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

const EmailHome = () => {
  const navigation = useNavigate();

  const handleSignOut = () => {
    signOut(authentication)
      .then(() => {
        localStorage.clear();
        notify('Signed out successfully!');
        setTimeout(() => {
          navigation('/');
        }, 800);
      })
      .catch((error) => {
        notify('Error signing out', error);
      });
  };
  return (
    <div>
      <Toaster />
      <h1>Email Home</h1>
      <button type="button" onClick={handleSignOut}>
        Logout
      </button>
    </div>
  );
};

export default EmailHome;
