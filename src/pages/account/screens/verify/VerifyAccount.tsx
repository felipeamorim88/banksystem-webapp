import { useState } from 'react';
import { useAccountContext } from '../../context/index';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import AccountService from '../../services';
import { useNavigate, useLocation } from 'react-router';
import Error from '../../../shared/Error';
import AsyncStorage from '../../../../common/AsyncStorage';
import { Navbar } from 'react-bootstrap';


export default () => {
    const {
        id, setId,
        userName, setUserName,
        password, setPassword,
    } = useAccountContext();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname);
    const service = new AccountService()
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')
    const verify = async () => {
        if(userName == ''){
            setError('Username cannot be empty')
            setShowError(true)
            return
        }

        if(password == ''){
            setError('Password cannot be empty')
            setShowError(true)
            return
        }

        const response = await service.verifyAccount(userName, password)
        if (response.status != 200) {
            setError(response.data.toString())
            setShowError(true)
        } else {
            console.log(response.data)
            await AsyncStorage.setItem('account_id', response.data.account_id)
            navigate('/balance', { replace: true })
            navigate(0)
        }

    }

    return (
        <Container>
            
            <Navbar bg="light" expand="lg">
            <Navbar.Brand>Account verification</Navbar.Brand>
            </Navbar>
            <Error showError={showError} error={error}   close={() => setShowError(false)} />
            
            <Form>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="button" onClick={() => verify()}>
                    Validate Account
                </Button>
            </Form>
        </Container>
    );
}