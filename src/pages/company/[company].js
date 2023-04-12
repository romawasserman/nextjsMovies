

import Header from '@/components/Header';
import HomePage from '../../components/HomePage/HomePage';

export default function IndexPage({ movieList, genreArr, url, companies }) {
  console.log(movieList)
  return (
  <>
        <Header
        title="Everything about cinema"
        subtitle="Watch anything about your favorite movies and TV-shows!"
        />
    <HomePage movieList={movieList} genreArr={genreArr} companies={companies} url={url}/> 
  </>)
}

export async function getStaticPaths() {
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US&page=1'
    const movieRes = await fetch(url);
    const movieList = await movieRes.json();
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
    const paths = companiesList.map((company) => ({
      params: { company: company.id.toString()},
    }));
    return { paths, fallback: 'blocking' };
  }
    

export async function getStaticProps({params}) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_companies=${params.company}&with_watch_monetization_types=flatrate`
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
         url : url,
         companies: companiesList,
        }, 
    };
}
