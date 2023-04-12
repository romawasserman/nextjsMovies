import { Box, Typography } from "@mui/material"
import GenreComponent from "./GenreComponent";
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";


const GenresComponent = ({genres}) => {
    const genreList = genres.genres;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', width: '70%' }} flexDirection='column'>
            <Box sx={{ flexGrow: 1 }} >
                <Typography variant="h5">Search by genres</Typography >
            </Box>
            <Box display='flex' flexWrap='wrap' borderRight={`4px dashed ${colors.greenAccent[600]}`}>
            {genreList && (genreList.map((genre) => {
            return <GenreComponent genre={genre} key={genre.id}/>
                }))}
            </Box>
        </Box>
    )
}

export default GenresComponent;