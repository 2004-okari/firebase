import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import FirebaseHome from './Firebase/Google/FirebaseHome';
import PhoneNumber from './Firebase/Phone/PhoneNumber';
import EmailSIgnIn from './Firebase/Email/EmailSIgnIn';
import EmailHome from './Firebase/Email/EmailHome';
import PhoneHome from './Firebase/Phone/PhoneHome';
import EmailSignUp from './Firebase/Email/EmailSignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/firebasehome" element={<FirebaseHome />} />
        <Route path="/phone" element={<PhoneNumber />} />
        <Route path="/emailsignin" element={<EmailSIgnIn />} />
        <Route path="/emailsignup" element={<EmailSignUp />} />
        <Route path="/emailhome" element={<EmailHome />} />
        <Route path="/phonehome" element={<PhoneHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
