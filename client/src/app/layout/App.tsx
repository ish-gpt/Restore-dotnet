import { useState } from 'react'
import './App.css'
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#eaeaea'
      }
    }
  })

  

  return (  
     <ThemeProvider theme={theme}>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode}></NavBar>
      <CssBaseline />
      <Box sx={{minHeight:'100vh', background: darkMode ? '#121212' : '#eaeaea'}}>
        <Container maxWidth='xl' sx={{mt:12}}>
          <Outlet></Outlet>
        </Container>
      </Box>
     </ThemeProvider>
  )
}

export default App
