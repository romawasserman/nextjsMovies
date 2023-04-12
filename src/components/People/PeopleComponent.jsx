import { Box, Typography } from "@mui/material"
import Image from "next/image"
import { useState } from "react"
import { useEffect } from "react"
import Header from "../Header"
import FilmDetails from "./FilmDetails"



const PeopleComponent = ({person, movieCredits}) => {
    console.log('person:', person )
    console.log('movieCredits', movieCredits)
    const BASE_URL = 'https://image.tmdb.org/t/p';
    const POSTER_SIZE = 'w300';
    const posterUrl=`${BASE_URL}/${POSTER_SIZE}/${person.profile_path}`


    const [credits, setCredits] = useState([]);

    useEffect(() => {
        if (movieCredits) {
          setCredits(movieCredits.cast.length > movieCredits.crew.length ? movieCredits.cast : movieCredits.crew );
        }
      }, {movieCredits});

    const sortedCredits = credits.slice().sort((a,b) => {
        return new Date(b.release_date) - new Date(a.release_date);
    })

    return (<>
            <Header title="Everything about cinema"
            subtitle={person.name}/>
        <Box display='flex' width='100%' height='85vh' justifyContent='space-between' padding='30px'>
            <Box display='flex' justifyContent={'space-around'} width='60%'>
                <Box mt='50px'>
                    <Image src={posterUrl} key={person.id} width={300} height={450} alt={person.name}/> 
                </Box>
                <Box mt='50px' ml='30px'>
                    <Typography variant="h3">{person.name}</Typography>
                    <Typography variant='h5' m='5px 0'>{person.birthday} {person.deathday ? `-${person.deathday}` : null}    </Typography>
                    <Typography variant='h4'>{person.place_of_birth}</Typography>
                    <Typography variant="h5" mt='15px'>Biography : {person.biography} </Typography>
                </Box>
            </Box>
            <Box display='flex' width='40%' mt='50px' ml='30px' flexDirection={'column'}>
                {sortedCredits.map((film) => {
                    return <FilmDetails film={film}/>
                })}
            </Box>    
        </Box>
            </>
    )
}

export default PeopleComponent