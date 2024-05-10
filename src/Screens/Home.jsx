import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import GoogleSignInWithPopup from '../Firebase/Google/GoogleSIgninWithPopup';

const Home = () => {
  const navigation = useNavigate();

  return (
    <div className="App">
      <div className="outerdiv">
        <div className="innerdiv">
          <h2 className="title">Sign into My Application</h2>
          <p className="subtitle">Welcome back! Please sign in to continue</p>
          <div className="buttons">
            <GoogleSignInWithPopup />
            <div className="or">
              <div className="line" />
              <p style={{ margin: '0 10px' }}>or</p>
              <div className="line" />
            </div>
            <button
              className="button"
              type="button"
              onClick={() => navigation('/emailsignin')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 100 100"
                id="Email"
              >
                <path
                  d="M34.05 50 9 66.31V33.69L34.05 50zm31.9 0L91 66.31V33.69L65.95 50zm-3.66 2.39-11.2 7.29c-.33.21-.71.32-1.09.32s-.76-.11-1.09-.32l-11.2-7.29L10.66 70l-1.57 1.02C9.58 73.84 12.04 76 15 76h70c2.96 0 5.42-2.15 5.91-4.98L89.33 70 62.29 52.39zM50 55.61 89.33 30l1.58-1.02C90.42 26.15 87.96 24 85 24H15c-2.96 0-5.42 2.16-5.91 4.98L10.66 30 50 55.61z"
                  fill="#245953"
                  className="color000000 svgShape"
                />
              </svg>
              Continue with Email
            </button>
            <button
              className="button"
              type="button"
              onClick={() => navigation('/phone')}
            >
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                id="phone"
              >
                <path
                  fill="#FF8787"
                  d="M13.216 8.064c-.382-4.394-4.966-6.55-5.16-6.638a.974.974 0 0 0-.582-.078c-5.292.878-6.088 3.958-6.12 4.086a.99.99 0 0 0 .02.54c6.312 19.584 19.43 23.214 23.742 24.408.332.092.606.166.814.234a.99.99 0 0 0 .722-.042c.132-.06 3.248-1.528 4.01-6.316a.997.997 0 0 0-.096-.612c-.068-.132-1.698-3.234-6.218-4.33a.977.977 0 0 0-.884.21c-1.426 1.218-3.396 2.516-4.246 2.65-5.698-2.786-8.88-8.132-9-9.146-.07-.57 1.236-2.572 2.738-4.2a.998.998 0 0 0 .26-.766z"
                />
              </svg>
              {' '}
              Continue with Phone
            </button>
          </div>
        </div>
        <div className="footer">
          <p className="copyright">
            Secured by
            {' '}
            {'  '}
            <svg
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="firebase"
            >
              <path
                fill="#FFA000"
                d="m14.714 8.669-2.4 2.235-2.228-4.496 1.151-2.585c.291-.516.767-.522 1.058 0l2.419 4.846z"
              />
              <path
                fill="#F57F17"
                d="m12.314 10.903-8.979 8.351 6.751-12.846 2.228 4.495z"
              />
              <path
                fill="#FFCA28"
                d="M17.346 5.251c.43-.41.873-.271.985.31l2.334 13.58-7.742 4.648c-.272.152-.992.211-.992.211s-.655-.08-.906-.218l-7.689-4.528 14.01-14.003z"
              />
              <path
                fill="#FFA000"
                d="m10.086 6.408-6.75 12.846L6.344.477c.113-.582.443-.641.74-.126l3.002 6.057z"
              />
            </svg>
            {' '}
            Firebase
          </p>
          <div
            style={{
              height: '1px',
              width: '100%',
              backgroundColor: '#d9d9d9',
              margin: '12px auto',
            }}
          />
          <p className="author">
            <TypeAnimation
              sequence={[
                'Okari Rooney Nyandika',
                1000,
                'Rooney Okari Nyandika',
                1000,
                'Nyandika Rooney Okari',
                1000,
                'Okari Nyandika Rooney',
                1000,
                'Rooney Nyandika Okari',
                1000,
                'Nyandika Okari Rooney',
                1000,
                'Front-End & Mobile App Developer',
                1000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
