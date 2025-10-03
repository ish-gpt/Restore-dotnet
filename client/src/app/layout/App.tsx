import './App.css'
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import NavBar from './NavBar';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useAppSelector } from '../store/store';


function App() {
  const { mode } = useAppSelector(state => state.mode);
  const theme = createTheme({
    palette: {
      mode: mode==='dark' ? 'dark' : 'light',
      background: {
        default: mode === 'dark' ? '#121212' : '#eaeaea'
      }
    }
  })

  return (  
     <ThemeProvider theme={theme}>
      <ScrollRestoration></ScrollRestoration>
      <NavBar></NavBar>
      <CssBaseline />
      <Box sx={{minHeight:'100vh', background: mode==='dark' ? '#121212' : '#eaeaea'}}>
        <Container maxWidth='xl' sx={{mt:12}}>
          <Outlet></Outlet>
        </Container>
      </Box>
     </ThemeProvider>
  )
}

export default App
