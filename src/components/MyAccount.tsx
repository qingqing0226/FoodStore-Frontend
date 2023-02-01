import React, {useContext, useState, useEffect} from 'react';
import { CurrentUserContext } from '../App';
import { Account, Order } from '../types/types';

const MyAccount = () => {
  const user = useContext(CurrentUserContext);
  const [account, setAccount] = useState<Account | null>(null);
  const [orders, setOrders] = useState<Array<Order>>([]);
  useEffect(() => {
    const getAccount = async () => {
      const result = await fetch('http://localhost:8080/api/users/' + user?.name.split(' ').join('+') + '/'+ user?.email, {mode: 'cors', headers: {'Content-Type': 'application/json'}});
      const data: Account = await result.json();
      if(data) {
        setAccount(data);
      } 
    }
    getAccount();

  }, []);

  useEffect(() => {
    if(!account) return;
    const getOrders = async () => {
      const results = await fetch('http://localhost:8080/api/orders/' + account?.id, {mode: 'cors', headers: {'Content-Type': 'application/json'}});
      const data = await results.json();
      setOrders(data);
    }

    getOrders();
  }, [account]);

  return (
    <div>
      {account && 
        <div className='account-info'>
          <h2>My Account</h2>
          <h2>{account.name}</h2>
          <h5>{account.email}</h5>
          <p>{account?.address}</p>
        </div>
      }
      <div className='orders'>
        <h2>Orders</h2>
        {!orders && <div>You have no order yet.</div>} 
        {orders && orders.map(o => <div key={o.id}>
          <p>id: {o.id}</p>
          <p>items: {o.items.length}</p>
          <p>delivery: {o.delivered ? 'delivered' : 'on the way'}</p>
          <p>payment: {o.paid ? 'paid' : 'not paid'}</p>
        </div>)}
      </div>
    </div>
  )
}

export default MyAccount