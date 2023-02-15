import React, {useEffect, useState, createContext} from 'react';
import jwtDecode from 'jwt-decode';
import './App.css';
import { Product, Section, User } from './types/types';
import Nav from './components/Nav';
import {Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import MyAccount from './components/MyAccount';
import Footer from './components/Footer';

interface Response {
  credential:string
}
export const CurrentUserContext = createContext<User | null>(null);

export const ProductsContext = createContext<Array<Product>>([]);

export const SectionsContext = createContext<Array<Section>>([]);

function App() {
  localStorage.clear();
  const [user, setUser] = useState<User>({} as User);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [sections, setSections] = useState<Array<Section>>([]);
  
  const handleCallbackResponse = (response: Response) => {
    const current_user: User = jwtDecode(response.credential);
    setUser(current_user);
    document.getElementById('signIn')!.hidden = true;
  }

  const handleSignOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUser({} as User);
    document.getElementById('signIn')!.hidden = false;
  }

  useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id: "525552907871-ac5hbjc1dd4rm3bs35f5hil8u43d9u2v.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    window.google.accounts.id.renderButton(document.getElementById("signIn") as HTMLElement, {
      theme: "outline", size: "large",
      type: 'standard'
    });

    window.google.accounts.id.prompt();
    const getProducts = async () => {
      const results = await fetch('http://localhost:8080/api/products', {mode: 'cors', headers: {'Content-Type': 'application/json'}});
      const products = await results.json();
      setProducts(products);
    }
    getProducts();

    const getSections = async () => {
      const results = await fetch('http://localhost:8080/api/sections', {mode: 'cors', headers: {'Content-Type': 'application/json'}});
      const sections = await results.json();
      setSections(sections);
    }

    getSections();
  }, []);


  return (
    <CurrentUserContext.Provider value={user}>
      <ProductsContext.Provider value={products}>
        <SectionsContext.Provider value={sections}>
          <div className="App">
            <Nav user={user} handleSignOut={handleSignOut} />
            
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/account' element={<MyAccount />}></Route>
              </Routes>
            
            <Footer />
          </div>
        </SectionsContext.Provider>
      </ProductsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
