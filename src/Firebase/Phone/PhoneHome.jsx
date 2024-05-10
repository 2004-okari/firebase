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

const PhoneHome = () => {
  const navigation = useNavigate();
  const handleLogout = () => {
    signOut(authentication).then(() => {
      localStorage.clear();
      notify('Signed out successfully!');
      setTimeout(() => {
        navigation('/');
      }, 800);
    }).catch((error) => {
      notify('Error signing out', error.message);
    });
  };
  return (
    <div>
      <Toaster />
      <h1>Phone Home</h1>
      <p>
        you are signed in as
        {localStorage.getItem('user')}
      </p>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default PhoneHome;
