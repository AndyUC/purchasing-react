import React, { useEffect, useState } from "react";

import chainCatalog from '../../image/chainCatalog.jpg';
import glassCatalog from '../../image/glassCatalog.jpg';
import tieCatalog from '../../image/tieCatalog.jpg';
import watchCatalog from '../../image/watchCatalog.jpg';
import catalog from '../../image/catalog.jpg';
import '../../css/Homepage.css';
import ImageSlideShow from "./imageSlideshow";
import { TbTruckDelivery } from "react-icons/tb";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { BiPhoneCall } from "react-icons/bi";

import seasonbanner1 from '../../image/empty banner/banner1.jpeg';
import seasonbanner2 from '../../image/empty banner/banner2.jpeg';

export const Homepage = () => {
const [pictures, setPictures] = useState([{url:catalog,navigate:"/products/",slogan:'Fasshion and so much more'},
{url:chainCatalog,navigate:"/products/?catalog=Chain",slogan:'Not the chain. \n\It\'s your Individuality'},
{url:tieCatalog,navigate:"/products/?catalog=Tie",slogan:'Get your Tie. Build Your Real Man'},
{url:watchCatalog,navigate:"/products/?catalog=Watch",slogan:'Begin your own traditional'},
{url:glassCatalog,navigate:"/products/?catalog=Glass",slogan:'Brilliant appearance'}
]);
const [seasons] = useState([{imgsrc:seasonbanner1,slogan:'Smart, Romantic and Comfortable',left:true},
{imgsrc:seasonbanner2,slogan:'The role of technologies in fashion industry',left:false}
]);
  return (
    <div className="homepage" style={{display:"flex",flexDirection:'column'}}>
    <ImageSlideShow pictures={pictures} ratio="2/2"/>
    <section className="benefitCover">
      <div className="benefit">
        <TbTruckDelivery style={{width:'80px',height:'80px'}}/>
        <div className="BenefitWrapper">
          <h3 className="title">Free Shipping</h3>
          <div className="benefitDescription">Free Shipping for orders over $100.</div>
        </div>
      </div>
      <div className="benefit">
        <LiaMoneyBillWaveSolid style={{width:'80px',height:'80px'}}/>
        <div className="BenefitWrapper">
          <h3 className="title">Money Guarantee</h3>
          <div className="benefitDescription" >Within 30 days for an exchange.</div>
        </div>
      </div>
      <div className="benefit">
      <BiPhoneCall style={{width:'80px',height:'80px'}}/>
        <div className="BenefitWrapper">
          <h3 className="title">Online Support</h3>
          <div className="benefitDescription">Within 30 days for an exchange.</div>
        </div>
      </div>
    </section>
    <section className="seasonbanner" style={{display:"flex",flexDirection:'column',rowGap:'5px',marginBottom:'10px'}}>
      {seasons.map((season:any,index)=>(<Season key={index} imgsrc={season.imgsrc} slogan={season.slogan||''} left={season.left}/>))}
    </section>
     </div>
  );
};

type SeasonType ={
  imgsrc:string,
  slogan:string,
  left:boolean
}
const Season=(props:SeasonType)=>{
  return <div className="Season" style={{width:'-webkit-fill-available',display:'flex',aspectRatio:'7/4',marginLeft:'20px',marginRight:'20px',marginBottom:'20px',justifyContent:"center"}}>
    <div className="Season"style={{position:'absolute',width:'90%',zIndex:1,overflow:"hidden"}}>
    <img  src={props.imgsrc } style={{marginLeft:props.left?'-30%':'00%',width:'140%'}} ></img>
    </div>
    
   {(props.left)?
    <div className="bannerContent" style={{zIndex:3,width:'70%',display:"flex",alignItems:"center",flexDirection:"column",marginLeft:'30%',marginRight:'20px',justifyContent:"center"}}>
      <div className="title" style={{width:'100%',textAlign:"right"}}>NEW SEASON</div>
      <div className="Slogan"style={{width:'100%',textAlign:"right"}}>{props.slogan}</div>
      <div className="bannerDescription" style={{width:'100%',textAlign:"right"}}>Don't miss the opportunity.</div>
      <p style={{width:'100%',textAlign:"right"}} >Shop Now 	➛</p>
    </div>:
    <div className="bannerContent" style={{zIndex:3,width:'70%', marginLeft:'20px'}}>
    <div className="title">NEW SEASON</div>
    <div className="Slogan">{props.slogan}</div>
    <div className="bannerDescription">Don't miss the opportunity.</div>
    <p >Shop Now 	➛</p>
  </div>} 
    
  </div>
}
export default Homepage;