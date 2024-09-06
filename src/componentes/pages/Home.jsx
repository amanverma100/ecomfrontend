import React from 'react'
import CategoryItems from './Product/CategoryItems'
import Banner from './Banner'
import ProductGroup from './Product/ProductGroup'
const Home = () => {
        
  return (
    <div className='bg-gray-300  pt-[3px] md:pt-[6px]  md:px-2'>
    
    <CategoryItems/>
     <Banner/>
     <ProductGroup/>
    </div>
  )
}

export default Home
