import React, {useState,useEffect} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


import '../../../css/title.css'
import '../../../css/product.css'

import { Filter } from "./filter";
import { Title } from "./title";
import axios from "axios";

type ProductProps={
  productid:string,
  productname:string,
  imagePath:string,
  price:number,
  description:string
}

const ItemProduct=(props:ProductProps)=>{
  const navigate=useNavigate()
  return(
    <div key={props.productid}  className="product" role={'button'} onClick={()=>navigate('/api/v1/products/'+props.productid)} >
      <img className='productimg'  alt={props.productname} src={props.imagePath} />
      <p className="productname" >{props.productname}</p>
      <div className="description">
        {props.description}
      </div>
      <div className="price">{props.price+ '$$$'}</div>
    </div>
    )
}
const Products =()=>{
  const client = axios.create({
    baseURL: "https://purchasing-v1.onrender.com" 
  });
  const [posts,setPosts]= useState([])

const location=useLocation()

const fetchData= async(api:string)=>{
  try {
   const  res = await axios.get(api)
   
  setPosts(res.data)
  console.log(res.data)
  } catch (error) {
   console.log(error)
  } 
}


  useEffect(()=>{
    
    const api = 'https://purchasing-v1.onrender.com/api/v1/products/'+location.search
    fetchData(api)
  },[location]);
  

 return (<div className="itemcover">
 {posts.map((post:any)=>
  <ItemProduct
  key={post._id}
  productid={post._id}
  productname={post.productname}
  imagePath={post.imgpath}
  price={post.price}
  description={post.description}
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


