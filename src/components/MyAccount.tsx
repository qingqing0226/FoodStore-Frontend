import React, {useContext, useState, useEffect} from 'react';
import { CurrentUserContext } from '../App';
import { Account, Order } from '../types/types';
import './MyAccount.css';

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
    <div className='account'>
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
        {orders.length === 0 && <div>You have no order yet.</div>} 
        {orders.length > 0 && orders.map(o => <div key={o.id}>
          <p>id: {o.id}</p>
          <p>items: {o.items.length > 0 && o.items.map((item, index) => <div key={index}>{item.product.name} {item.amount}</div>)}</p>
          <p>delivery: {o.delivered ? 'delivered' : 'on the way'}</p>
          <p>payment: {o.paid ? 'paid' : 'not paid'}</p>
        </div>)}
      </div>
    </div>
  )
}

export default MyAccount