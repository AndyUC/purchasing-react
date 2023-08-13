import React, {  useEffect, useState } from "react";
import axios from "axios";
import { CartProduct } from "./cart";
import '../../css/order.css'
import {  useNavigate } from "react-router-dom";
import { Back } from "../backbutton";
import { client } from "../axiosURL";
import { useCartContext } from "../../store/Provide";
type FormProductProps={
  
}

const FormProduct = ()=>{

}

export const Order=()=>{
    let navigate = useNavigate()
    const [orderName, setOrderName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState(0)
    const [error, setError] = useState({orderNameError:'',
      phoneNumberError:'',
      emailError:'',
      addressError:''});
    const {cart,setCart}=useCartContext()
    useEffect(()=>{
      let total =0;
      cart.forEach((cart:any )=> {
        total +=cart.price*cart.quantity
      })
    setAmount(total)},[cart])
   
   const  addpost=async()=>{
    let isEmpty=false
    const emailpattern= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    const phonePattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
    const cartdata: { productid: string; size: string; quantity: number;price:number }[]=[]
    cart.map((cart:any)=> {
      if(cart.quantity>0){
      cartdata.push({productid:cart.productid,size:cart.size,quantity:cart.quantity,price:cart.price})
      }else{
        isEmpty=true
      }})
      let {orderNameError,phoneNumberError,addressError,emailError}=error
    if(orderName===''){
        orderNameError='Please give Your Name'
      }
    if(phoneNumber===''){
        phoneNumberError='Please give Your Phone Number'
      }
    if(address===''){
        addressError='Please give Your Address'
    }
    if(email===''){
        emailError='Please give Your Email'
      }
      if(!emailpattern.test(email.trim())){
        emailError='Email inValid'
      }
      if(!phonePattern.test(phoneNumber.trim())){
        phoneNumberError='phoneNumber InValid'
      }
      if(isEmpty){
        window.alert('please set Quantity')
      }
    
    if(!isEmpty&&orderName!==''&&phoneNumber!==''&&address!==''&&email!==''&&cartdata.length>0){
      if(emailpattern.test(email.trim())&&phonePattern.test(phoneNumber.trim())){
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
     navigate('/success')
     } catch(error:any){
       window.alert(error.response.data.msg)
    }}
    }
    setError({orderNameError:orderNameError,phoneNumberError:phoneNumberError,addressError:addressError,emailError:emailError})
   }
  let newcart= [...cart]
  const updateQuantity=(index:number,quantity:number)=>{
    newcart[index].quantity=quantity
    setCart(newcart)
    localStorage.setItem('cart',JSON.stringify(newcart))
    }
  const remove=(index:number)=>{
    newcart.splice(index,index+1)
    setCart(newcart)
    localStorage.setItem('cart',JSON.stringify(newcart))
  }
  const updateSize=(index:number,size:string)=>{
    newcart[index].size=size
    setCart(newcart)
    localStorage.setItem('cart',JSON.stringify(newcart))
  }
  
  const emailpattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
                        
    return(
      <div>
        <div className="orderFooter" style={{zIndex:2}}>
          <div className="amountOrder" >Total :{amount}$$$</div>
          <div className="Buy" role="button" itemType={'submit'} onClick={addpost}><div className="text-Content">Comfirm</div></div>
        </div>
        <div className="OrderWrapper">
          
            <h1 className="Header">GET YOUR ORDER</h1>
            <div className="Wrapper">
                 <a>Your name *</a>
                <input className="textbox" key={'cusName'} id="orderName" onFocusCapture={()=>{if(error.orderNameError.length>0){error.orderNameError='';setError(error)}}} onChange={(e)=>setOrderName(e.target.value)} placeholder="Please provide your Name"/>
                {error.orderNameError.length>0&&<div className="error" id="error">{error.orderNameError}</div>}
            </div>
            <div className="Wrapper">
                 <a>Your phoneNumber *</a>
                <input className="textbox" key={'cusPhone'} id="phoneNumber" onFocusCapture={()=>{if(error.phoneNumberError.length>0){error.phoneNumberError='';setError(error)}}} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="Please provide your phoneNumber" pattern="[0-9]{5}[-][0-9]{7}[-][0-9]{1}"/>
                {error.phoneNumberError.length>0&&<div className="error" id="error">{error.phoneNumberError}</div>}
            </div>
            <div className="Wrapper">
                 <a>Your address *</a>
                <input className="textbox"key={'address' } id="address" onFocusCapture={()=>{if(error.addressError.length>0){error.addressError='';setError(error)}}} onChange={(e)=>setAddress(e.target.value)} placeholder="Please provide your address"/>
                {error.addressError.length>0&&<div className="error">{error.addressError}</div>}
            </div>
            <div className="Wrapper">
                 <a>Your email *</a>
                <input className="textbox"key={'email'} id="email" onFocusCapture={()=>{if(error.emailError.length>0){error.emailError='';setError(error)}}} onChange={(e)=>setEmail(e.target.value)} placeholder="Please provide your email" />
                {error.emailError.length>0&&<div className="error">{error.emailError}</div>}
            </div>
            <Back/>
            <div className="cartWrapper">
            { cart.map((cart:any,index:number)=>
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