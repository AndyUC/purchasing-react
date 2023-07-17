import React from 'react';
import { Route, Routes } from 'react-router';

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

export const PublicRouter =()=>{
    return(<Routes>
        <Route path='/' element={<Homepage/>} />  
        <Route path='/api/v1/cart' element={<Cart/>}/>     
        <Route path='/api/v1/products' element={<Product/>}/>
        <Route path='/api/v1/products/:id' element={<GetProduct/>}/> 
        <Route path='/api/v1/order' element={<Order/>}/>
        <Route path='/api/v1/success' element={<Success/>}/>
        <Route path='/api/v1/login' element={<Login/>}/>
        <Route path='/enterprise/v1/order' element={<OrderManagement/>}/>
        <Route path='/enterprise/v1/product' element={<ProductManage/>}/>
        <Route path='/enterprise/v1/product/:id' element={<ManageProduct/>}/>
        <Route path='/enterprise/v1/createproduct' element={<CreateProduct/>}/>
      </Routes>)
}

