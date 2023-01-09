import { useEffect, useRef, useState } from 'react';
import { useAccountContext } from '../../context/index';
import Container from 'react-bootstrap/Container';
import AccountService from '../../services';
import { Navbar, Table } from 'react-bootstrap';
import Helper from '../../../../common/Helper';

export default () => {
    const {
        balance, setBalance
    } = useAccountContext();
    const ref = useRef(false);
    const [financialMovementList, setFinancialMovementList] = useState([])
    const service = new AccountService()
    const getBalance = async () => {
        ref.current = true
        const response = await service.getBalance()
        setFinancialMovementList(response.data)
        setBalance(Helper.sum(response.data,'value'))
    }
    useEffect(() => {
        if (ref.current == false)
            getBalance()
    })

    return (
        <Container>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand>Account Movement/Balance</Navbar.Brand>
            </Navbar>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Previous Value</th>
                        <th>Value</th>
                        <th>Type</th>
                        <th>TransactionId</th>
                    </tr>
                </thead>
                <tbody>
                    {financialMovementList.length > 0 && (financialMovementList.map((item: any) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.previous_value}</td>
                                <td>{item.value}</td>
                                <td>{item.transaction_hash == '' ? 'Deposit' : 'Purchase'}</td>
                                <td>{item.transaction_hash}</td>
                            </tr>
                        )
                    }))

                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td>Balance</td>
                        <td>{balance}</td>
                    </tr>
                </tfoot>
            </Table>
        </Container>
    );
}