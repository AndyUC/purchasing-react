import React from 'react'
import { useState } from 'react';
import { MenuBar } from './menubar';
import { Link, useLocation } from 'react-router-dom';

import '../../../css/homebar.css'

import barIcon from '../../../image/bars-solid.svg'
import cartIcon from '../../../image/cart-shopping-solid.svg'
import warehouse from '../../../image/warehouse.svg'
import create from '../../../image/create.svg'


const Homebar=()=>{
   const location= useLocation()
    const [state,setState]=useState(false)
    const handleOnclick=()=>{
        if(state===true){
            setState(false)
        }else{
            setState(true)
        }
    }
    return(
    <div>
    <div className='cover'>
       
        <div className="box">
       
         <img className="bar" alt="bar" src={barIcon} role="button" onClick={handleOnclick} />
        {(location.pathname.includes('/api/v1')||(location.pathname==='/'))&&
        <Link to={'/api/v1/cart'}>
         <img className="cart" alt="cart" src={cartIcon}  />
         </Link >}
        
         {state&&<MenuBar/>
        }
        {location.pathname.includes('/enterprise/v1')&&
        <div className='icon'>
            <Link to={'/enterprise/v1/product'}>
         <img className="warehouse" alt="warehouse" src={warehouse}  />
         </Link >
         <Link to={'/enterprise/v1/createproduct'}>
         <img className="create" alt="create" src={create}  />
         </Link >
        </div>
        }  
        </div>
 </div>
 </div>
)
}
export default Homebar;