import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router";
import '../../css/updateproduct.css'
import { getCookie } from "../cookie";
import { Back } from "../backbutton";
import { client } from "../axiosURL";
import { initState, productReducer } from "./productStore";
import { setCatalog,setDescription,setFiles,setImage,setPrice,setProductname,setSize39,setSize40,setSize41,setSize42,setSizeL,setSizeM,setSizeS } from "./productStore";
import chevronDown from '../../image/chevronDown.svg'



type FormProductProps={
  postFuntion:Function,
  getFuntion:Boolean
}

export const FormProduct = (props:FormProductProps)=>{
  const [state, dispatch]=useReducer(productReducer,initState)
  const [select, setSelect] = useState(false);
  const {image,productname,description,price,files,sizeS,sizeM,sizeL,size39,size40,size41,size42,catalog}=state
  const [imageError, setImageError] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [sizeError, setSizeError] = useState('');
  const params = useParams();
  const id=params.id;
  const api='https://purchasing-v1.onrender.com/api/v1/products/'+id
    if(props.getFuntion){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
  
      fetch(api)
      .then(res=>res.json())
      .then(posts=>{
        console.log(posts)
       
        dispatch(setProductname(posts.productname))
        dispatch(setDescription(posts.description))
        dispatch(setPrice(posts.price))
        dispatch(setImage(posts.imgpath))
        dispatch(setCatalog(posts.catalog))
        if(posts.catalog==='Chain'||posts.catalog==='Tie'){
          dispatch(setSizeS(posts.storageid.sizeS.toString()||'0'))
          dispatch(setSizeL(posts.storageid.sizeL.toString()||"0"))
          dispatch(setSizeM(posts.storageid.sizeM.toString()||'0'))
        }else{
          dispatch(setSize39(posts.storageid.size39.toString()||"0"))
          dispatch(setSize40(posts.storageid.size40.toString()||"0"))
          dispatch(setSize41(posts.storageid.size41.toString()||"0"))
          dispatch(setSize42(posts.storageid.size42.toString()||"0"))
        }
      })
    },[id])
  }
  const handleAvatar=(e:any)=>{
    if(e.target.files.length>0){
      dispatch(setFiles(e.target.files[0]))
      const file =  e.target.files[0]
       const url =URL.createObjectURL(file)
      console.log(url.toString())
      dispatch(setImage(url))
    }
   
  }
  const handleSubmit=async()=>{
    let formdata= new FormData()
    var isvalid:Boolean=true;
    if(catalog){
      formdata.append('catalog',catalog)
    }
    if(productname){
      formdata.append('productname',productname)
    }else{
      setProductNameError('Please Insert product Name')
      isvalid= false
    }
    if(price){
        formdata.append('price',price)
    }else{
      setPriceError('please insert Price')
      isvalid=false;
    }
      

    if(description){
      formdata.append('description',description)
    }else{
      setDescriptionError('Please insert Description')
      isvalid=false;
    }
    const validQty =/^[-|\+]?[0-9]{1,3}(\,[0-9]{3})*$|^[-|\+]?[0-9]+$/
    if((catalog==='Chain')||catalog==='Tie'){ 
     
      sizeS===''?formdata.append('sizeS','0'):formdata.append('sizeS',sizeS||'0')
      sizeM===''?formdata.append('sizeM','0'):formdata.append('sizeM',sizeM||'0')
      sizeL===''?formdata.append('sizeL','0'):formdata.append('sizeL',sizeL||'0')
      if(sizeS!==''&&sizeM!==''&&sizeL!==''){
        if(!validQty.test(sizeS?.trim())&&!validQty.test(sizeM?.trim())&&!validQty.test(sizeL?.trim()))
        {setSizeError('invalid Size')
        isvalid=false;}
        
      }  
  }else{
    size39===''?formdata.append('size39','0'):formdata.append('size39',size39||'0')
    size40===''?formdata.append('size40','0'):formdata.append('size40',size40||'0')
    size41===''?formdata.append('size41','0'):formdata.append('size41',size41||'0')
    size42===''?formdata.append('size42','0'):formdata.append('size42',size42||'0')
    if(size39!==''&&size40!==''&&size41!==''&&size42){
      if(!validQty.test(size39?.trim())&&!validQty.test(size40?.trim())&&!validQty.test(size41?.trim())&&!validQty.test(size42?.trim()))
      {setSizeError('invalid Size')
      isvalid=false;}
    }
   
  }
  if(!image){
    setImageError('please Insert Image')
    isvalid=false;
  }
  if(files){
    formdata.append('images',files)
  }
  if(isvalid){
    props.postFuntion(formdata)
  }
}
  return <div className="productbox">
      {props.getFuntion?<h2 className="id">{id}</h2>:<h2 className="id">Create new product</h2>}
      <Back/>
      <div className="productUpdateWrapper">
        {!props.getFuntion&&
        <div className="fieldUpdate">
            <div className="titleUpdate">Catalog *</div>
            <div role={'button'} onClick={()=>setSelect(!select)} className="catalogWrapper">
            <div className="catalogText">{catalog}</div>
            <img className="chevron" alt="Icon ionic ios arrow" width={'20px'} height='20px' src={chevronDown} />
            </div>
            {select&&
            <div className="selectCatalogWrapper">
                <div className="option" onClick={()=>{dispatch(setCatalog('Glass'));setSelect(!select)}} >Glass</div>
                <div className="option" onClick={()=>{dispatch(setCatalog('Chain'));setSelect(!select)}}>Chain</div>
                <div className="option" onClick={()=>{dispatch(setCatalog('Watch'));setSelect(!select)}}>Watch</div>
                <div className="option" onClick={()=>{dispatch(setCatalog('Tie'));setSelect(!select)}}>Tie</div>
            </div>}
          </div>}
        {image?<img className="product-image"  src={image} />:<div className="product-image"/>}
        <input className="inputImage" type={'file'} onChange={handleAvatar} onClick={()=>{if(imageError!==''){setImageError('')}}}/>
        {imageError!==''&&<div className="error">{imageError}</div>}
        <div className="fieldUpdate">
        <div className="titleUpdate" >Product Name *</div>
        <input className="inputName" type='text' placeholder={'Please insert product name'} onClick={()=>{if(productNameError!==''){setProductNameError('')}}} defaultValue={productname} onChange={(e:any)=>dispatch(setProductname(e.target.value))}/>
        {productNameError!==''&&<div className="error">{productNameError}</div>}
        </div>
        <div className="fieldUpdate">
        <div className="titleUpdate" >Description *</div>
        <textarea className="inputDescription" placeholder={'Please insert Description'} onClick={()=>{if(descriptionError!==''){setDescriptionError('')}}} defaultValue={description} onChange={(e:any)=>dispatch(setDescription(e.target.value))}/>
        {descriptionError!==''&&<div className="error">{descriptionError}</div>}
        </div>
        <div className="fieldUpdate">
        <div className="titleUpdate" >Price *</div>
        <input className="inputPrice" type='number' placeholder={'Please insert price'}onClick={()=>{if(priceError!==''){setPriceError('')}}} defaultValue={price}onChange={(e:any)=>dispatch(setPrice(e.target.value))}/>
        {priceError!==''&&<div className="error">{priceError}</div>}
        </div>
        
          {(catalog==='Chain'||catalog==='Tie')?
          <div className="updateSize">
            {sizeError!==''&&<div className="error">{sizeError}</div>}
            <div className="size">
            <div className="sizeTitle">Size S</div>
            <input className="inputSizeS" type={'number'} onClick={()=>{if(sizeError!==''){setSizeError('')}}} defaultValue={sizeS} onChange={(e:any)=>dispatch(setSizeS(e.target.value||sizeS))} pattern={'/^[-|\+]?[0-9]{1,3}(\,[0-9]{3})*$|^[-|\+]?[0-9]+$/'}/>
            </div>  
            <div className="size">
            <div className="sizeTitle">Size L</div>
            <input className="inputSizeL" type={'number'}onClick={()=>{if(sizeError!==''){setSizeError('')}}} defaultValue={sizeL} onChange={(e:any)=>dispatch(setSizeL(e.target.value||sizeL))}/>
              </div>
            <div className="size">
            <div className="sizeTitle">Size M</div>
            <input className="inputSizeM" type={'number'}onClick={()=>{if(sizeError!==''){setSizeError('')}}} defaultValue={sizeM} onChange={(e:any)=>dispatch(setSizeM(e.target.value||sizeM))}/>
            </div>
            
          </div>:
           <div className="updateSize">
            {sizeError!==''&&<div className="error">{sizeError}</div>}
            <div className="size">
            <div className="sizeTitle">Size39</div>
            <input className="inputSize39" type={'number'}onClick={()=>{if(sizeError!==''){setSizeError('')}}} defaultValue={size39} onChange={(e:any)=>dispatch(setSize39(e.target.value||size39))}/>
            </div>
            <div className="size">
            <div className="sizeTitle">Size40</div>
            <input className="inputSize40" type={'number'}onClick={()=>{if(sizeError!==''){setSizeError('')}}} defaultValue={size40} onChange={(e:any)=>dispatch(setSize40(e.target.value||size40))}/>
            </div>
            <div className="size">
            <div className="sizeTitle">Size41</div>
            <input className="inputSize41" type={'number'}onClick={()=>{if(sizeError!==''){setSizeError('')}}} defaultValue={size41} onChange={(e:any)=>dispatch(setSize41(e.target.value||size41))}/>
            </div>
            <div className="size">
            <div className="sizeTitle">Size42</div>
            <input className="inputSize42" type={'number'}onClick={()=>{if(sizeError!==''){setSizeError('')}}} defaultValue={size42} onChange={(e:any)=>dispatch(setSize42(e.target.value||size42))}/>
            </div>
          </div>
          }
        <div role={'button'} className="updateSubmit" onClick={handleSubmit}>
          <h2 className="updateSubmit-text">Save change</h2>
        </div>
        </div>
      </div>
}

export const ManageProduct=()=>{
  
  
  const navigate = useNavigate()
  const params = useParams();
  const id=params.id;
  const api='https://purchasing-v1.onrender.com/api/v1/products/'+id
  let token = getCookie('token');
  if(!token){
    navigate('/admin/login')
  }
  
    

  const handleSubmit=async(formdata:any)=>{
    const token =getCookie('token')
 
  try{
    const res = await client.patch('/api/v1/products/'+id,formdata,{
      headers:{authorization:'Bearer '+token}
      })
      navigate('/admin/products')
  }catch(error:any){
    console.log(error.config)
  }
}
    return (<FormProduct postFuntion={handleSubmit} getFuntion={true}/>);
  }
