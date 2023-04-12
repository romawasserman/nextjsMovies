import { Box } from "@mui/material"
import Image from "next/image";




const About = ({movie}) => {
  console.log(movie)
    const {production_companies} = movie;
    const BASE_URL = 'https://image.tmdb.org/t/p';
    const POSTER_SIZE = 'w154';
    const posterUrl=`${BASE_URL}/${POSTER_SIZE}/`;
    return (
        <Box display={'flex'} justifyContent='space-evenly' mt='35px'>
          {production_companies.map((company) => {
            return company.logo_path ? (
              <Image key={company.id} width={100} height={50} alt={company.name} src={`${posterUrl}${company.logo_path}`} />
            ) : null;
          })}
        </Box>
      );
        }  

export default About
