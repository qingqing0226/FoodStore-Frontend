import React, {useContext, useState} from 'react';
import { CurrentUserContext, ProductsContext, SectionsContext } from '../App';
import { Product } from '../types/types';
import CardDetail from './CardDetail';
import Section from './Section';

const Home = () => {
  const user = useContext(CurrentUserContext);
  const products = useContext(ProductsContext);
  const sections = useContext(SectionsContext);
  const [currentCard, setCurrentCard] = useState<Product>({} as Product);


  return (
    <div className='home'>
      {Object.keys(currentCard).length === 0 && 
        <div className='section-box'>
          {sections?.map(s => {
            const filtered = products.filter(p => p.section.id === s.id);
            return <Section name={s.name} products={filtered} setCurrentCard={setCurrentCard} />
          })}
        </div>
      }
      {Object.keys(currentCard).length !== 0 && <CardDetail product={currentCard} setCurrentCard={setCurrentCard}  />}

    </div>
  )
}

export default Home