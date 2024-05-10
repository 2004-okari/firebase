/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { authentication } from '../firebase.config';

const notifyObj = {
  red: '#A91D3A',
  green: '#007F73',
  white: '#fff',
  black: '#000',
  messageone: 'Signed up successfully!',
  messagethree: 'Error creating user',
  iconone: '⚠️',
  icontwo: '👏',
};
const notify = (message, icon, primary, secondary) => toast(message, {
  duration: 3000,
  position: 'top-center',
  icon,
  iconTheme: {
    primary,
    secondary,
  },
});

const EmailSignUp = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must be at least 6 characters long and include a symbol and a number.',
      );
      return;
    }

    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        notify(
          notifyObj.messageone,
          notifyObj.icontwo,
          notifyObj.white,
          notifyObj.black,
        );
        setTimeout(() => {
          navigation('/emailsignin');
        }, 2000);
        console.log(user);
      })
      .catch((error) => {
        notify(
          notifyObj.messagethree,
          notifyObj.iconone,
          notifyObj.red,
          notifyObj.black,
        );
        console.log('error', error);
      });
  };
  return (
    <div className="signincontainer">
      <Toaster />
      <div className="outerdiv">
        <div className="innerdiv">
          <div className="title">Sign up with Email</div>
          <p className="label">Email</p>
          <input
            type="text"
            placeholder="cooooooook@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forminput"
          />
          <p className="label">Password</p>
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="forminput"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <input
              type="checkbox"
              className="checkbox"
              onChange={() => setShowPass(!showPass)}
            />
            <p
              style={{
                margin: 0,
              }}
            >
              Show password
            </p>
          </div>
          {errorMessage && (
            <p style={{ color: 'red', marginTop: '12px', textAlign: 'left' }}>
              {errorMessage}
            </p>
          )}
          <button className="button" type="button" onClick={handleSignup}>
            Sign Up
          </button>
          <div className="or">
            <div className="line" />
            <p style={{ margin: '0 10px' }}>or</p>
            <div className="line" />
          </div>
          <p>
            Already have an account?
            {' '}
            <strong
              style={{
                cursor: 'pointer',
              }}
              onClick={() => navigation('/emailsignin')}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigation('/emailsignin');
                }
              }}
            >
              Sign in
            </strong>
          </p>
          <p
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigation('/');
              }
            }}
            style={{
              cursor: 'pointer',
              textAlign: 'right',
              marginTop: '36px',
            }}
            onClick={() => navigation('/')}
          >
            Go back
            {' '}
            <strong
              style={{
                textDecoration: 'underline',
              }}
            >
              Home
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailSignUp;
