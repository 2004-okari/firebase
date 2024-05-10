/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import toast, { Toaster } from 'react-hot-toast';
import { authentication } from '../firebase.config';
import './Phone.css';

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

const PhoneNumber = () => {
  const navigation = useNavigate();

  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleSignIn = () => {
    const recaptchaVerifier = new RecaptchaVerifier(
      authentication,
      'sign-in-button',
      {
        size: 'invisible',
      },
    );
    signInWithPhoneNumber(authentication, number, recaptchaVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        notify('OTP sent successfully');
      })
      .catch((error) => {
        console.error('Error sending SMS:', error);
        notify('Error sending OTP');
      });
  };

  const verifyOtp = () => {
    if (!confirmationResult) {
      return;
    }

    confirmationResult
      .confirm(otp)
      .then((result) => {
        const { user } = result;
        notify('Logged in successfully!');
        localStorage.setItem('user', JSON.stringify(user.phoneNumber));
        navigation('/phonehome');
        localStorage.setItem('signedInWithPhone', true);
      })
      .catch((error) => {
        console.error('Error while verifying OTP:', error);
        notify('Error verifying OTP');
      });
  };

  return (
    <div className="phonecontainer">
      <Toaster />
      <div className="phoneheader">
        <div className="innerdiv">
          <p className="phonetitle">Phone Number</p>
          <PhoneInput
            placeholder="(000) 000 000"
            defaultCountry="US"
            value={number}
            onChange={(value) => setNumber(value)}
            className="phoneinput"
          />
          <button className="button" type="button" onClick={handleSignIn}>
            Send OTP
          </button>
          <div id="sign-in-button" />
          {/* Additional UI elements for OTP verification */}
          <p className="phonetitle">Verify Number</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="otpinput"
          />
          <button
            disabled={otp === ''}
            type="button"
            onClick={verifyOtp}
            className="button"
          >
            Verify OTP
          </button>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '36px',
              textAlign: 'left',
            }}
          >
            <div>

              <p>
                resend OTP:
                {' '}
                <strong>60</strong>
                {' '}
                secs
              </p>

            </div>
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
    </div>
  );
};

export default PhoneNumber;
