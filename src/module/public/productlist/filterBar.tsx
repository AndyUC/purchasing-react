import React, { useState } from "react"

import chart from '../../../image/chart.png'
import  '../../../css/filter/filterBar.css'
import { useLocation, useNavigate } from "react-router"


export const FilterBar=()=>{
    const navigate=useNavigate()
    const location= useLocation()
    const [sortby, setSortby] = useState('');
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const clearAll=()=>{
        setSortby('')
        setMaxPrice(0)
        setMinPrice(0)
    }
    const apply=()=>{
        let url='?'
        if(location.search===''){
          if(maxPrice>0){
            url=url+'&maxprice='+maxPrice
          }
          if(minPrice>0){
            url=url+'&minprice='+minPrice
          }
          if(sortby!==''){
            url=url+'&sort='+sortby
          }
          navigate('/products'+url)
        }else{
          let value = location.search.split('?')
          let searchs= value[1].split('&')
          console.log(searchs)
         searchs.map((search:string)=>{
            if(!search.includes('minprice')&&!search.includes('maxprice')&&!search.includes('sort')&&!search.includes('=')&&search!==''){
              url=url+search+'&'
              console.log(url)
            }
          })
          if(maxPrice>0){
            url=url+'&maxprice='+maxPrice
          }
          if(minPrice>0){
            url=url+'&minprice='+minPrice
          }
          if(sortby!==''){
            url=url+'&sort='+sortby
          }
            navigate('/products'+url)
        }
        
        
        
    }
    return(
        <div className="filters">
        <div className="filterWrapper">
            <div className="filterTitle">Sort by</div>
            <div className="sortbyPrice">
            <input className="radio" type='radio' key="-price" checked={sortby==='-price'} onClick={()=>setSortby('-price')} /><p>Price: High - Low</p>
            </div>
            <div className="sortbyPrice">
            <input className="radio" type='radio' key="price"checked={sortby==='price'} onClick={()=>setSortby('price')}/><p>Price: Low-High</p>
            </div>
            <div className="sortbyPrice">
            <input className="radio" type='radio' key=""checked={sortby===''} onClick={()=>setSortby('')}/><p>No Sort</p>
            </div>   
        </div>
        <div className="filterWrapper">
        <div className="filterTitle">Price</div>
        <img className="chart" src={chart} width='220px' height={'60px'}></img>
        <div className="priceFilter">
        <div className="pricetitle">From</div>
        <input className="pricevalue" type={'number'} value={minPrice} width='30px' height={'20px'} onChange={(e:any)=>setMinPrice(e.target.value)}/>
        <div className="distance"> </div>
        <div className="pricetitle">To</div>
        <input className="pricevalue" type={'number'} value={maxPrice} width='30px' height={'20px'}onChange={(e:any)=>setMaxPrice(e.target.value)}/>
        </div>
        </div>
        <div className="filterFooter">
        <div role="button" className="clearAll" onClick={clearAll}>Clear All</div>
        <div className="filterFooterDistance"></div>
        <div role="button" className="apply" onClick={apply}>Apply</div>
        </div>
    </div>
    )
}