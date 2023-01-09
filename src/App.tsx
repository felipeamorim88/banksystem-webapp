import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import CreateAccount from './pages/account/screens/create/';
import VerifyAccount from './pages/account/screens/verify/';
import AccountBalance from './pages/account/screens/balance/';
import Deposit from './pages/account/screens/deposit/';
import Pending from './pages/account/screens/pending/';
import Purchase from './pages/account/screens/purchase/';
import Header from './pages/shared/header';
import Auth from './common/Auth';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [hasAccount, setHasAccount] = useState(false)
  const ref = useRef(false);

  const getAuth = async () => {
    ref.current = true
    setIsAdmin(await Auth.isAdmin())
    setLoggedIn(await Auth.loggedIn())
    setHasAccount(await Auth.hasAccount())
    console.log(isAdmin, loggedIn, hasAccount)
  }
  useEffect(() => {
    if (ref.current == false)
      getAuth()
  })
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={loggedIn ? (hasAccount ? <VerifyAccount /> : <CreateAccount />) : <Login />} />
        <Route path="/signup" element={loggedIn ? (hasAccount ? <VerifyAccount /> : <CreateAccount />) : <Signup />} />
        {/*Authenticated routes*/}
        <Route path="/" element={<Header />} >
          <Route path="/create-account" element={loggedIn ? (hasAccount ? <VerifyAccount /> : <CreateAccount />) : <Login />} />
          <Route path="/verify-account" element={loggedIn ? <VerifyAccount /> : <Login />} />
          <Route path="/balance" element={loggedIn ? <AccountBalance /> : <Login />} />
          <Route path="/deposit" element={loggedIn ? <Deposit /> : <Login />} />
          <Route path="/pending" element={(loggedIn &&loggedIn) ? <Pending /> : <Login />} />
          <Route path="/purchase" element={loggedIn ? <Purchase /> : <Login />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
