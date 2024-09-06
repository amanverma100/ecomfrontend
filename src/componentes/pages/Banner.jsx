import React from 'react'
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import firstimg from '../../assets/banner/Image1.jpg'
import secondimg from '../../assets/banner/image2.jpg'
import thirdimg from '../../assets/banner/image3.jpg'
import forthimg from '../../assets/banner/image4.jpg'
import { useEffect } from 'react';
import { useState } from 'react';
const Banner = () => {
    const [transX,setTransX]=useState(0);
    const bannerArray1=[
        firstimg,secondimg,thirdimg,forthimg
    ]
     function rightShift()
     {      
          if(transX<bannerArray1.length-1)
            {    
                setTransX((prev)=>prev+1);
            }
            
     }
     function leftShift()
     {
        if(transX>0)
            {
              setTransX((prev)=>prev-1);
            }
     }
     useEffect(()=> {
           const interval=setInterval(()=>
            {
                if(transX<bannerArray1.length-1)
                    {    
                        setTransX((prev)=>prev+1);
                    }
                else if(transX===bannerArray1.length-1)
                    {
                        setTransX(0);
                    }
        
            }
          ,3000)
          return ()=>clearInterval(interval);
        },)
  return (
    <>
    <div className='bg-red-600 overflow-hidden flex relative flex-row md:h-[18vw] h-[30vw] shadow-md rounded-sm w-full mt-2 md:mt-4'>
   { bannerArray1.map( (image,index)=> {
   return(
    <img className='w-full h-full transition-all 'style={{transform:`translateX(-${transX*100}%)`}} src={image} key={index} alt="imagesummerVibes" />
   )
}
)
} 
<FaChevronLeft className='text-[3vw] cursor-pointer h-3vw w-3vw  rounded-full hover:bg-gray-800 text-white absolute md:top-[7.5vw] top-[14vw] md:left-2 left-1 ' onClick={leftShift}/>
<FaChevronRight className='text-[3vw] h-3vw w-3vw  rounded-full hover:bg-gray-800  cursor-pointer text-white absolute md:top-[7.5vw] top-[14vw] md:right-2 right-1 ' onClick={rightShift}/>
</div>
</>
  )
}

export default Banner
