import React, { Dispatch, SetStateAction } from 'react';
import { Product } from '../types/types';
import Card from './Card';
import './Home.css';
interface ISectionProps {
    name: string,
    products: Product[],
    setCurrentCard: Dispatch<SetStateAction<Product>>
}

const Section = ({name, products, setCurrentCard}: ISectionProps) => {
  return (
    <details>
        <summary>{name.includes('_')? name.split('_').join(' ') : name}</summary>
        <div className='card-box'>
          {products.map(p => <Card product={p} setCurrentCard={setCurrentCard} />)}
        </div>
    </details>
  )
}

export default Section