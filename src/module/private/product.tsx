import React, {useState,useEffect} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";

import '../../css/title.css'
import '../../css/product.css'
import '../../css/filter/filter.css'

import chevronDown from '../../image/chevronDown.svg'
import filter from '../../image/filter-solid.svg'
import deleteicon from '../../image/delete.svg'
import { getCookie } from "../cookie";
import { client } from "../axiosURL";



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
  const navigate = useNavigate();
  return(
    <div key={props.productid}  className="storageProduct" >
    <div role={'button'} onClick={()=>navigate('/admin/products/'+props.productid)} >
    <img className='productimg'  alt={props.productname} src={props.imagePath} />
    <div className="productname" >{props.productname}</div>
    <div className="price">{props.price} US$</div>
    </div>
  </div>
    )
}


export const ProductManage=()=>{
  const [posts,setPosts]= useState([])
  const[state,setState]=useState(false)
  const[title,setTitle]=useState('ALL PRODUCT')
  const navigate = useNavigate()
  const token = getCookie('token')
 
  const deleteItem=(id:string,index:number)=>{
    client.delete('https://purchasing-v1.onrender.com/api/v1/products/'+id,{headers:{authorization:'Bearer '+token}})
    const newpost=[...posts]
    if(index===0){
        newpost.shift()
    }else{
        newpost.splice(index,1)
    }
    setPosts(newpost)
  }
  
  const fetchData= async(api:string)=>{
    try {
     if (token===''){
         navigate('/admin/login')
     }
     const  res = await axios.get(api)
     
    setPosts(res.data)
    console.log(res.data)
    } catch (error) {
     console.log(error)
    } 
 }
   

  useEffect(()=>{
    let api=''
    if(title==='ALL PRODUCT'){
    api = 'https://purchasing-v1.onrender.com/api/v1/products/'
    }else{
        let newtitle = title.toLowerCase()
         const firchart = newtitle[0].toUpperCase()
         newtitle = newtitle.slice(1)
         newtitle = firchart+newtitle
         api = 'https://purchasing-v1.onrender.com/api/v1/products/?catalog='+newtitle
    }
    console.log(api)
    fetchData(api)
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
      {state&&<div role="button" className="catalogSiteMark" onClick={()=>setState(!state)}/>}
    </div>
    
      <Filter/>
    <div className="itemcover">
      {posts.map((post:any,index:number)=> 
      <div className="currentItem" key={index}>
        <img className="deleteButton" style={{backgroundColor:'white',borderRadius:'50%'}} role={'button'} alt='delete' src={deleteicon} onClick={()=>deleteItem(post._id,index)}/>
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
