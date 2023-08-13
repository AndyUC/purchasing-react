import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

import chevronDown from '../../../image/chevronDown.svg';







const SelectCatalog =()=>{
 
  return(
    <div className="CATALOG-MULTICHOICE">
    <div className="div">
      <Link className="text-wrapper" to='/products/?catalog=Glass' >GLASS</Link>
      <Link className="text-wrapper-2" to='/products/?catalog=Chain'>CHAIN</Link>
      <Link className="text-wrapper-3" to='/products/?catalog=Watch'>WATCH</Link>
      <Link className="text-wrapper-4" to='/products/?catalog=Tie'>TIE</Link>
      <Link className="text-wrapper-5" to='/products/'>ALL PRODUCT</Link>
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
        title=item[1].toUpperCase()
    }
})

  return(
    <div className="box" role='button'style={state?{zIndex:12}:{zIndex:5}} onClick={handleOnclick}>
      <div className="group-wrapper">
        <div className="group" style={state?{zIndex:12}:{zIndex:1}}>
          <div className="overlap-group" style={state?{zIndex:12}:{zIndex:1}}>
          <div className="text-wrapper">{title}</div>
            <img className="icon-ionic-ios-arrow" style={{transform:state?'rotate(180deg)':''}} alt="Icon ionic ios arrow" src={chevronDown} />
          </div>
        </div>
      </div>
      {state&&<SelectCatalog/>}
      {state&&<div role="button" className="titleSiteMark" onClick={()=>setState(!state)}/>}
    </div>
    )
}


