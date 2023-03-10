import React, {useContext, useState, useEffect} from 'react';
import { CurrentUserContext } from '../App';
import { Account, Order } from '../types/types';
import './MyAccount.css';
import './Cart.css';
import Phone from './telephone.png';
import UserImg from './user.png';
import Email from './email.png';
import Address from './home.png';
import Pen from './edit.png';
import OrderDetail from './OrderDetail';
import EditAddress from './EditAddress';

const MyAccount = () => {
  const user = useContext(CurrentUserContext);
  const [account, setAccount] = useState<Account | null>(null);
  const [orders, setOrders] = useState<Array<Order> | null>(null);
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

    const updateAccount = async () => {
      const res = await fetch('http://localhost:8080/api/users/' + account.id, {method: 'PUT', mode: 'cors', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(account)});
      const data = await res.json();
      console.log(data);
    }

    getOrders();
    updateAccount();

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
              <div className='account-address'><img className='icon' src={Address} alt='address icon' /> {account?.address} <EditAddress account={account} setAccount={setAccount} /></div>
              <div className='account-phone'><img className='icon' src={Phone} alt='phone icon' /> {account.phone} <img className='icon' src={Pen} alt='pen icon' /></div>
            </div>
          </div>
        </div>
      }
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
            {orders && 
              orders.map(order => <tr key={order.id}>
                <td>{<OrderDetail order={order} />}</td>
                <td>{order.delivered ? 'Delivered' : 'On the way'}</td>
                <td>{order.paid ? 'paid' : 'unpaid'}</td>
                <td>{order.items.map(item => item.product.price * item.amount).reduce((accu, curr) => accu + curr, 0)}</td>
              </tr>)
            }
            {!orders && <tr><td colSpan={4}>You have no order yet</td></tr>}
          </table>
        </div>
      }
    </div>
  )
}

export default MyAccount