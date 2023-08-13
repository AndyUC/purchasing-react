import React, {useState,useEffect} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import filter from '../../../image/filter-solid.svg';
import { FilterBar } from "./filterBar";
import deleteicon from '../../../image/delete.svg';
import '../../../css/filter/filter.css'

export const Filter=()=>{
    const [filterBar, setFilterBar] = useState(false);
    let minprice=''
    let maxprice=''
    const navigate=useNavigate()
    const location=useLocation();
    let searchs=location.search.split('?')
    if(searchs[1]){
      searchs=searchs[1].split('&')
    // eslint-disable-next-line array-callback-return
    searchs.map((search:string):void=>{
      if(search.includes('minprice')){
        const minpriceObj= search.split('=')
        minprice=minpriceObj[1]
      }
      if(search.includes('maxprice')){
        const maxpriceObj= search.split('=')
        maxprice=maxpriceObj[1]
      }
    })
    }
    
  
    const removePriceFilter=()=>{
      let url=''
      // eslint-disable-next-line array-callback-return
      searchs.map((search:string)=>{
        if(!search.startsWith('minprice')&&!search.startsWith('maxprice')&&(search!=='')){
          url+=url+search+'&'
        }
      })
        navigate('/products?'+url)
    }
    const removeSortFilter=()=>{
      let url=''
      searchs.map((search:string)=>{
        if(!search.includes('sort')&&search!==''){
          url+=url+search+'&'
        }
      })
        navigate('/products?'+url) 
    }
    
    
    return(
    <div className="filterbox">
          <button className="buttonfilter">
            <img className="filterIcon" alt="filterIcon" src={filter} />
            <a className="text-wrapper" onClick={()=>setFilterBar(!filterBar)}>Filter</a>
          </button>
          {filterBar&&(
          <div className="filterboxWraper">
          <FilterBar/>
          <img className="offfilter" src={deleteicon} width='30px' height={'30px'}role='button'onClick={()=>setFilterBar(false)}/>
          <div role='button' className='filterSiteMark' onClick={()=>setFilterBar(false)}/>
          </div>
          )}
          <div className="filtershowed">
            {((location.search.search('minprice')!==-1)||(location.search.search('maxprice')!==-1))&&
            ( 
              <div className="pricefilterbox">
                <div className="text">{minprice+'-'+maxprice}</div>
                <img className="delete" src={deleteicon} width='15px' height={'15px'} role='button' onClick={removePriceFilter}/>
              </div>
            )}
            {(location.search.search('sort')!==-1)&&<div className="sort-by">
              <div className="sort">
                <div className="content">Sort by Price</div>
                <img className="delete" src={deleteicon} width='15px' height={'15px'}role='button'onClick={removeSortFilter}/>
              </div>
            </div>}
          </div>
          
          
          </div>
        )
  
  }
  
  
  