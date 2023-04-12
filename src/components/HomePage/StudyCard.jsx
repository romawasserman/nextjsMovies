import { Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

const StudyCard = ({study}) => {
  const BASE_URL = 'https://image.tmdb.org/t/p';
  const POSTER_SIZE = 'w154';
  const posterUrl = `${BASE_URL}/${POSTER_SIZE}`;
  const router = useRouter();
  const goToStudy = () => {
      router.push(`/company/${study.id}`);
  }

  return (
    <Box paddingLeft='65px' onClick={goToStudy}> 
        <Image
          src={`${posterUrl}${study.logo_path}`}
          width={192}
          height={135}
          alt={study.name}
          style={{cursor: 'pointer'}}
        />
    </Box>
  );
};

export default StudyCard;
