import { AppBar, Toolbar, Typography } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

type Props = {
    darkMode: boolean,
    setDarkMode: (value: boolean) => void
}

export default function NavBar({darkMode, setDarkMode}:Props) {
  return (
    <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h6" marginX={2}>
                RE-STORE
            </Typography>
                {
                    darkMode ? <LightModeIcon onClick={() => setDarkMode(false)} sx={{cursor:'pointer', color:'yellow'}}></LightModeIcon> : <DarkModeIcon onClick={() => setDarkMode(true)} sx={{cursor:'pointer'}}></DarkModeIcon>
                }
        </Toolbar>
    </AppBar>
  )
}