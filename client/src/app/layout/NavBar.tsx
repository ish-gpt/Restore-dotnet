import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";

type Props = {
    darkMode: boolean,
    setDarkMode: (value: boolean) => void
}

const navStyles = {
    color: 'inherit',
    cursor: 'pointer',
    '&:hover': { color: 'grey.500' },
    '&.active': { color: '#baecf9' },
    textDecoration: 'none'
}

export default function NavBar({ darkMode, setDarkMode }: Props) {
    const midLinks = [
        { title: 'catalog', path: '/catalog' },
        { title: 'about', path: '/about' },
        { title: 'contact', path: '/contact' }
    ];

    const rightLinks = [
        { title: 'login', path: '/login' },
        { title: 'register', path: '/register' }
    ]
    return (
        <AppBar position="fixed">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" marginX={2} component={NavLink} to='/' sx={navStyles}>
                        RE-STORE
                    </Typography>
                    {
                        darkMode ? <LightModeIcon onClick={() => setDarkMode(false)} sx={{ cursor: 'pointer', color: 'yellow' }}></LightModeIcon> : <DarkModeIcon onClick={() => setDarkMode(true)} sx={{ cursor: 'pointer' }}></DarkModeIcon>
                    }
                </Box>
                <List sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    {
                        midLinks.map(({ title, path }) => (
                            <ListItem component={NavLink} to={path} sx={navStyles}>
                                {title.toUpperCase()}
                            </ListItem>
                        ))
                    }
                </List>
                <Box  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton sx={{ color: 'inherit' }}>
                        <Badge badgeContent={4} color='secondary'>
                            <ShoppingCart ></ShoppingCart>
                        </Badge>    
                    </IconButton>
                    <List sx={{ display: 'flex', flexDirection: 'row' }}>
                        {
                            rightLinks.map(({ title, path }) => (
                                <ListItem component={NavLink} to={path} sx={navStyles}>
                                    {title.toUpperCase()}
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}