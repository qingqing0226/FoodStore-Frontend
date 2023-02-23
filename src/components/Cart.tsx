import React, { useState, useEffect, useContext, useRef } from 'react'
import { CurrentUserContext } from '../App';
import { Account, Order, TempItem } from '../types/types';
import './Cart.css';

const Cart = () => {
  const user = useContext(CurrentUserContext);
  const [items, setItems] = useState<Array<TempItem> | null>();
  const [account, setAccount] = useState<Account | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const itemsInCart: string | null = localStorage.getItem('items');
    if(itemsInCart) {
      const itemList: TempItem[] = JSON.parse(itemsInCart);
      setItems(itemList);
    }

    const getAccount = async () => {
      const result = await fetch('http://localhost:8080/api/users/' + user?.name.split(' ').join('+') + '/'+ user?.email, {mode: 'cors', headers: {'Content-Type': 'application/json'}});
      const data: Account = await result.json();
      if(data) {
        setAccount(data);
      } 
    }
    getAccount();
  }, []);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addr = addressRef.current? addressRef.current.value : '';
    const phone = phoneRef.current? phoneRef.current.value : '';
    const temp = account;
    if(temp) {
      temp.address = addr;
      temp.phone = phone;
      setAccount(temp);
      setShowInfo(true);
    }
  }

  const handleDecrease = (e: React.MouseEvent<HTMLButtonElement>, item: TempItem) => {
    e.preventDefault();
    if(item.amount === 1) {
      if(items) {
        const copy = [...items];
        const filtered = copy.filter(i => i.product.id !== item.product.id);
        setItems(filtered);
        localStorage.setItem('items', JSON.stringify(filtered));
      }

    } else if(item.amount > 1){
      if(items) {
        const copy = [...items];
        copy.filter(i => i.product.id === item.product.id).forEach(ele => ele.amount = ele.amount - 1);
        setItems(copy);
        localStorage.setItem('items', JSON.stringify(copy));
      }
    }
  }

  const handleIncrease = (e: React.MouseEvent<HTMLButtonElement>, item: TempItem) => {
    e.preventDefault();
    if(item.amount < item.product.stock) {
      if(items) {
        const copy = [...items];
        copy.filter(i => i.product.id === item.product.id).forEach(ele => ele.amount = ele.amount + 1);
        setItems(copy);
        localStorage.setItem('items', JSON.stringify(copy));
      }
    }

  }

  const handleOrder = () => {
    if(account && items) {
      if(!account.address || !account.phone) {
        setShowForm(true);
        return;
      }
      const submitOrder = async () => {
        const body = '{"user": ' + JSON.stringify(account) + ', "items": ' + JSON.stringify(items) + '}';
        const result = await fetch('http://localhost:8080/api/orders', 
          {method:'POST', 
          mode: 'cors', 
          headers: {'Content-Type': 'application/json'}, 
          body: body}
        );
        const res: Order = await result.json();
        localStorage.clear();
      }
      submitOrder();
      setSuccess(true);
      setShowForm(false);
      setItems(null);
    }

  }

  return (
    <div className='cart'>
      <h2 className='heading'>Cart</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        {!items && <tr><td colSpan={3}>No items yet</td></tr>}
        {items && items.map((item, index) => 
          <tr key={index}>
            <td>{item.product.name}</td>
            <td>{item.product.price}</td>
            <td>
              <button className='btn-dec' type='submit' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDecrease(e, item)}>-</button> 
              {' ' + item.amount + ' '} 
              <button className='btn-inc' type='submit' onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleIncrease(e, item)}>+</button> 
            </td>
          </tr>)
        }
        {items && <tr><td colSpan={3}>Total: {items.map(item => item.product.price * item.amount).reduce((accum, curr) => accum + curr, 0)} SEK</td></tr>}
      </table>
      
      {showForm && <form className='input-box' onSubmit={handleForm}>
        <div>Please fill in the form</div>
        <input className='input-address' ref={addressRef} type="text" placeholder='Enter address' required />
        <input className='input-phone' ref={phoneRef} type="text" placeholder='Enter phone number' required />
        <button className='btn btn-form' type='submit'>Confirm</button>
        </form>}
      {showInfo && 
        <div>
          <p>Address: {account?.address}</p>
          <p>Phone no: {account?.phone}</p>
          <p>If the information above is correct, you can submit the order.</p>
        </div>
      }
      {items &&<button className='btn btn-order' type='submit' onClick={handleOrder}>Submit Order</button>}
      {success && <p className='congrats'>Congrats! You order has been accepted.</p>}
    </div>
  )
}

export default Cart