import { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router';
import { useNavigate, } from 'react-router-dom';
import Auth from '../../common/Auth';
import AsyncStorage from '../../common/AsyncStorage';

const Header = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const ref = useRef(false);

  const getAuth = async () => {
    ref.current = true
    setIsAdmin(await Auth.isAdmin())
    if(!await Auth.loggedIn()){
      navigate('/login', { replace: true })
      navigate(0)
    }

  }
  useEffect(() => {
    if (ref.current == false)
      getAuth()
  })
  const logout = async () => {
    await AsyncStorage.clear();
    navigate('/login', { replace: true })
    navigate(0)
  }

  return (
    <div style={{ marginLeft: '10%', marginRight: '10%' }}>
      <Navbar bg="primary" expand="lg" style={{ borderRadius: 3 }}>
        <Container style={{ paddingLeft: '0.5%' }}>
          <Nav className="me-auto">
          {!isAdmin && <Nav.Link href="/balance" style={{ color: 'white' }}>Balance</Nav.Link>}
            <Nav.Link href="/deposit" style={{ color: 'white' }}>Deposit</Nav.Link>
            <Nav.Link href="/purchase" style={{ color: 'white' }}>Purchase</Nav.Link>

            {isAdmin && <Nav.Link href="/pending" style={{ color: 'white' }}>Pending transactions</Nav.Link>}


            <Nav.Link href="#" style={{ color: 'white' }} onClick={() => logout()}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Header;