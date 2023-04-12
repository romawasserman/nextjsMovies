import React from "react";
import ActorCard from "./ActorCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Typography } from "@mui/material";
import CrewCard from "./CrewCard";
const Credits = ({credits}) => {
    const {cast, crew} = credits;
    
    const filteredCrew = crew.reduce((acc, curr) => {
        const existing = acc.find((obj) => obj.name === curr.name);

        if (!existing) {
            acc.push(curr);
        }

        return acc;
    }, [])
    .sort((a, b) => (b.profile_path ? 1 : -1));;

    const sortedCast = cast.sort((a,b) => (b.profile_path ? 1 : -1))
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <>
        <Typography textAlign={'center'} variant='h2'>Cast members</Typography>
        {cast && <Carousel responsive={responsive}
                sx={{
                    width: '100%',
                    overflow: 'hidden'
                }}
                slidesToScroll={5}
                slidesToShow={5}
                >
                    {sortedCast.map((actor) => <ActorCard key={actor.id} actor={actor}/>)}
                 </Carousel>}
        <Typography textAlign={'center'} variant='h2'>Crew members</Typography>
        {crew && <Carousel responsive={responsive}
                sx={{
                    width: '100%',
                    overflow: 'hidden'
                }}
                slidesToScroll={5}
                slidesToShow={5}
                >
                    {filteredCrew.map((member) => <CrewCard key={member.id} member={member}/>)}
                 </Carousel>}
        </>
    )
}

export default Credits