import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import Homepage from './public/Homepage';
import { Product } from './public/productlist/productpage';
import { GetProduct } from './public/productparam';
import { Cart } from './public/cart';
import { Order } from './public/order';
import { Success } from './public/success';
import { Login } from './private/login';
import { OrderManagement } from './private/ordermanagement';
import { ProductManage } from './private/product';
import { ManageProduct } from './private/productparam';
import { CreateProduct } from './private/createproduct';
import { CartContext,  ICart } from '../store/Provide';
import Homebar from './public/homebar/homebar';
import Footer from './public/footer';



export const PublicRouter =()=>{
  const [cart, setCart] = useState<ICart[]>(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '{}') : []);
  const location =useLocation()
  console.log(location)
    return(
    <CartContext.Provider value={{cart,setCart}}>
      <Homebar/>
      <div style={{height:'80px',width:'100%',backgroundColor:'transparent'}}></div>
      <Routes>
        <Route path='/' element={<Homepage/>} />    
        <Route path='/products/' element={<Product/>}/>
        <Route path='/products/:id' element={<GetProduct/>}/> 
        <Route path='/order' element={<Order/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/admin/login' element={<Login/>}/>
        <Route path='/admin' element={<OrderManagement/>}/>
        <Route path='/admin/products' element={<ProductManage/>}/>
        <Route path='/admin/products/:id' element={<ManageProduct/>}/>
        <Route path='/admin/createproduct' element={<CreateProduct/>}/>
        </Routes>
        {!location.pathname.includes('/admin')&&<Footer/>}
      </CartContext.Provider>)
}

