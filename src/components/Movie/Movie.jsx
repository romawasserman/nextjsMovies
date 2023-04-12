import About from '@/components/Movie/About';
import Header from '@/components/Header';
import MainPoster from '@/components/MainPoster';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import Credits from './Credits';

const  MovieComponent = ({ movie, credits }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Box>
    <Header title="Everything about cinema"
            subtitle={movie.original_title}/>

      <MainPoster poster={movie} />
      <Credits credits={credits}/>
      <About movie={movie}/>
    </Box>
  )
}

export default MovieComponent