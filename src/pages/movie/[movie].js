import MovieComponent from '@/components/Movie/Movie';
import { useRouter } from 'next/router';

const  Movie = ({ movie, credits }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <MovieComponent movie={movie} credits={credits}/>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US&page=1');
  const movies = await res.json();
  const paths = movies.results.map((movie) => ({
    params: { movie: movie.id.toString() },
  }));
  return { paths, fallback: 'blocking' };
}



export const getStaticProps = async ({ params }) => {
  const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${params.movie}?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US`);
  const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${params.movie}/credits?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US`)
  const movie = await movieRes.json();
  const credits = await creditsRes.json();
  return { props: { movie, credits }, revalidate: 72000 };
}

export default Movie

