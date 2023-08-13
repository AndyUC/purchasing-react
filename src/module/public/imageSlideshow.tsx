import { url } from 'inspector';
import React, {  useEffect, useRef, useState } from 'react';
import {Animated, SafeAreaView, View} from 'react-native'
import { useNavigate } from 'react-router';
import chevronDown from '../../image/chevronDown.svg';


const contentStyle: React.CSSProperties = {
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

interface Picture{
    url:string,
    navigate?:string,
    slogan?:string
}
type ImageSlideShowProps={
    pictures:Array<Picture>,
    ratio:string,
   
}


const ImageSlideShow = (props:ImageSlideShowProps) => {
  const topMotion = useRef(new Animated.Value(10)).current
  const navigate= useNavigate()
  const [showImage, setShowImage] = useState(0);
  const [ImageWidth, setImageWidth] = useState(0);
  
  useEffect(()=>{
    // eslint-disable-next-line no-restricted-globals
    setImageWidth(screen.availWidth-120)
  },[// eslint-disable-next-line no-restricted-globals
    screen])
  useEffect(()=>{
    const value=-showImage*(ImageWidth+20)
    Animated.timing(
      topMotion,
      {
        toValue: value,
        duration:1000,
        useNativeDriver: false
      }
    ).start()
  },[showImage])
  const handlePrevClick = () => {
   if(showImage<1){
    setShowImage(props.pictures.length-1)
   }else{
    setShowImage(showImage-1)
   }
  };
  const handleNextClick = () => {
   if(showImage===(props.pictures.length-1)){
    setShowImage(0)
   }else{
    setShowImage(showImage+1)
   }
  };
  let touchStartX = 0;
  let touchEndX = 0;
  const checkDirection=()=>{
    if(touchStartX<touchEndX){
      handlePrevClick()
      return
    }
    if(touchStartX>touchEndX){
      handleNextClick()
      return
    }
  }
  var currentTouch = document.getElementById('ImageWrapper');
  currentTouch?.addEventListener('touchstart',(e)=>{
    touchStartX= e.changedTouches[0].screenX
  })
  currentTouch?.addEventListener('touchend',(e)=>{
    touchEndX= e.changedTouches[0].screenX
    checkDirection()
  })

  return (
    <div className='Component-Wrapper' style={{display:'flex',flexDirection:'row',width:'100%',marginTop:'10px'}}>
    <div role='button' style={{display:'flex',width:'50px',top:0,left:0,zIndex:1}} onClick={()=>handlePrevClick()}><img style={{transform:'rotate(90deg)',opacity:'25%'}} src={chevronDown}/></div>
    <div className='ImageWrapper' id='ImageWrapper' style={{width:(ImageWidth+20)+'px',overflow:'hidden'}}  >
    <SafeAreaView>
      <Animated.View style={{display:'flex',width:'auto',flexDirection:'row',marginLeft:(topMotion)}}>
        {props.pictures.map((picture:Picture,index)=>
        picture.navigate?
        <div key={index} className='CurrentPicture' style={{display:'flex',justifyContent:'center'}} role='button' onClick={()=>navigate(picture.navigate||'')}>
            <img className='img' style={{width:ImageWidth+'px',marginLeft:'10px',marginRight:'10px',aspectRatio:props.ratio}} alt='picture' src={picture.url} ></img>
            <div className='description' style={{top:(ImageWidth*0.4)+'px',width:(ImageWidth-40)+'px',position:'absolute',color:'white',marginLeft:'0px',fontSize:'30px',fontWeight:'550',fontFamily: "MGeorgia, 'Times New Roman', Times, serifontserrat-SemiBoldItalic",fontStyle:'oblique',letterSpacing:'1.2px'}}>{picture.slogan}</div>
            <div className='shop' style={{position:'absolute',top:(ImageWidth*0.7)+'px',zIndex:2,color:'white',fontSize:'25px',fontWeight:'500',textDecoration:'underline',fontFamily: "ui-sans-serif"}}>Shop Collection</div>
        </div>:
        <div className='CurrentPicture' >
            <img className='img' style={{width:ImageWidth+'px',marginLeft:'10px',marginRight:'10px',aspectRatio:props.ratio}} src={picture.url||''} ></img>  
        </div>
            
        )}
      </Animated.View>
    </SafeAreaView>
    </div>
    <div role='button' style={{display:'flex',width:'50px',top:0,left:0,zIndex:1,overflow:'hidden'}} onClick={()=>handleNextClick()}><img style={{transform:'rotate(-90deg)',opacity:'25%'}} src={chevronDown}/></div>
    </div>
  );
};



export default ImageSlideShow;