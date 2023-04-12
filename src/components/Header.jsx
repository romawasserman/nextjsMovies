import { Box, Button, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { tokens } from "./theme";

function Header({ title, subtitle, newFilm=false }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const goHome = () => {
        router.push(`/`);
      };
    

    const router = useRouter();

    return (
        <Box textAlign='center' bgcolor={colors.primary[900]} padding='25px' >
            <Button onClick={goHome}
                        sx={{
                            position: 'absolute',
                            top: '25px',
                            left: '350px',
                            width: '7%',
                            minHeight: '5%',
                            backgroundColor: (theme) => colors.greenAccent[500] ,
                            padding: '10px 20px',
                            border: 'none',
                            color: 'white',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            margin: '4px 12px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                backgroundColor: (theme) => theme.palette.primary.dark ,
                                boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.25)',
                            },}} >
                                {newFilm ? 'New Film' : 'Go Back'}
                            </Button>
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight='bold'
                sx= {{m: '0 0 5px 0'}}>
                    {title}
                </Typography>
                <Typography variant='h5' color={colors.greenAccent[300]}>
                    {subtitle}
                </Typography>
        </Box>
    );
  }


export default Header;