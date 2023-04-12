
import React from 'react';
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import FilmDate from '../elements/FilmDate';
import FilmStars from '../elements/FilmStars';
import Image from 'next/image';
import { useRouter } from 'next/router';



const Item = ({item}) => {
    const { id, original_title, overview,  release_date, vote_average, vote_count, poster_path, backdrop_path, genres } = item;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    /// this should be moved to .env file
    const BASE_URL = 'https://image.tmdb.org/t/p';
    const POSTER_SIZE = 'w500';
    const posterUrl=`${BASE_URL}/${POSTER_SIZE}/${poster_path}`;

    const router = useRouter();
    const GoToMovie = () => {
      router.push(`/movie/${id}`);
    };
  

      

    return (
      <Grid key={id} item xs={4}  borderRadius='25px' display='flex' flexDirection='column'>
          <Typography variant='h4' fontWeight='bold' color={colors.grey[300]}>{original_title}</Typography>
          <Typography  color={colors.grey[300]} width='90%'>{overview.length > 100 ? overview.substring(0, 100) + "..." : overview}</Typography>
          <Box display='flex' width='-webkit-fill-available' marginTop='auto' color={colors.primary[200]}>
            <Image src={posterUrl} alt='poster' width={358} height={552} style={{alignSelf: 'end', cursor : 'pointer'}} onClick={GoToMovie} />
            <FilmDate release_date={release_date}/>
            <FilmStars vote_average={vote_average} vote_count={vote_count} leftPosition="-141px"/>
            
          </Box>
      </Grid>
      );
    }
      


export default Item