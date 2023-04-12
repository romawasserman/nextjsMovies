import PeopleComponent from '@/components/People/PeopleComponent';
import { useRouter } from 'next/router';

const  People = ({ people, movieCredits }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <PeopleComponent person={people} movieCredits={movieCredits}/>
  )
}


export async function getStaticPaths() {
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US&page=1');
    const movies = await res.json();
    
    const paths = [];
    
    for (const movie of movies.results) {
      const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US`);
      const credits = await creditsRes.json();
      
      const castAndCrewIds = credits.cast.map((person) => person.id).concat(credits.crew.map((person) => person.id));
      
      for (const id of castAndCrewIds) {
        paths.push({ params: { people: id.toString() } });
      }
    }
    console.log(paths)
    return { paths, fallback: 'blocking' };
  }
  
  
  
  
  
  export const getStaticProps = async ({ params }) => {
    const peopleRes = await fetch(`https://api.themoviedb.org/3/person/${params.people}?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US`);
    const movieCreditsRes = await fetch(`https://api.themoviedb.org/3/person/${params.people}/movie_credits?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US`)
    const people = await peopleRes.json();
    const movieCredits = await movieCreditsRes.json();
    return { props: { people, movieCredits }, revalidate: 72000 };
  }
  
export default People