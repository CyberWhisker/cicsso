import { Box, Container, alpha } from '@mui/material'
import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CustomToast, NavTopBar } from '../components';

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

function MasterLanding({children}) {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark"); // Default to dark mode
  const toggleColorMode = () => {
    const newThemeMode = themeMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem("theme", newThemeMode)
    setThemeMode(newThemeMode);
  };
  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <Box
        sx={(theme) => ({
            backgroundImage:
            theme.palette.mode === 'light'
                ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
            backgroundSize: '100% 20%',
            backgroundRepeat: 'no-repeat',
        })}
        >
          <NavTopBar toggleColorMode={toggleColorMode} themeMode={themeMode}/>
          <Container>
            {children}
          </Container>
        </Box>
        <CustomToast/>
    </ThemeProvider>
  )
}

export default MasterLanding