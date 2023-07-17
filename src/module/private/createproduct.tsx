import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "../cookie";

import chevronDown from '../../image/chevronDown.svg'

export const CreateProduct=()=>{
    const token=getCookie('token')
  
    const client = axios.create({
      baseURL: "http://localhost:3000" 
    });
    const navigate = useNavigate()
      const [image, setImage] = useState('');
      const [productname, setProductname] = useState();
      const [description, setDescription] = useState();
      const [price, setPrice] = useState();
      const [files, setFiles] = useState('');
    const [sizeS, setSizeS] = useState();
    const [sizeM, setSizeM] = useState();
    const [sizeL, setSizeL] = useState();
    const [size39, setSize39] = useState();
    const [size40, setSize40] = useState();
    const [size41, setSize41] = useState();
    const [size42, setSize42] = useState();
    const [catalog, setCatalog] = useState('Chain');
    const [select, setSelect] = useState(false);
      
  
    const handleAvatar=(e:any)=>{
     
      setFiles(e.target.files[0])
      const file =  e.target.files[0]
       const url =URL.createObjectURL(file)
      if(url){
        setImage(url)
      }
      
    }
    const handleSubmit=async()=>{
     
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
      const res = await client.post('http://localhost:3000/api/v1/products/',formdata,{
        headers:{authorization:'Bearer '+token}
        })
        console.log(res.data)
        navigate('/enterprise/v1/product')
    }catch(error:any){
      console.log(error.config)
    }
  }
  
  
  const handleClick=()=>{
    setSelect(!select)
  }
if(!token)
{
navigate('/api/v1/login')
}
return (
      <div className="productbox">
        <div className="productUpdateWrapper">
          <h2>Create new product</h2>
          <div className="fieldUpdate">
            <div className="titleUpdate">Catalog</div>
            <div role={'button'} onClick={handleClick} className="catalogWrapper">
            <div className="catalogText">{catalog}</div>
            <img className="chevron" alt="Icon ionic ios arrow" width={'20px'} height='20px' src={chevronDown} />
            </div>
            {select&&
            <div className="selectCatalogWrapper">
                <div className="option" onClick={()=>{setCatalog('Glass');setSelect(!select)}} >Glass</div>
                <div className="option" onClick={()=>{setCatalog('Chain');setSelect(!select)}}>Chain</div>
                <div className="option" onClick={()=>{setCatalog('Watch');setSelect(!select)}}>Watch</div>
                <div className="option" onClick={()=>{setCatalog('Tie');setSelect(!select)}}>Tie</div>
            </div>}
            
          </div>
          {image?<img className="product-image" alt={'productimage'} src={image} width='200px' height='200px'/>:<div className="product-image"style={{backgroundColor:'white'}} ></div>}
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
          <input className="inputPrice" type='number' placeholder={'price'} defaultValue={price}onChange={(e:any)=>setPrice(e.target.value)}/>
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
            <h2 className="updateSubmit-text">Save </h2>
          </div>
          </div>
        </div>
      );
    }
  