import React, { useState, useEffect, useContext, useRef } from 'react'
import { CurrentUserContext } from '../App';
import { Account, Order, TempItem } from '../types/types'

const Cart = () => {
  const user = useContext(CurrentUserContext);
  const [items, setItems] = useState<Array<TempItem>>([]);
  const [account, setAccount] = useState<Account | null>(null);
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

  const handleForm = () => {
    const addr = addressRef.current? addressRef.current.value : '';
    const phone = phoneRef.current? phoneRef.current.value : '';
    const temp = account;
    if(temp) {
      temp.address = addr;
      temp.phone = phone;
      setAccount(temp);
    }
  }

  const handleOrder = () => {
    if(account && items) {
      if(!account.address || !account.phone) {
        setShowForm(true);
        return;
      }
      const submitOrder = async () => {
        const result = await fetch('http://localhost:8080/api/orders', 
          {method:'POST', 
          mode: 'cors', 
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({user: account, items: items})}
        );
        const res: Order = await result.json();
      }
      submitOrder();
      setSuccess(true);
      setShowForm(false);
    }

  }



  return (
    <div className='cart'>
      <h2>Cart</h2>
      {items && items.map((item, index) => 
        <div key={index}>
          <p>{item.product.name} x{item.amount} {item.product.price} kr</p>
        </div>)
      }
      {showForm && <form className='input-box' onSubmit={handleForm}>
        <div>Please fill in the form</div>
        <input className='input-address' ref={addressRef} type="text" placeholder='Enter address' required />
        <input className='input-phone' ref={phoneRef} type="text" placeholder='Enter phone number' required />
        <button className='btn btn-form' type='submit'>Confirm</button>
        </form>}
      {items &&<button className='btn btn-order' type='submit' onClick={handleOrder}>Submit Order</button>}
    </div>
  )
}

export default Cart