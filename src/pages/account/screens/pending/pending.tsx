import { useEffect, useRef, useState } from 'react';
import { useAccountContext } from '../../context/index';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import AccountService from '../../services';
import { redirect } from 'react-router';
import Error from '../../../shared/Error';
import { Modal, Navbar, Table } from 'react-bootstrap';

export default () => {
    const {
        id, setId
    } = useAccountContext();
    const ref = useRef(false);
    const [pending, setPending] = useState([])
    const [image_base64, setImageBase64] = useState('')
    const [show, setShow] = useState(false)
    const service = new AccountService()

    const getPending = async () => {
        ref.current = true
        const response = await service.getPending()
        setPending(response.data)
    }
    useEffect(() => {
        if (ref.current == false)
            getPending()
    })

    const viewImage = (id: number, base64: string) => {
        setId(id)
        setImageBase64(base64)
        setShow(true)
    }

    const approve = async () => {
        const response = await service.approve(id)
        setShow(false)
        getPending()
    }
    const reject = async () => {
        const response = await service.reject(id)
        setShow(false)
        getPending()
    }


    return (
        <Container>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{id}</Modal.Title>
                </Modal.Header>
                <Modal.Body><img src={`data:image/jpeg;base64,${image_base64}`} width={500} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => approve()}>
                        Approve
                    </Button>
                    <Button variant="danger" onClick={() => reject()}>
                        Reject
                    </Button>
                </Modal.Footer>
            </Modal>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Pending transactions</Navbar.Brand>
            </Navbar>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Value</th>
                        <th>TransactionId</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pending.length > 0 && (pending.map((item: any) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.value}</td>
                                <td>{item.transaction_hash}</td>
                                <td><Button variant="success" type="button" onClick={() => viewImage(item.id, item.image_base64)}>
                                    View receipt
                                </Button></td>
                            </tr>
                        )
                    }))

                    }
                </tbody>
            </Table>
        </Container>
    );
}