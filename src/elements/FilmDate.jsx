import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Typography } from '@material-ui/core';



const FilmDate = ({release_date}) => {


    return <Typography  style={{ position: 'relative', left: '-50px', alignSelf: 'flex-start' }} > <CalendarMonthOutlinedIcon style={{width: '15px', height: '15px', marginLeft : '15px'}} />{release_date}</Typography>
}

export default FilmDate