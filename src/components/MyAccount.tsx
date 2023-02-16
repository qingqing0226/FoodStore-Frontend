import React, {useContext, useState, useEffect} from 'react';
import { CurrentUserContext } from '../App';
import { Account, Order } from '../types/types';
import './MyAccount.css';
import './Cart.css';
import Phone from './telephone.png';
import UserImg from './user.png';
import Email from './email.png';
import Address from './home.png';

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
          <div className='img-info-box'>
            <img className='account-img' src={user?.picture} alt={user?.name} />
            <div className='info-box'>
              <div className='account-name'><img className='icon' src={UserImg} alt='user icon' /> {account.name}</div>
              <div className='account-email'><img className='icon' src={Email} alt='email icon' /> {account.email}</div>
              <div className='account-address'><img className='icon' src={Address} alt='address icon' /> {account?.address}</div>
              <div className='account-phone'><img className='icon' src={Phone} alt='phone icon' /> {account.phone}</div>
            </div>
          </div>
        </div>
      }
      <hr />
      {account &&       
        <div className='orders'>
          <h2>Orders</h2>
          <table>
            <tr>
              <th>ID</th>
              <th>Delivery</th>
              <th>Payment</th>
              <th>Total Price</th>
            </tr>
            {orders.length > 0 && 
              orders.map(order => <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.delivered ? 'Delivered' : 'On the way'}</td>
                <td>{order.paid ? 'paid' : 'unpaid'}</td>
                <td>{order.items.map(item => item.product.price * item.amount).reduce((accu, curr) => accu + curr, 0)}</td>
              </tr>)
            }
            {orders.length === 0 && <tr><td colSpan={4}>You have no order yet</td></tr>}
          </table>
        </div>
      }
    </div>
  )
}

export default MyAccount