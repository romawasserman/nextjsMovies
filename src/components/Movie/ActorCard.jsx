import { Box, Typography } from "@mui/material"
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

const ActorCard = ({actor}) => {
    const BASE_URL = 'https://image.tmdb.org/t/p';
    const POSTER_SIZE = 'w500';
    const posterUrl=`${BASE_URL}/${POSTER_SIZE}/${actor.profile_path}`
    const skeletonUrl = `https://www.pngitem.com/pimgs/m/287-2876223_no-profile-picture-available-hd-png-download.png`


    const router = useRouter();
    const goToPerson = () => {
        router.push(`/people/${actor.id}`);
    }

    return (
        <Box width='100%' flex={'0 0 auto'}> 
                <Image src={actor.profile_path ? posterUrl : skeletonUrl} width='240' height='300' alt={actor.name} onClick={goToPerson}/>
            <Box width='100%'>
                <Typography textAlign={'center'} variant={"h5"}>{actor.name}</Typography>
                <Typography textAlign={'center'}>Played as {actor.character}</Typography>
            </Box>
        </Box>
    )
}

export default ActorCard