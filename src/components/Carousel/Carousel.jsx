import React from 'react'
import {img} from './img/data.js'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Carousel.Module.css'
const CarouselEffect = () => {
    return (
    <div>
        <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        >
           {  
           img.map((imageItemLink)=>{
            return <img src={imageItemLink} />
           })
           }
        </Carousel>
        <div className="hero_img"></div>
    </div>
    )
}

export default CarouselEffect