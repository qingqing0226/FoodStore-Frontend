import React, { Dispatch, SetStateAction } from 'react';
import { Product } from '../types/types';
interface ICardProps {
    product: Product,
    setCurrentCard: Dispatch<SetStateAction<Product>>
}

const Card = ({product, setCurrentCard}: ICardProps) => {
  return (
    <div className='card' onClick={() => setCurrentCard(product)}>
        <img src={product.image} />
        <p>{product.name}</p>
        <p>{product.price} kr</p>
        <p>Stock: {product.stock}</p>
    </div>
  )
}

export default Card