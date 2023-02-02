import React, { Dispatch, SetStateAction } from 'react';
import { Product } from '../types/types';
import './Home.css';
interface ICardProps {
    product: Product,
    setCurrentCard: Dispatch<SetStateAction<Product>>
}

const Card = ({product, setCurrentCard}: ICardProps) => {
  return (
    <div className='card' onClick={() => setCurrentCard(product)}>
      <div className='img-box'>
        <img className='product-img' src={product.image} />
      </div>
      <p className='product-name'>{product.name}</p>
      <p className='product-stock'>{product.stock} in stock</p>
      <p className='product-price'>{product.price} kr</p>
    </div>
  )
}

export default Card