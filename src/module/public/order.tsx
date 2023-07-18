import React, {  useEffect, useState } from "react";
import axios from "axios";
import { CartProduct } from "./cart";
import '../../css/order.css'
import {  useNavigate } from "react-router-dom";
import { Back } from "../backbutton";

export const Order=()=>{
    const client = axios.create({
        baseURL: "https://purchasing-v1.onrender.com" 
      });
    let navigate = useNavigate()
    const [carts,setCarts]=useState( localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '{}') : [])
    const [orderName, setOrderName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState(0);
    useEffect(()=>{
      let total =0;
      carts.forEach((cart:any )=> {
        total +=cart.price*cart.quantity
      })
    setAmount(total)},[carts])
   
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
    navigate('/api/v1/success')
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
      <div>
        {(!orderName||(!phoneNumber)||(!address)||(!email))?
             <div className="orderFooter">
             <div className="amountOrder" >Total :{amount}$$$</div>
             <div className="Buy" ><div className="text-Content">Comfirm</div></div>
             </div>:
             <div className="orderFooter">
             <div className="amountOrder" >Total :{amount}$$$</div>
             <div className="Buy" role="button" onClick={addpost}><div className="text-Content">Comfirm</div></div>
             </div>}
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
            <Back/>
            <div className="cartWrapper">
            { carts.map((cart:any,index:number)=>
              <div key={index}>  
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
                </div>)}   
             </div>
             
        </div>
        </div>
    )
}