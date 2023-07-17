import React, {  useState } from "react";
import axios from "axios";
import { CartProduct } from "./cart";
import '../../css/order.css'
import {  useNavigate } from "react-router-dom";



const BuyCart=()=>{
    const [carts,setCarts]=useState( localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '{}') : [])
  let newcarts= [...carts]
  console.log(carts)
    const updateQuantity=(index:number,quantity:number)=>{
      carts[index].quantity=quantity
      setCarts(newcarts)
    }
    const remove=(index:number)=>{
       newcarts.splice(index,index+1)
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
    </div>
      )
  }
export const Order=()=>{
    const client = axios.create({
        baseURL: "http://localhost:3000" 
      });
    let navigate = useNavigate()
    const [carts,setCarts]=useState( localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '{}') : [])
    const [orderName, setOrderName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
   
   const  addpost=async()=>{
    const cartdata: { productid: string; size: string; quantity: number; }[]=[]
    carts.map((cart:any)=>cartdata.push({productid:cart.productid,size:cart.size,quantity:cart.quantity}))
    console.log(cartdata)
    try {
        
       const res= await client.post('/api/v1/order',{
            orderName:orderName,
            phoneNumber:phoneNumber,
            address:address,
            email:email,
            cartdata:cartdata
    })  
    console.log(res.data)
    console.log('success')
    localStorage.removeItem('cart')
    navigate('http://localhost:3001/api/v1/success')
    } catch(error:any){
      window.alert(error.response.data.msg)
  }
    
   }
    let newcarts= [...carts]
    console.log(carts)
    const updateQuantity=(index:number,quantity:number)=>{
        newcarts[index].quantity=quantity
        setCarts(newcarts)
      }
      const remove=(index:number)=>{
         newcarts.splice(index,index+1)
          setCarts(newcarts)
      }
      const updateSize=(index:number,size:string)=>{
          newcarts[index].size=size
          setCarts(newcarts)
      }
  
    const emailpattern = "/^(([^<>()[\]\\.,;:\s@"+'"]+(\.[^<>()[\]\\.,;:\s@'+'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
    return(
        <div className="OrderWrapper">
            <h1 className="Header">GET YOUR ORDER</h1>
            <div className="Wrapper">
                 <a>Your name</a>
                <input className="textbox" key={'cusName'} onChange={(e)=>setOrderName(e.target.value)} placeholder="Please provide your Name"/>
            </div>
            <div className="Wrapper">
                 <a>Your phoneNumber</a>
                <input className="textbox" key={'cusPhone'} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="Please provide your phoneNumber" pattern="[0-9]{5}[-][0-9]{7}[-][0-9]{1}"/>
            </div>
            <div className="Wrapper">
                 <a>Your address</a>
                <input className="textbox"key={'address'}onChange={(e)=>setAddress(e.target.value)} placeholder="Please provide your address"/>
            </div>
            <div className="Wrapper">
                 <a>Your email</a>
                <input className="textbox"key={'email'} onChange={(e)=>setEmail(e.target.value)} placeholder="Please provide your email" pattern={emailpattern}/>
            </div>
            <div className="cartWrapper">
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
             {(!orderName||(!phoneNumber)||(!address)||(!email))?
             <button className="submit">SUBMIT</button>:
            
            <button className="submit" onClick={addpost}>SUBMIT</button>
}
        </div>
    )
}