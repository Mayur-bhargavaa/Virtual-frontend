import React, { useEffect, useState } from 'react';
import CarouselComponent from '../../components/Crousel/CarouselComponent';
import axios from 'axios';
import './Carousel.css'


function CarouselContainerPlants({ heading  }) {
  const apiUrl = 'http://localhost:8802/alldata/product'; // Replace with your API URL
  const [data, setData] = useState([]);
console.log("api usrl is :- ", apiUrl)
  useEffect(() => {
    const fetchData = async () => {
      if (!apiUrl) return;
  
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
  
        // Try to find the array inside the response
        const arrayData = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
            ? data.products
            : [];
  
        const slicedData = arrayData.slice(10, 15).map((item) => ({
          image: item?.image || 'https://via.placeholder.com/150',
          caption: {
            title: item?.title || 'Product Title',
            text: item?.description || 'Description not available',
          },
        }));
  
        setData(slicedData);
      } catch (error) {
        console.error('Failed to fetch data from API:', error);
      }
    };
  
    fetchData();
  }, [apiUrl]);
  console.log(data);
  return (
    <div className="container">
      <h2 className="heading">{heading}</h2>
      {data.length > 0 ? <CarouselComponent slides={data} /> : <p>Loading...</p>}
    </div>
  );
}

export default CarouselContainerPlants;
