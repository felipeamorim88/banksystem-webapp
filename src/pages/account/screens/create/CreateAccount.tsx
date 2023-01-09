import { useState } from 'react';
import { useAccountContext } from '../../context/index';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import AccountService from '../../services';
import Error from '../../../shared/Error';
import { useNavigate } from 'react-router-dom';
import AsyncStorage from '../../../../common/AsyncStorage';
import { Navbar } from 'react-bootstrap';

export default () => {
    const {
        id, setId,
        password, setPassword,
    } = useAccountContext();
    const navigate = useNavigate();
    const service = new AccountService()
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')
    const create = async () => {
        if(password == ''){
            setError('Password cannot be empty')
            setShowError(true)
            return
        }
        if(password.length < 4){
            setError('Min. Password length: 4')
            setShowError(true)
            return
        }
        const response = await service.createAccount(password)
        if (response.status != 201) {
            setError(response.data.toString())
            setShowError(true)
        } else {
            await AsyncStorage.setItem('account_id', response.data.account_id)
            navigate('/balance', { replace: true })
            navigate(0)
        }

    }

    return (
        <Container>
            
            <Navbar bg="light" expand="lg">
            <Navbar.Brand>Create Account</Navbar.Brand>
            </Navbar>
            <Error showError={showError} error={error}  close={() => setShowError(false)} />
            
            <Form className='centered'>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={() => create()}>
                    Set Account Password
                </Button>
            </Form>
        </Container>
    );
}