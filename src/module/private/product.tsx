import React, {useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";

import '../../css/title.css'
import '../../css/product.css'
import '../../css/filter.css'

import chevronDown from '../../image/chevronDown.svg'
import filter from '../../image/filter-solid.svg'
import deleteicon from '../../image/delete.svg'
import { getCookie } from "../cookie";



const Filter=()=>{
  const maxprice='20';
  const minprice='20';
  const location=useLocation();
  const handleClick=()=>{
    console.log('click')
  }
  return(
  <div className="filterbox">
        <button className="buttonfilter">
          <img className="filterIcon" alt="filterIcon" src={filter} />
          <a className="text-wrapper" onClick={handleClick}>Filter</a>
        </button>
        <div className="filtershowed">
          {((location.search.search('minprice')!==-1)||(location.search.search('maxprice')!==-1))&&
          ( 
            <div className="pricefilterbox">
              <div className="text">{minprice+'-'+maxprice}</div>
              <img className="delete" src="sdada"/>
            </div>
          )}
          {(location.search.search('sort')!==-1)&&<div className="sort-by">
            <div className="sort">
              <div className="content">Sort by Price</div>
              <img className="delete" src="sdada"/>
            </div>
          </div>}
        </div>
          
        </div>
      )

}

type CatalogProps={
    select:Function
}

const SelectCatalog =(props:CatalogProps)=>{
 
  return(
    <div className="CATALOG-MULTICHOICE">
    <div className="div">
      <div className="text-wrapper" onClick={()=>props.select('GLASS')} >GLASS</div>
      <div className="text-wrapper-2" onClick={()=>props.select('CHAIN')}>CHAIN</div>
      <div className="text-wrapper-3" onClick={()=>props.select('WATCH')}>WATCH</div>
      <div className="text-wrapper-4" onClick={()=>props.select('TIE')}>TIE</div>
      <div className="text-wrapper-5" onClick={()=>props.select('ALL PRODUCT')}>ALL PRODUCT</div>
    </div>
  </div>
  )
}


type ProductProps={
  productid:string,
  productname:string,
  imagePath:string,
  price:number
}

const ItemStorage=(props:ProductProps)=>{
  return(
    <Link className="product" to ={'/enterprise/v1/product/'+props.productid} >
      <img className='productimg'  alt={props.productname} src={props.imagePath} />
      <h1 className="productname" >{props.productname}</h1>
      <div className="price">{props.price+ '$$$'}</div>
    </Link>
    )
}


export const ProductManage=()=>{
  const [posts,setPosts]= useState([])
  const[state,setState]=useState(false)
  const[title,setTitle]=useState('ALL PRODUCT')

  const client = axios.create({
    baseURL: "http://localhost:3000" 
  });
  const deleteItem=(id:string,index:number)=>{
    const token = getCookie('token')
    client.delete('http://localhost:3000/api/v1/products/'+id,{headers:{authorization:'Bearer '+token}})
    const newpost=[...posts]
    if(index===0){
        newpost.shift()
    }else{
        newpost.splice(index,1)
    }
    setPosts(newpost)
  }
   

  useEffect(()=>{
    let api=''
    if(title==='ALL PRODUCT'){
    api = 'http://localhost:3000/api/v1/products/'
    }else{
        let newtitle = title.toLowerCase()
         const firchart = newtitle[0].toUpperCase()
         newtitle = newtitle.slice(1)
         newtitle = firchart+newtitle
         api = 'http://localhost:3000/api/v1/products/?catalog='+newtitle
    }
    fetch(api)
    .then(res=>res.json())
    .then(posts=>{
      console.log(posts)
      setPosts(posts)
    })
  },[title])  
  
  const handleOnclick=()=>{
        
    if(state===true){
      setState(false)
    }else{
      setState(true)
    }
}
const selectCatalog=(title:string)=>{
  setTitle(title)
  setState(false)
}

  return(
    <div>
       <div className="box" role='button' onClick={handleOnclick}>
      <div className="group-wrapper">
        <div className="group">
          <div className="overlap-group">
          <div className="text-wrapper">{title}</div>
            <img className="icon-ionic-ios-arrow" alt="Icon ionic ios arrow" src={chevronDown} />
          </div>
        </div>
      </div>
      {state&&<SelectCatalog select={selectCatalog}/>}
    </div>
    
      <Filter/>
    <div className="itemcover">
      {posts.map((post:any,index:number)=> 
      <div className="currentItem" key={index}>
        <img className="deleteButton" role={'button'} alt='delete' src={deleteicon} onClick={()=>deleteItem(post._id,index)}/>
      <ItemStorage 
        key={post._id}
        productid={post._id}
        productname={post.productname}
        imagePath={post.imgpath}
        price={post.price}/>
      </div>)
      }
     
    </div>
    </div>
  )
}
