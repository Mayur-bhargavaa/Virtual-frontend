import React from 'react'
import ProductPage from '../../components/Products/ProductPage'
 import CarouselContainerPlants from '../../components/Crousel/CarouselContainerPlants'

const Product = ({addToCart}) => {
  return (
    <>
    <div className="crouselmain">
       {/* Pass the FakeStore API for testing */}
       <CarouselContainerPlants apiUrl="https://fakestoreapi.com/products" heading=""/>
    </div>
    <section className='Products'>
      <ProductPage addToCart={addToCart}/>
    </section>
      
    </>
  )
}

export default Product

