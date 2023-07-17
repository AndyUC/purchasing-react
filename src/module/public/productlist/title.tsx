import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import chevronDown from '../../../image/chevronDown.svg';







const SelectCatalog =()=>{
 
  return(
    <div className="CATALOG-MULTICHOICE">
    <div className="div">
      <Link className="text-wrapper" to='/api/v1/products/?catalog=Glass' >GLASS</Link>
      <Link className="text-wrapper-2" to='/api/v1/products/?catalog=Chain'>CHAIN</Link>
      <Link className="text-wrapper-3" to='/api/v1/products/?catalog=Watch'>WATCH</Link>
      <Link className="text-wrapper-4" to='/api/v1/products/?catalog=Tie'>TIE</Link>
      <Link className="text-wrapper-5" to='/api/v1/products/'>ALL PRODUCT</Link>
    </div>
  </div>
  )
}


export const Title=()=>{
  const[state,setState]=useState(false)
  
    const handleOnclick=()=>{
        
          if(state===true){
            setState(false)
          }else{
            setState(true)
          }
        }
let title='ALL PRODUCT'
const location = useLocation()
const searchs = location.search.split('&')
searchs.map((search:string)=>{
    if(search.includes('catalog')){
        const item = search.split('=')
        title=item[1]
    }
})

  return(
    <div className="box" role='button' onClick={handleOnclick}>
      <div className="group-wrapper">
        <div className="group">
          <div className="overlap-group">
          <div className="text-wrapper">{title}</div>
            <img className="icon-ionic-ios-arrow" alt="Icon ionic ios arrow" src={chevronDown} />
          </div>
        </div>
      </div>
      {state&&<SelectCatalog/>}
    </div>
    )
}


