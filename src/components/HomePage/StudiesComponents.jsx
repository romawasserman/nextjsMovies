import { Box } from "@mui/material";
import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'
import StudyCard from "./StudyCard";

const StudiesComponents = ({studies}) => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }}
        const uniqueStudies = Array.from(new Set(studies.map(item => item.id)))
        .map(id => studies.find(item => item.id === id));
    return <Box width='30%' padding='15px'  ><Carousel
        responsive={responsive}
        deviceType={'desktop'}
        infinite={true}
        containerClass='carousel-container'
        itemClass='carousel-image-item'
    >
      {uniqueStudies && uniqueStudies.map((study) => study.logo_path && <StudyCard study={study} key={study.id}/>)}
    </Carousel></Box> ;
    
}

export default StudiesComponents