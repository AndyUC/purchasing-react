import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import '../../css/updateproduct.css'
import { getCookie } from "../cookie";
import { Back } from "../backbutton";

export const ManageProduct=()=>{
  
  const client = axios.create({
    baseURL: "https://purchasing-v1.onrender.com" 
  });
  const navigate = useNavigate()
    const params = useParams();
    const id=params.id;
    const api='https://purchasing-v1.onrender.com/api/v1/products/'+id
    const [image, setImage] = useState('');
    const [productname, setProductname] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const [files, setFiles] = useState();
  const [sizeS, setSizeS] = useState();
  const [sizeM, setSizeM] = useState();
  const [sizeL, setSizeL] = useState();
  const [size39, setSize39] = useState();
  const [size40, setSize40] = useState();
  const [size41, setSize41] = useState();
  const [size42, setSize42] = useState();
  const [catalog, setCatalog] = useState();
  
    useEffect(()=>{
      const token =getCookie('token')
      if(!token){
        navigate('/api/v1/login')
      }
      fetch(api)
      .then(res=>res.json())
      .then(posts=>{
        console.log(posts)
       
        setProductname(posts.productname)
        setDescription(posts.description)
        setPrice(posts.price)
        setImage(posts.imgpath)
        setCatalog(posts.catalog)
        if(posts.catalog==='Chain'||posts.catalog==='Tie'){
          setSizeS(posts.storageid.sizeS||0)
          setSizeL(posts.storageid.sizeL||0)
          setSizeM(posts.storageid.sizeM||0)
        }else{
          setSize39(posts.storageid.size39||0)
          setSize40(posts.storageid.size40||0)
          setSize41(posts.storageid.size41||0)
          setSize42(posts.storageid.size42||0)
        }
      })
    },[id])
    

  const handleAvatar=(e:any)=>{
   
    setFiles(e.target.files[0])
    const file =  e.target.files[0]
     const url =URL.createObjectURL(file)
    console.log(url.toString())
    setImage(url)
  }
  const handleSubmit=async()=>{
    const token =getCookie('token')
    let formdata= new FormData()
    if(catalog){
      formdata.append('catalog',catalog)
    }
    if(productname){
      formdata.append('productname',productname)
    }
    if(price){
      formdata.append('price',price)
    }
    if(description){
      formdata.append('description',description)
    }
    if((catalog==='Chain')||catalog==='Tie'){ 
      if(sizeS){
        formdata.append('sizeS',sizeS)
      } 
      if(sizeL){
        formdata.append('sizeL',sizeL)
      } 
      if(sizeM){
        formdata.append('sizeM',sizeM)
      }
  }else{
    if(size39){
      formdata.append('size39',size39)
    } 
    if(size40){
      formdata.append('size40',size40)
    } 
    if(size41){
      formdata.append('size41',size41)
    } 
    if(size42){
      formdata.append('size42',size42)
    } 
  }
  if(files){
    formdata.append('images',files)
  }
 
  try{
    const res = await client.patch('/api/v1/products/'+id,formdata,{
      headers:{authorization:'Bearer '+token}
      })
      navigate('/enterprise/v1/product')
  }catch(error:any){
    console.log(error.config)
  }
}


    return (
    <div className="productbox">
      <Back/>
      <div className="productUpdateWrapper">
        <h2>ID: {id}</h2>
        <img className="product-image" alt={id} src={image} width='200px' height='200px' />
        <input className="inputImage" type={'file'} onChange={handleAvatar}/>
        <div className="fieldUpdate">
        <div className="titleUpdate" >Product Name</div>
        <input className="inputName" type='text' placeholder={'Please insert product name'} defaultValue={productname} onChange={(e:any)=>setProductname(e.target.value)}/>
        </div>
        <div className="fieldUpdate">
        <div className="titleUpdate" >Description</div>
        <input className="inputDescription" type='text' placeholder={'Please insert Description'} defaultValue={description} onChange={(e:any)=>setDescription(e.target.value)}/>
        </div>
        <div className="fieldUpdate">
        <div className="titleUpdate" >Price</div>
        <input className="inputPrice" type='number' placeholder={'Please insert price'} defaultValue={price}onChange={(e:any)=>setPrice(e.target.value)}/>
        </div>
        
          {(catalog==='Chain'||catalog==='Tie')?
          <div className="updateSize">
            <div className="size">
            <div className="sizeTitle">Size S</div>
            <input className="inputSizeS" type={'number'} defaultValue={sizeS} onChange={(e:any)=>setSizeS(e.target.value||sizeS)}/>
            </div>  
            <div className="size">
            <div className="sizeTitle">Size L</div>
            <input className="inputSizeL" type={'number'} defaultValue={sizeL} onChange={(e:any)=>setSizeL(e.target.value||sizeL)}/>
              </div>
            <div className="size">
            <div className="sizeTitle">Size M</div>
            <input className="inputSizeM" type={'number'} defaultValue={sizeM} onChange={(e:any)=>setSizeM(e.target.value||sizeM)}/>
            </div>
            
          </div>:
           <div className="updateSize">
            <div className="size">
            <div className="sizeTitle">Size39</div>
            <input className="inputSize39" type={'number'} defaultValue={size39} onChange={(e:any)=>setSize39(e.target.value||size39)}/>
            </div>
            <div className="size">
            <div className="sizeTitle">Size40</div>
            <input className="inputSize40" type={'number'} defaultValue={size40} onChange={(e:any)=>setSize40(e.target.value||size40)}/>
            </div>
            <div className="size">
            <div className="sizeTitle">Size41</div>
            <input className="inputSize41" type={'number'} defaultValue={size41} onChange={(e:any)=>setSize41(e.target.value||size41)}/>
            </div>
            <div className="size">
            <div className="sizeTitle">Size42</div>
            <input className="inputSize42" type={'number'} defaultValue={size42} onChange={(e:any)=>setSize42(e.target.value||size42)}/>
            </div>
          </div>
          }
        <div role={'button'} className="updateSubmit" onClick={handleSubmit}>
          <h2 className="updateSubmit-text">Save change</h2>
        </div>
        </div>
      </div>
    );
  }
