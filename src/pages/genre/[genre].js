
import Header from '@/components/Header';
import GenresComponent from '@/components/HomePage/GenresComponent';
import { useEffect, useState } from 'react';
import HomePage from '../../components/HomePage/HomePage';

export default function IndexPage({ movieList, genreArr, url, companies }) {
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
    const genreRes = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US')
    const genres = await genreRes.json();
    const paths = genres.genres.map((genre) => ({
      params: { genre: genre.name.toString() },
    }));
    return { paths, fallback: 'blocking' };
  }
    

export async function getStaticProps({params}) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=420fdbd6b9f917dd931af1d1497ac9b3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${params.genre}&with_watch_monetization_types=flatrate`
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
         companies : companiesList,
        }, 
    };
}
