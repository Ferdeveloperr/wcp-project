

// src/App.js
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Home from './components/home/Home';
import SignUp from './components/signUp/SignUp';
import Terms from './components/terms/Terms';
import UserAreaConsultant from './components/userAreaConsultant/UserAreaConsultant';
import UserArea from './components/userArea/UserArea';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import WalletList from './components/userArea/WalletList';
import ReceiveWallet from './components/userAreaConsultant/ReceiveWallet';
import UserInfo from './components/userArea/UserInfo';
import Logout from './components/userArea/Logout';
import AccountConfirmation from './components/userArea/AccountConfirmation';
import Error403 from './components/errors/Error403'
import Error404 from './components/errors/Error404'
import Error500 from './components/errors/Error500'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/UserAreaConsultant" element={<UserAreaConsultant />} />
        <Route path="/UserArea" element={<UserArea />} />
        <Route path="/WalletList" element={<WalletList />} />
        <Route path="/ReceiveWallet" element={<ReceiveWallet />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/UserInfo" element={<UserInfo />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/AccountConfirmation" element={<AccountConfirmation />} />
        <Route path="/403" element={<Error403 />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


