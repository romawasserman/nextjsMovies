import { useState, useEffect, useRef } from 'react';
import Item from '../Item.jsx';
import { Grid } from '@material-ui/core';
import MainPoster from '../MainPoster';
import StudiesComponents from './StudiesComponents.jsx';
import GenresComponent from './GenresComponent.jsx';
import { Box } from '@mui/material';

export default function HomePage({ movieList, url, companies, genreArr }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mainNumber, setMainNumber] = useState();
  const pageNumberRef = useRef(2);
  const nextMoviesRef = useRef([]);

  console.log('movielist:', popularMovies)
  console.log('nextmovies', nextMoviesRef.current)
  useEffect(() => {
    setMainNumber(Math.floor(Math.random() * 20))
  }, [])

  useEffect(() => {
    if (movieList) {
      setPopularMovies(movieList);
    }
  }, [movieList]);


  async function fetchMovies(pageNumber) {
    try {
      setIsLoading(true);
      const res = await fetch(
        url.replace(/page=\d+/, `page=${pageNumber}`)
      );
      const { results } = await res.json();
      //console.log(results);
      nextMoviesRef.current = results;
      //console.log('nextMovies', nextMoviesRef.current);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleScroll() {
    if (
      window.scrollY + window.innerHeight + 800 >= document.body.scrollHeight &&
      !isLoading
    ) {
      const nextPageNumber = pageNumberRef.current + 1;
      fetchMovies(nextPageNumber);
      pageNumberRef.current = nextPageNumber;
      setPopularMovies((prev) => [...prev, ...nextMoviesRef.current]);
      //console.log('PopularMovies:', popularMovies);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (popularMovies.length === 0) {
    return <div>Loading...</div>;
  }

  const uniqueMovies = popularMovies.filter((movie, index, self) =>
  index === self.findIndex((m) => m.id === movie.id)
  );


  return (
    <>
      <Box display='flex'>
        <GenresComponent genres={genreArr}/>
        <StudiesComponents studies={companies}/>
      </Box>
      {popularMovies.length > 0 ? (
        <MainPoster poster={popularMovies[mainNumber]} button={true}/>
      ) : (
        <div>Loading Poster</div>
      )}
      {popularMovies.length > 0 ? (
        <Grid container spacing={6} margin="0">
          {uniqueMovies.map((movie, i) =>
            i !== mainNumber ? <Item key={movie.id} item={movie} /> : null
          )}
        </Grid>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
