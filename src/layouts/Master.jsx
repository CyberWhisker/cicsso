import { Box, Container, alpha } from '@mui/material'
import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TopBar from '../components/TopBar'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Master({children}) {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('mode') ? localStorage.getItem('mode') : "dark"); // Default to dark mode
  const toggleColorMode = () => {
    const newThemeMode = themeMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem("mode", newThemeMode)
    setThemeMode(newThemeMode);
  };
  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <Box
        sx={(theme) => ({
            width: '100%',
            backgroundImage:
            theme.palette.mode === 'light'
                ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
            backgroundSize: '100% 20%',
            backgroundRepeat: 'no-repeat',
        })}
        >
        <TopBar toggleColorMode={toggleColorMode} themeMode={themeMode}/>
          <Container>
            {children}
          </Container>
        </Box>
    </ThemeProvider>
  )
}

export default Master