import React from 'react';
import { Route, Routes } from 'react-router';

import Homepage from './module/public/Homepage';
import { Product } from './module/public/productlist/productpage';
import { GetProduct } from './module/public/productparam';
import { Cart } from './module/public/cart';
import { Order } from './module/public/order';
import { Success } from './module/public/success';
import { Login } from './module/private/login';
import { OrderManagement } from './module/private/ordermanagement';
import { ProductManage } from './module/private/product';
import { ManageProduct } from './module/private/productparam';
import { CreateProduct } from './module/private/createproduct';

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

