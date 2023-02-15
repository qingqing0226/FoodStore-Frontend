import React, {useState, Dispatch, SetStateAction } from 'react';
import { Product, TempItem } from '../types/types';
import './CardDetail.css';
interface ICardDetailProps {
	product: Product,
	setCurrentCard: Dispatch<SetStateAction<Product>>
}

const CardDetail = ({product, setCurrentCard}: ICardDetailProps) => {
  const [orderAmount, setOrderAmount] = useState(0);
	const [showSuccess, setShowSuccess] = useState(false);
	const handleSelect = () => {
		const itemsInCart: string | null = localStorage.getItem('items');
		if(itemsInCart) {
			const itemList: TempItem[] = JSON.parse(itemsInCart);
			for(let i = 0; i < itemList.length; i++) {
				if(itemList[i].product.id === product.id) {
					itemList[i] = {product: product, amount: itemList[i].amount + orderAmount};
					localStorage.setItem('items', JSON.stringify(itemList));
					setShowSuccess(true);
					return;
				}
			}
			itemList.push({product: product, amount: orderAmount});
			localStorage.setItem('items', JSON.stringify(itemList));
			setShowSuccess(true);
			return;
		}
		localStorage.setItem('items', JSON.stringify([{product: product, amount: orderAmount}]));
		setShowSuccess(true);
	}

  return (
    <div className='carddetail-container'>
        <p className='back' onClick={() => setCurrentCard({} as Product)}><span className='less-than'>&#60;</span> Back</p>
        <div className='img-details'>
			<img src={product.image} className='image' width={150} height={150} alt={product.name} />
			<div className='details'>
				<h3>{product.name}</h3>
				<p className='stock'>{product.stock} in stock</p>
				<input type='range' min={0} max={product.stock} value={orderAmount} step={1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrderAmount(Number(e.target.value))} />
				<p>select {orderAmount}</p>
				<button type='submit' onClick={handleSelect}>Order</button>
				{showSuccess && <div>{orderAmount} items have been added to the cart.</div>}
			</div>	
        </div>
    </div>
  )
}

export default CardDetail