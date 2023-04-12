import React, { useState,} from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import FilmStars from '../elements/FilmStars';
import FilmDate from '@/elements/FilmDate';
import { useRouter } from 'next/router';

const MainPoster = ({poster, button=false}) => {
    const { id, original_title, overview,  release_date, vote_average, vote_count, poster_path, backdrop_path, genres } = poster;

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isHovered, setIsHovered] = useState(true);

    const GoToMovie = () => {
        router.push(`/movie/${id}`);
      };
    
    const GoToGenre = (genre) => {
        router.push(`/genre/${genre.id}`);
      };
  
    const router = useRouter();
    
    const imagePath = backdrop_path ? backdrop_path : poster_path;
    const BASE_URL = 'https://image.tmdb.org/t/p';
    const POSTER_SIZE = 'original';
    const posterUrl=`${BASE_URL}/${POSTER_SIZE}/${imagePath}`;

    return (
        <Box width={'100%'}
             height='676px'  
             style={{ backgroundImage: `url(${posterUrl})`, backgroundSize: 'contain' }}  
             mb={'25px'} 
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
             display='flex'
             justifyContent='flex-end'
             flexWrap='wrap'
             bgcolor={colors.primary[900]}
             >
            <Box flexWrap='wrap' display='flex' width='25%' height='100%' bgcolor={colors.primary[900]} sx={{opacity: isHovered ? 0.75 : 0, transition: 'opacity 0.3s ease-in-out',}} >
                <FilmStars vote_average={vote_average} vote_count={vote_count} leftPosition='250px'/>
                <FilmDate release_date={release_date}/>
                <Typography variant='h3' padding='17px'>{original_title}</Typography>
                {genres && <Box padding='17px' display='flex' flexDirection={'column'}>
                    {genres.map((genre, i ) => i < 3 ? 
                    <Box key={genre + i} mt='5px' boxShadow='0px 2px 8px rgba(0, 0, 0, 0.15)' fontWeight={'bold'} onClick={() => GoToGenre(genre)}
                        sx={{
                            '&:hover' : {
                                cursor : 'pointer'
                            }
                        }}
                         >{genre.name}
                         
                    </Box> : null)}</Box>}
                <Typography padding='17px'>{overview.length > 300 ? overview.substring(0, 300) + "..." : overview}</Typography>
                {button && <Button onClick={GoToMovie}
                        sx={{
                            width: '90%',
                            height: '15%',
                            backgroundColor: (theme) => theme.palette.secondary.dark ,
                            padding: '10px 20px',
                            border: 'none',
                            color: 'white',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            margin: '4px 12px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.secondary.light ,
                                boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.25)',
                            },}} >
                                WATCH NOW
                            </Button>}
            </Box>
        

        </Box>
    )

}

export default MainPoster;