import React from 'react'
import CategoryWise from './CategoryWise'
const ProductGroup = () => {
  return (
    <div className='bg-gray pb-6 pt-3 '>
    <CategoryWise catg="airpodes" heading="TopAirpods"></CategoryWise>
    <CategoryWise catg="mobile" heading="Mobile"></CategoryWise>
    <CategoryWise catg="camera" heading="camera"></CategoryWise>
    <CategoryWise catg="refrigerator" heading="refrigerator"></CategoryWise>
    <CategoryWise catg="earphone" heading="Earphone"></CategoryWise>
    <CategoryWise catg="tv" heading="TV"></CategoryWise>
    <CategoryWise catg="mouse" heading="mouse"></CategoryWise>
    <CategoryWise catg="speaker" heading="Speaker"></CategoryWise>
    <CategoryWise catg="trimmer" heading="Trimmer"></CategoryWise>
    <CategoryWise catg="airpodes" heading="TopAirpods"></CategoryWise>
    </div>
  )
}

export default ProductGroup
