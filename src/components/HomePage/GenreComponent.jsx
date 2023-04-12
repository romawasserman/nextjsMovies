import { Typography, Box } from "@mui/material"
import { useRouter } from "next/router";


const GenreComponent = ({genre}) => {
    const router = useRouter();
    const GoToGenre = () => {
      router.push(`/genre/${genre.id}`);
    };

    return (
        <Box width='20%' display='flex' flexWrap='wrap' onClick={GoToGenre}
            sx={{
                '&:hover': {
                    cursor: 'pointer',
                }
            }}>
            <Typography variant="h5" key={genre.id}>{genre.name}
            </Typography>
        </Box>
    )
}

export default GenreComponent;