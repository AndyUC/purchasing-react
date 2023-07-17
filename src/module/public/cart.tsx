import React, {Fragment,useState,useEffect, Component, ChangeEvent, useRef} from "react";
import { Link } from "react-router-dom";

import '../../css/cart.css'

type CartProductProps={
    index:number,
    productid:string,
    productname:string,
    imagePath:string,
    catalog:string,
    size:string,
    price:number,
    quantity:number,
    remove:Function,
    updateQuantity:Function,
    updateSize:Function

    
  }
  
 export const CartProduct=(props:CartProductProps)=>{
   
    const handleAddclick=()=>{
        props.updateQuantity(props.index,(props.quantity+1))
      }
      const handleDecreaseClick=()=>{
        if(props.quantity>0){
          props.updateQuantity(props.index,(props.quantity-1))
        }
    }
   const handleChange=(event:any)=>{
    props.updateSize(props.index,event.target.value)
   }
    return(
    <div className="cartProductBox" >
        <div className="cartProductWrapper">
          <div className="cartProduct">
            <img className="productimg" alt={props.productname} src={props.imagePath} />
            <div className="productname">{props.productname}</div>
            <div className="price">{props.price}</div>
            <div className="quantityWrapper">QUANTITY:
                <button className="button" onClick={handleAddclick}>+</button>
                <div className="quantity">{props.quantity}</div>
                <button className="button" onClick={handleDecreaseClick}>-</button>
            </div>
            <div className="size wrap" >
                <div className="size">
                    Size : 
                {(props.catalog==='Chain'||props.catalog==='Tie')?
            (<select name="sizeSelection"  value={props.size} onChange={handleChange} >
            <option value={'sizeS'}>SizeS</option>
            <option value={'sizeM'}>SizeM</option>
            <option value={'sizeL'}>SizeL</option>
          </select>)
              :
              
              (  <select name="sizeSelection" defaultValue={props.size} onChange={handleChange} >
              <option value='size39'>Size39</option>
              <option value='size40'>Size40</option>
              <option value='size41'>Size41</option>
              <option value='size42'>Size42</option>
            </select>)
                }
            </div>
            <button className="remove"onClick={()=>props.remove(props.index)}>Remove</button>
            </div>
            </div>
        </div>
      </div>  
    )
  }

 export const Cart=()=>{
    const [carts,setCarts]=useState( localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '{}') : [])
  let newcarts= [...carts]
  console.log(carts)
    const updateQuantity=(index:number,quantity:number)=>{
      carts[index].quantity=quantity
      setCarts(newcarts)
    }
    const remove=(index:number)=>{
        if(index===0){
            newcarts.shift()
        }else{
            newcarts.splice(index,1)
        }
       
        setCarts(newcarts)
    }
    const updateSize=(index:number,size:string)=>{
        newcarts[index].size=size
        setCarts(newcarts)
    }
    const saveCart=()=>{
        localStorage.setItem('cart',JSON.stringify(carts))
    }
    return(
    <div>
        <div>
            { carts.map((cart:any,index:number)=>
              <li key={index}>  
                <CartProduct
                index={index}
                productid={cart._id}
                productname={cart.productname}
                imagePath={cart.imagePath}
                size={cart.size}
                price={cart.price}
                quantity={cart.quantity}
                catalog={cart.catalog}
                remove={remove}
                updateQuantity={updateQuantity}
                updateSize={updateSize}
                />
                </li>)}
                
        </div>
        <div>
       <button onClick={saveCart}>Save Change</button>
       <Link className="saveAndBuy" to={'/api/v1/order'}>
       <button onClick={saveCart}>Save and Buy</button>
       </Link>
       </div>
    </div>
      )
  }
  