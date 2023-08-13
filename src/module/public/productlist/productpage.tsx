import React, {useState,useEffect} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


import '../../../css/title.css'
import '../../../css/product.css'
import cartIcon from '../../../image/cart-shopping-solid.svg'
import { Filter } from "./filter";
import { Title } from "./title";
import axios from "axios";
import { client } from "../../axiosURL";
import { useCartContext } from "../../../store/Provide";

type ProductProps={
  productid:string,
  productname:string,
  imagePath:string,
  price:number,
  description:string,
  catalog:string
}

const ItemProduct=(props:ProductProps)=>{
  const {cart, setCart}= useCartContext();
  const handleClick=()=>{
    localStorage.setItem('cart',JSON.stringify([...cart,{productid:props.productid,
      productname:props.productname,
      imagePath:props.imagePath,
      catalog:props.catalog,
      size:(props.catalog==='Chain'||props.catalog==='Tie')?'sizeS':'size39',
      price:props.price,
      quantity:0}]))
    setCart([...cart,{productid:props.productid,
    productname:props.productname,
    imagePath:props.imagePath,
    catalog:props.catalog,
    size:(props.catalog==='Chain'||props.catalog==='Tie')?'sizeS':'size39',
    price:props.price,
    quantity:0}])
    
  }
  const navigate=useNavigate()
  return(
    <div key={props.productid}  className="product" >
      <div role={'button'} onClick={()=>navigate('/products/'+props.productid)} >
      <img className='productimg'  alt={props.productname} src={props.imagePath} />
      <div className="productname" >{props.productname}</div>
      <div className="price">{props.price} US$</div>
      </div>
      <div role="button" className="getProduct" onClick={handleClick}>
      <img src={cartIcon} style={{width:'20px',height:'20px'} } />
      </div>
    </div>
    )
}
const Products =()=>{
  const [posts,setPosts]= useState([])

const location=useLocation()

const fetchData= async(api:string)=>{
  try {
   const  res = await client.get(api)
   
  setPosts(res.data)
  console.log(res.data)
  } catch (error) {
   console.log(error)
  } 
}


  useEffect(()=>{
    
    const api = '/api/v1/products/'+location.search
    fetchData(api)
  },[location]);
  

 return (<div className="itemcover">
 {posts.map((post:any)=>
  <ItemProduct
  key={post._id}
  productid={post._id}
  productname={post.productname}
  imagePath={Array.isArray(post.imgpath)?post.imgpath[0]:post.imgpath}
  price={post.price}
  description={post.description}
  catalog={post.catalog}
  />
 )}
</div>)
}

export const Product=()=>{

  return(
      <div>
        <Title/>
        <Filter/>
        <Products/>
      </div>
    )
  
}


