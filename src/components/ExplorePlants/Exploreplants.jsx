
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./Exploreplants.css";
// import PlantDetail from "./PlantDetail";

// const ExplorePlants = () => {
//   const [plants, setPlants] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState(null);
//   const [showDetail, setShowDetail] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPlants = async () => {
//       try {
//         const response = await fetch("https://virtual-i6x5.onrender.com/alldata/plants"); // Replace with your real API
//         const data = await response.json();

      

//         const formattedData = data.data.map(item => ({
//           title: item.plant.commonName || "Unknown Plant",  // Use commonName here if you want
//           commonName: item.plant.commonName || "Unknown",
//           sanskritName: item.plant.sanskritName || "Sanskrit Name",
//           botanicalName: item.plant.botanicalName || "Botanical Name",
//           image: item.plant.image_link || "https://via.placeholder.com/150",
//           description: item.plant.description || "No description available",
//           modelUrl: "/models/AloeVera.glb",
//           size: item.plant.plantSize || "Medium",
//           nativeRegion: item.plant.nativeRegion || "India",
//           preferredClimate: item.plant.preferredClimate || "Tropical",
//           requiredSunlight: item.plant.requiredSunlight || "Full Sun",
//           requiredSoil: item.plant.requiredSoil || "Loamy",
//           partsUsed: item.plant.partsUsedInMedicine || ["Leaves"],
//           activeCompounds: item.plant.activeCompounds || ["Flavonoids"],
//           therapeuticProperties: item.plant.therapeuticProperties || ["Anti-inflammatory", "Digestive"],
//           dosageForms: item.plant.dosageForm || ["Powder", "Capsule"],
//           ayushApplications: item.plant.ayushApplications || ["Used in Ayurvedic medicine for respiratory health.", "Helps in reducing stress."],
//           healthBenefits: item.plant.healthBenefits || ["Boosts immunity", "Reduces stress", "Supports respiratory health"]
//         }));
//         console.log(formattedData);
        
        
//         setPlants(formattedData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching plant data:", error);
//         setLoading(false);
//       }
//     };

//     fetchPlants();
//   }, []);

//   const handleLearnMore = (plant) => {
//     setSelectedPlant(plant);
//     setShowDetail(true);
//   };

//   const closeDetail = () => {
//     setSelectedPlant(null);
//     setShowDetail(false);
//   };

//   const sliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     pauseOnHover: true,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//       { breakpoint: 480, settings: { slidesToShow: 1 } }
//     ]
//   };

//   return (
//     <section className="explore-plants" id="explorePlants">
//       <h2 className="section-title">Explore <span>Herbal Plants</span></h2>

//       {loading ? (
//         <div className="loader-container">
//           <div className="loader"></div>
//         </div>
//       ) : (
//         <div className="mainslider">
//           <Slider {...sliderSettings}>
//             {plants.slice(0,7).map((plant, idx) => (
//               <div key={idx} className="plant-card">
//                 <div className="img">
//                   <img
//                     src={plant.image || "https://via.placeholder.com/150"}
//                     alt={plant.commonName}
//                     className="plant-image"
//                   />
//                 </div>
//                 <div className="card-details">
//                   <h3 className="plant-title">
//                     {plant.commonName.length > 20
//                       ? plant.commonName.slice(0, 20) + "..."
//                       : plant.commonName}
//                   </h3>
//                   <button
//                     onClick={() => handleLearnMore(plant)}
//                     className="learn-more-btn"
//                   >
//                     View More 🍃
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         </div>
//       )}

//       {showDetail && selectedPlant && (
//         <PlantDetail plant={selectedPlant} onClose={closeDetail} />
//       )}

//       <div className="explore-more-container">
//         <button
//           onClick={() => navigate("/explore-plants")}
//           className="explore-more-btn"
//         >
//           Explore More Plants
//         </button>
//       </div>
//     </section>
//   );
// };

// export default ExplorePlants;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Exploreplants.css";
import PlantDetail from "./PlantDetail";
import Masonry from 'react-masonry-css';

const ExplorePlants = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    768: 1
  };
  
  
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("https://virtual-i6x5.onrender.com/alldata/plants"); // Replace with your real API
        const data = await response.json();

      

        const formattedData = data.data.map(item => ({
          title: item.plant.commonName || "Unknown Plant",  // Use commonName here if you want
          commonName: item.plant.commonName || "Unknown",
          sanskritName: item.plant.sanskritName || "Sanskrit Name",
          botanicalName: item.plant.botanicalName || "Botanical Name",
          image: item.plant.image_link || "https://via.placeholder.com/150",
          description: item.plant.sanskritName || "No Sanskrit Name available",
          modelUrl: "/models/AloeVera.glb",
          size: item.plant.plantSize || "Medium",
          nativeRegion: item.plant.nativeRegion || "India",
          preferredClimate: item.plant.preferredClimate || "Tropical",
          requiredSunlight: item.plant.requiredSunlight || "Full Sun",
          requiredSoil: item.plant.requiredSoil || "Loamy",
          partsUsed: item.plant.partsUsedInMedicine || ["Leaves"],
          activeCompounds: item.plant.activeCompounds || ["Flavonoids"],
          therapeuticProperties: item.plant.therapeuticProperties || ["Anti-inflammatory", "Digestive"],
          dosageForms: item.plant.dosageForm || ["Powder", "Capsule"],
          ayushApplications: item.plant.ayushApplications || ["Used in Ayurvedic medicine for respiratory health.", "Helps in reducing stress."],
          healthBenefits: item.plant.healthBenefits || ["Boosts immunity", "Reduces stress", "Supports respiratory health"]
        }));
        console.log(formattedData);
        
        
        setPlants(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plant data:", error);
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const handleLearnMore = (plant) => {
    setSelectedPlant(plant);
    setShowDetail(true);
  };

  const closeDetail = () => {
    setSelectedPlant(null);
    setShowDetail(false);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="explore-plants" id="explorePlants">
    <h2 className="section-title-plants">Explore Herbal Plants</h2>
  
    <div className="masonry-container">
  <div className="masonry-grid">
    {plants.slice(0, 15).map((plant, idx) => (
    <div
    key={plant.commonName + idx}
    className={`plant-card ${idx % 3 === 0 ? 'tall' : 'short'}`}
    onClick={() => handleLearnMore(plant)}
  >
    <img src={plant.image} alt={plant.commonName} className="plant-image" />
    
    <div className="plant-overlay">
      <h3 className="plant-name">{plant.commonName}</h3>
      <p className="plant-description">
        {plant.description.length > 80 ? plant.description.slice(0, 80) + "..." : plant.description}
      </p>
    </div>
  </div>
    ))}
  </div>
</div>
  
    {showDetail && selectedPlant && (
      <PlantDetail plant={selectedPlant} onClose={closeDetail} />
    )}
  </section>
  
  
  );
};

export default ExplorePlants;
