import React from 'react'
import CarouselContainerPlants from '../../components/Crousel/CarouselContainerPlants'
import "./ExplorePlantsPage.css";

const ExplorePlantsPage = () => {
  return (
    <>
    <div className="crouselmain">
       {/* Pass the FakeStore API for testing */}
       <CarouselContainerPlants  heading="Featured Medicinal Plants" />
    </div>
    <section className='exploreplant'>
    </section>
    </>
  )
}

export default ExplorePlantsPage
