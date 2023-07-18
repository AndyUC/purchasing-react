
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import '../../css/productparams.css'
import axios from "axios";
import { Back } from "../backbutton";




export const GetProduct=()=>{
    const params = useParams();
    const id=params.id;
    const api='https://purchasing-v1.onrender.com/api/v1/products/'+id
    const[post,setPost]=useState(Object)

    const fetchData= async(api:string)=>{
      try {
       const  res = await axios.get(api)
       if(res.data.catalog==='Chain'||res.data.catalog==='Tie'){
        setSize('sizeS')}
      else{
        setSize('size39')}
      setPost(res.data)
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
      let cartdata=[]
     
      cartdata =localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')||'{}'):[]
      cartdata.push({productid:post._id,productname:post.productname,imagePath:post.imgpath,
        description:post.description,
        catalog:post.catalog,price:post.price,size:size,quantity:quantity})
    localStorage.setItem('cart',JSON.stringify(cartdata))
    }
    
    const [size,setSize]=useState('')
    const handleChange=(event:any)=>{
      setSize(event.target.value)
    }
    return (
    <div className="productbox">
      <Back/>
      <div className="element-wrapper">
        <img className="product-image" alt={post._id} src={post.imgpath} width='200px' height='200px' />
        <h1 className="productName">{post.productname}</h1>
        <h2 className="description">{post.description}</h2>
        <h1 className="price">{post.price}</h1>
        <div className="size">
                    Size : 
                {(post.catalog==='Chain'||post.catalog==='Tie')?
            (<select name="sizeSelection" defaultValue={size} value={this} onChange={handleChange} >
            <option value={'sizeS'}>SizeS</option>
            <option value={'sizeM'}>SizeM</option>
            <option value={'sizeL'}>SizeL</option>
          </select>)
              :
              
              (  <select name="sizeSelection" defaultValue={size} onChange={handleChange} >
              <option value={'size39'}>Size39</option>
              <option value={'size40'}>Size40</option>
              <option value={'size41'}>Size41</option>
              <option value={'size42'}>Size42</option>
            </select>)}
          </div>
        <div className="customSelect">
        <button className="button" onClick={handleAddclick}>+</button>
        <div className="quantity">{quantity}</div>
        <button className="button" onClick={handleDecreaseClick}>-</button>
        {quantity<=0?
         ( <div className="Addtocart">
          <div className="Content">ADD TO CART</div>
        </div>
        ):
          (<Link className="Addtocart" role='button' onClick={addToCart} to={'/api/v1/products/'} >
          <div className="Content">ADD TO CART</div>
        </Link>
        )}
        
        </div>
      </div>
    </div>
    );
  }
