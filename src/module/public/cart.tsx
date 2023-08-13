import React, {useState,useEffect} from "react";
import {  useNavigate } from "react-router-dom";

import '../../css/cart.css'
import trash from '../../image/trash-solid.svg'
import { Back } from "../backbutton";
import { useCartContext } from "../../store/Provide";

type CartProductProps={
    index:number,
    productid:string,
    productname:string,
    imagePath:string,
    catalog:string,
    size:string,
    price:number,
    quantity:number,
    remove:Function,
    updateQuantity:Function,
    updateSize:Function
  }
  
 export const CartProduct=(props:CartProductProps)=>{
   
    const handleAddclick=()=>{
        props.updateQuantity(props.index,(props.quantity+1))
      }
      const handleDecreaseClick=()=>{
        if(props.quantity>0){
          props.updateQuantity(props.index,(props.quantity-1))
        }
    }
   const handleChange=(size:string)=>{
    props.updateSize(props.index,size)
   }
    return(
    <div className="cartProductBox" >
      <div className="Delete" role="button" onClick={()=>props.remove()}>
        <img className="trash" height={'20px'} width={'20px'} src={trash}/>
      </div>
        <div className="cartProductWrapper">
        <img className="productimg" alt={props.productname} src={props.imagePath} />
          <div className="cartProduct">
            <div className="productname">{props.productname}</div>
            <div className="cartDeltail">
            <div className="price">{props.price}  US$</div>
            <div className="size wrap" >
                <div className="size">
                    Size : {props.size.split('size')}
                {(props.catalog==='Chain'||props.catalog==='Tie')?
            (<div className="sizeSelection">
            <div className="Size" role='button' style={(props.size==='sizeS')?{backgroundColor:'red',color:'white'}:{}}  onClick={()=>handleChange('sizeS')}>SizeS</div>
            <div className="Size" role='button' style={(props.size==='sizeM')?{backgroundColor:'Blue',color:'white'}:{}}  onClick={()=>handleChange('sizeM')} >SizeM</div>
            <div className="Size" role='button' style={(props.size==='sizeL')?{backgroundColor:'Green',color:'white'}:{}}  onClick={()=>handleChange('sizeL')} >SizeL</div>
          </div>):
          <div className="sizeSelection">
           <div className="Size" role='button' style={(props.size==='size39')?{backgroundColor:'red',color:'white'}:{}}  onClick={()=>handleChange('size39')}>Size39</div>
          <div className="Size" role='button' style={(props.size==='size40')?{backgroundColor:'Blue',color:'white'}:{}}  onClick={()=>handleChange('size40')} >Size40</div>
          <div className="Size" role='button' style={(props.size==='size41')?{backgroundColor:'Green',color:'white'}:{}}  onClick={()=>handleChange('size41')} >Size41</div>
          <div className="Size" role='button' style={(props.size==='size42')?{backgroundColor:'Purple',color:'white'}:{}}  onClick={()=>handleChange('size42')} >Size42</div>
        </div>}
            </div>
            </div>
            </div>
            </div>
        </div>
        
        <div className="quantityWrapper">
                <div role="button" className="button" onClick={handleAddclick}>+</div>
                <div className="quantity">{props.quantity}</div>
                <div role="button" className="button" onClick={handleDecreaseClick}>-</div>
        </div>
        <div className="amountThis">Total :{props.price*props.quantity}</div>
      </div>  
    )
  }
type CartType ={
  setShowCart:Function
}
 export const Cart=(props:CartType)=>{
    const {cart,setCart}=useCartContext()
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate()
    useEffect(()=>{
      let total =0;
      cart.forEach((cart:any )=> {
        total +=cart.price*cart.quantity
      })
    setAmount(total)},[cart])

  let newcart= [...cart]
    const updateQuantity=(index:number,quantity:number)=>{
      cart[index].quantity=quantity
      setCart(newcart)
      localStorage.setItem('cart',JSON.stringify(newcart))
    }
    const remove=(index:number)=>{
        if(index===0){
            newcart.shift()
        }else{
            newcart.splice(index,1)
        }
       
        setCart(newcart)
        localStorage.setItem('cart',JSON.stringify(newcart))
    }
    const updateSize=(index:number,size:string)=>{
        newcart[index].size=size
        setCart(newcart)
        localStorage.setItem('cart',JSON.stringify(newcart))
    }
    return(
 
       
       <div className="CartCover">
        <div>
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
        <div className="cartFooter">
          <div className="amountCart">Total :{amount}  US$</div>
          <div className="Buy" onClick={()=>{ navigate('/order');props.setShowCart(false)}}>
            <div className="text-Content">Buy Cart</div>
          </div>
        </div>
       </div>
      )
  }
  