import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setMode } from "./modeSlice";
import { useFetchBasketQuery } from "../../features/basket/basketApi";


const navStyles = {
    color: 'inherit',
    cursor: 'pointer',
    '&:hover': { color: 'grey.500' },
    '&.active': { color: '#baecf9' },
    textDecoration: 'none'
}

export default function NavBar() {
    const {isLoading} = useAppSelector(state=>state.ui);
    const {mode} = useAppSelector(state=>state.mode);
    const dispatch = useAppDispatch();
    const {data: product} = useFetchBasketQuery();

    const itemsCount = product?.items.reduce((sum,curr)=>sum+=curr.quantity,0) || 0;

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
        <>
        <AppBar position="fixed">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" marginX={2} component={NavLink} to='/' sx={navStyles}>
                        RE-STORE
                    </Typography>
                    {
                        mode ===' light' ? <LightModeIcon onClick={()=>dispatch(setMode())} sx={{ cursor: 'pointer', color: 'yellow' }}></LightModeIcon> : <DarkModeIcon onClick={() => dispatch(setMode())} sx={{ cursor: 'pointer' }}></DarkModeIcon>
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
                    <IconButton component={Link} to='/basket' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={itemsCount} color='secondary'>
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
            {
            isLoading && <Box sx={{ width: '100%' }}>
                <LinearProgress color="secondary"></LinearProgress>
            </Box>
        }
        </AppBar>
        </>
    )
}