
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import '../../css/productparams.css'
import axios from "axios";
import { Back } from "../backbutton";
import { CartContext, useCartContext} from "../../store/Provide";





export const GetProduct=()=>{
    const params = useParams();
    const id=params.id;
    const api='https://purchasing-v1.onrender.com/api/v1/products/'+id
    const[post,setPost]=useState(Object)
    const navigate = useNavigate();
    const {cart, setCart}= useCartContext();
    const fetchData= async(api:string)=>{
      try {
       const  res = await axios.get(api)
       if(res.data.catalog==='Chain'||res.data.catalog==='Tie'){
        setSize('sizeS')}
      else{
        setSize('size39')}
      setPost(res.data)
      console.log(res.data)
      } catch (error) {
       console.log(error)
      } 
    }
    useEffect(()=>{
      fetchData(api)
      },[api])
    const[quantity,setQuantity]=useState(0)
    const handleAddclick=()=>{
      
      setQuantity(quantity+1)
    }
    const handleDecreaseClick=()=>{
      if(quantity>0){
        setQuantity(quantity-1)
      }
      
    }
    const addToCart=()=>{
        setCart([...cart,{productid:post._id,productname:post.productname,imagePath:post.imgpath,
          catalog:post.catalog,price:post.price,size:size,quantity:quantity}])
    localStorage.setItem('cart',JSON.stringify(cart))
    
    }
    
    const [size,setSize]=useState('')
    
    return (
    <div className="productbox">
      <Back/>
      
      <div className="element-wrapper">
        <img className="product-image" alt={post._id} src={post.imgpath} width='200px' height='200px' />
        <div className="productName">{post.productname}</div>
        <div className="price">{post.price} US$</div>
        
        <div className="size">
                   <div className="size-text">Size : {size.split('size')[1]}</div> 
            {(post.catalog==='Chain'||post.catalog==='Tie')?
           (<div className="sizeSelection">
           <div className="Size" role='button' style={(size==='sizeS')?{backgroundColor:'red',color:'white'}:{}}  onClick={()=>setSize('sizeS')}>SizeS</div>
           <div className="Size" role='button' style={(size==='sizeM')?{backgroundColor:'Blue',color:'white'}:{}}  onClick={()=>setSize('sizeM')} >SizeM</div>
           <div className="Size" role='button' style={(size==='sizeL')?{backgroundColor:'Green',color:'white'}:{}}  onClick={()=>setSize('sizeL')} >SizeL</div>
         </div>):
         <div className="sizeSelection">
         <div className="Size" role='button' style={(size==='size39')?{backgroundColor:'red',color:'white'}:{}}  onClick={()=>setSize('size39')}>Size39</div>
         <div className="Size" role='button' style={(size==='size40')?{backgroundColor:'Blue',color:'white'}:{}}  onClick={()=>setSize('size40')} >Size40</div>
         <div className="Size" role='button' style={(size==='size41')?{backgroundColor:'Green',color:'white'}:{}}  onClick={()=>setSize('size41')} >Size41</div>
         <div className="Size" role='button' style={(size==='size42')?{backgroundColor:'Purple',color:'white'}:{}}  onClick={()=>setSize('size42')} >Size42</div>
       </div>
         }
          </div>
          <h2 className="description">{post.description}</h2>
          </div>
        <div className="customSelect">
        <div className="quantity">
        <div role="button" className="button" onClick={handleAddclick}>+</div>
        <div className="quantityValue" role="textbox">{quantity}</div>
        <div role="button" className="button" onClick={handleDecreaseClick}>-</div>
        </div>
        {quantity<=0?
         ( <div className="addToCart">
          <div className="Content">ADD TO CART</div>
        </div>
        ):
          (<div className="addToCart" role='button' onClick={()=>{addToCart();navigate('/products/')}} >
          <div className="Content">ADD TO CART</div>
        </div>
        )}
        
        </div>
      
    </div>
    );
  }
