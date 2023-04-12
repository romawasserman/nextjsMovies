import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

const FilmDetails = ({film}) => {
    const {character, id, title, overview, poster_path, release_date, backdrop_path} = film;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const GoToMovie = () => {
        router.push(`/movie/${id}`);
      };
    const [buttonHovered, setButtonHovered] = useState(false)

    const BASE_URL = 'https://image.tmdb.org/t/p';
    const POSTER_SIZE = 'w500';
    const moviePath = poster_path ? poster_path : backdrop_path;
    const posterUrl=`${BASE_URL}/${POSTER_SIZE}/${moviePath}`
    const movieSkeletonUrl = 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg';

    const router = useRouter();
    return (
        <Box display={'flex'} border={`1px ${colors.greenAccent[800]} dashed`} alignItems='center'>
            <Typography width={'25%'} m='2px 0'>{title}</Typography>
            <Typography width={'25%'} m='auto'>{release_date}</Typography>
            <Typography width={'25%'} m='auto'> {character ? character : film.job} </Typography>
            <Button onClick={GoToMovie} 
                    onMouseEnter={() => setButtonHovered(true)}
                    onMouseLeave={() => setButtonHovered(false)}
                sx={{
                color : colors.greenAccent[500],
                top : '-3px',
                }}
            >WATCH</Button>
            {buttonHovered && (<Image src={moviePath ? posterUrl : movieSkeletonUrl} alt={title} width={300} height={200} onMouseEnter={() => setButtonHovered(true)} onMouseLeave={() => setButtonHovered(false)} onClick={GoToMovie} style={{cursor: 'pointer'}}></Image>) }

        </Box>
    )
}

export default FilmDetails