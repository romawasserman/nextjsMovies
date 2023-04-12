import { Typography, Box, colors } from '@material-ui/core';
import StarRateOutlinedIcon from '@mui/icons-material/StarRateOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import React, {useState} from 'react';

const FilmStars = ({vote_average, vote_count, leftPosition}) => {
    const [showTooltipScore, setShowTooltipScore] = useState(false);
    const [showTooltipAmount, setShowTooltipAmount] = useState(false);
    const tooltipStyle = {
        position: 'absolute',
        backgroundColor: 'lightGray',
        color: 'black',
        padding: '5px',
        left: '100%', 
        top: '-50px' ,
        opacity : 0.8
      };

    return <Box 
            style={{ position: 'relative',
                 left: leftPosition, alignSelf:
                 'flex-start', }}>
                <Typography
                    onMouseEnter={() => setShowTooltipScore(true)} 
                    onMouseLeave={() => setShowTooltipScore(false)}
                    style={{display:'flex'}}>
                        {vote_average}  
                    <StarRateOutlinedIcon 
                        style={{ color: 'yellow',
                                 width: '15px',
                                 height: '15px' }}/>
                          {showTooltipScore && (
                    <span style={{...tooltipStyle}}>Average audience score</span>)} 
                </Typography>  
                <Typography style={{display:'flex'}}
                            onMouseEnter={() => setShowTooltipAmount(true)} 
                            onMouseLeave={() => setShowTooltipAmount(false)}
                >
                            {vote_count} 
                    <AccessibilityNewOutlinedIcon 
                        style={{width: '15px',
                                height : '15px'}}/>
                    {showTooltipAmount && (
                    <span style={{...tooltipStyle}}>Amount of votes</span>)} 
                </Typography>
            </Box>
}

export default FilmStars