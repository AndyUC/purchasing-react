import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getCookie } from '../cookie';
import '../../css/ordermanagement.css'

type Order={
    index:number,
    orderId:string,
    cusName:string,
    phone:number,
    address:string,
    email:string,
    status:string,
    updatetime:Date,
    createtime:Date,
    carts:[{productid:string,quantity:number,size:string}],
    setOrders:Function
}
function OrderComponent(props:Order) {
    const token = getCookie('token')
    const client = axios.create({
        baseURL: "http://localhost:3000" 
      });
    async function moveTo(arg:String) {
        try {
            const res = await client.patch('http://localhost:3000/api/v1/order/'+props.orderId,{status:arg},{
                headers:{authorization:'Bearer '+token}
                })
                props.setOrders();
                console.log(res.data)
                ;
            }catch(error:any){
               console.log(error)
            }
        }
    return ( 
        <div className='Order'>
            <h3 className='ID'>{props.orderId}</h3>
            <div className='form'>
                <div className='formtitle'>Cus name</div>
                <div>: {props.cusName}</div>
            </div>
            <div className='form'>
                <div className='formtitle'>Phone</div>
                <div>: {props.phone}</div>
            </div>
            <div className='form'>
                <div className='formtitle'>Address</div>
                <div>: {props.address}</div>
            </div>
            <div className='form'>
                <div className='formtitle'>Email</div>
                <div>: {props.email}</div>
            </div>
            <div className='form'>
                <div className='formtitle'>Product</div>
            </div>
            <table className='cart'>
                <tbody>
                <th>ID</th>
                <th>QTY</th>
                <th>Size</th>
                <th>Amount</th>
                {props.carts.map((cart:any,index:number)=>
                    <tr key={index}>
                        <td>{cart.productid}</td>
                        <td>{cart.quantity}</td>
                        <td>{cart.size}</td>
                        <td>{cart.price*cart.quantity||''}</td>
                    </tr>  
                )}
                </tbody>
            </table>
            {(props.status==='packaging')?
            <div className='orderHandle'>
               <div className='timeStamp'>Create At :{props.createtime.toString()}</div> 
               <div role={'button'} onClick={()=>{moveTo('shipping')}}> Move to shipping</div>
            </div>:
            (props.status==='shipping')?
            <div className='orderHandle'>
                <div>Start Ship At :{props.updatetime.toString()}</div> 
               <div role={'button'} onClick={()=>{moveTo('completed')}}> Move to Complete</div>
               <div role={'button'} onClick={()=>{moveTo('pakaging')}}> Return back to Pakaging</div>
            </div>:
            <div>
                 <div className='timeStamp'>Complete At :{props.updatetime.toString()}</div> 
               <div role={'button'} onClick={()=>{moveTo('shipping')}}> Return back to shipping</div>
            </div>
            }
        </div>
     );
}


export const OrderManagement=()=>{
   
    const [token, setToken] = useState(getCookie('token'));
    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState('packaging');
     let navigate = useNavigate();

     const remove=(index:number)=>{
        let neworders=[...orders]
        if(index===0){
            neworders.shift()
        }else{
            neworders.splice(index,1)
        }
       
      setOrders(neworders)
    }
    const fetchData= async(api:string)=>{
       try {
        if (token===''){
            navigate('/api/v1/login')
        }
        const  res = await axios.get('http://localhost:3000/api/v1/order/?orderStatus='+orderStatus,{headers:{authorization:'Bearer '+token}})
        
       setOrders(res.data.orders)
       console.log(res.data.orders)
       } catch (error) {
        console.log(error)
       } 
    }
    useEffect(()=>{
        console.log(orderStatus)
    let api = 'http://localhost:3000/api/v1/order/?orderStatus='+orderStatus
    console.log(api)
       fetchData(api)
  },[orderStatus])
    return(
    <div className='Orders'>
        <div className='StatusWraper'>
        {(orderStatus==='packaging')?
        <div className='status' role={'button'} key={'packaging'} style={{backgroundColor:'#ece9e9e9'}} onClick={()=>setOrderStatus('packaging')}>Pakaging</div>
        :<div className='status' role={'button'} key={'packaging'} onClick={()=>setOrderStatus('packaging')}>Pakaging</div>
        }
        {(orderStatus==='shipping')?
        <div className='status' role={'button'} key={'shipping'} style={{backgroundColor:'#ece9e9e9'}} onClick={()=>setOrderStatus('shipping')}>Shipping</div>
        :<div className='status' role={'button'} key={'shipping'} onClick={()=>setOrderStatus('shipping')}>Shipping</div>
        }
        {(orderStatus==='completed')?
        <div className='status'role={'button'} key={'completed'} style={{backgroundColor:'#ece9e9e9'}} onClick={()=>setOrderStatus('completed')}>Completed</div>
        :<div className='status'role={'button'} key={'completed'} onClick={()=>setOrderStatus('completed')}>Completed</div>
        }
        </div>
        {orders.map((order:any,index:number)=>
            
            <OrderComponent
            key={index}
            index={index}
            orderId={order._id}
            cusName={order.orderName}
            phone={order.phoneNumber}
            address={order.address}
            email={order.email}
            status={orderStatus}
            createtime={order.createdAt}
            updatetime={order.updatedAt}
            carts={order.cart}
            setOrders={()=> remove(index)}/> 
        )}
            
       
    </div>
    )
}