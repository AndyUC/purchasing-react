import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { MenuBar } from './menubar';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import '../../../css/nav/homebar.css'

import barIcon from '../../../image/bars-solid.svg'
import cartIcon from '../../../image/cart-shopping-solid.svg'
import warehouse from '../../../image/warehouse.svg'
import create from '../../../image/create.svg'
import { Cart } from '../cart';
import { useCartContext } from '../../../store/Provide';

const CartNav=()=>{
   const {cart}= useCartContext();
   const [amount, setAmount] = useState(0);
   const [showCart, setShowCart] = useState(false);
   useEffect(()=>{
     let total =0;
     cart.forEach((cart:any )=> {
       total +=cart.price*cart.quantity
     })
   setAmount(total)},[cart])

  return <div className='cartIconWraper' >
         {cart.length>0&&<div className='cartCount'>{cart.length}</div>}
         {cart.length>0&&<div className='Amount'>{amount} US$ </div>}
         <img className="cart" role='button' onClick={()=>setShowCart(!showCart)} alt="cart" src={cartIcon}  />
         {showCart&&<div>
            <Cart  setShowCart={setShowCart}/>
            <div className='cartSiteMark' role='button'  onClick={()=>setShowCart(!showCart)}/>
            </div>}
    </div >
}


const Homebar=()=>{
   const location= useLocation()
    const [state,setState]=useState(false)
    const handleOnclick=()=>{
       setState(!state)
    }
    return(
    <div>
    <div className='cover'>
       
        <div className="box">
       
         
        {!location.pathname.includes('/admin')&&
        <CartNav/>}
        
        
        {location.pathname.includes('/admin')&&
        <div className='icon'>
            <Link to={'/admin/products'}>
         <img className="warehouse" alt="warehouse" src={warehouse}  />
         </Link >
         <Link to={'/admin/createproduct'}>
         <img className="create" alt="create" src={create}  />
         </Link >
        </div>
        }  
        </div>
 </div>
 <img className="bar" alt="bar" src={barIcon} role="button" onClick={handleOnclick} />
         {state&&
         <div>
         <MenuBar/>
         <div role='button' className='siteMark' onClick={()=>setState(!state)}/>
         </div>
        }
 </div>
)
}
export default Homebar;