

import Header from '@/components/Header';
import GenresComponent from '@/components/HomePage/GenresComponent';
import HomePage from '../components/HomePage/HomePage';

export default function IndexPage({ movieList, genreArr, url, companies }) {
  return (
  <>
        <Header
        title="Everything about cinema"
        subtitle="Watch anything about your favorite movies and TV-shows!"
        newFilm={true}
        />
    <HomePage movieList={movieList} genreArr={genreArr} companies={companies} url={url}/> 
  </>)
}

export async function getStaticProps() {
  const url = 'https://api.themoviedb.org/3/movie/popular?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US&page=1'
  const movieRes = await fetch(url);
  const genreRes = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US')
  const movieList = await movieRes.json();
  const genreList = await genreRes.json();
  const companiesID = [];
  for (const movie of movieList.results) {
    const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US`);
    const credits = await creditsRes.json();
    credits.production_companies.map((company) => companiesID.push(company.id))
  }
  const companiesList = [];
  for (const comp of companiesID) {
    const companyRes = await fetch(`https://api.themoviedb.org/3/company/${comp}?api_key=420fdbd6b9f917dd931af1d1497ac9b3`) 
    const company = await companyRes.json();
    companiesList.push(company);
  }


  return { 
    props: {
         movieList : movieList.results, 
         genreArr : genreList,
         url: url,
         companies : companiesList,
        }, 
    };
}
