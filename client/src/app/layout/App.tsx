import { useEffect, useState } from 'react'
import './App.css'
import Catalog from '../../features/catalog/Catalog';
import type { Product } from '../models/product';
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import NavBar from './NavBar';


function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#eaeaea'
      }
    }
  })

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then((data) =>{ setProducts(data);})
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (  
     <ThemeProvider theme={theme}>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode}></NavBar>
      <CssBaseline />
      <Box sx={{minHeight:'100vh', background: darkMode ? '#121212' : '#eaeaea'}}>
        <Container maxWidth='xl' sx={{mt:12}}>
          <Catalog products={products}></Catalog>
        </Container>
      </Box>
     </ThemeProvider>
  )
}

export default App
