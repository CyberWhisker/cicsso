// Layout.js
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CustomToast, NavSideBar, NavTopBar } from '../components';
import { Box, Container, alpha } from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15, // Adjust the radius value as needed
        },
      },
    },
  },
});

const Master = ({ children }) => {
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
          width: '100%',
          backgroundImage:
            theme.palette.mode === 'light'
              ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
              : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
          backgroundSize: '100% 20%',
          backgroundRepeat: 'no-repeat',
        })}
      >
        <NavSideBar mode={themeMode} toggleColorMode={toggleColorMode} >
          <NavTopBar toggleColorMode={toggleColorMode} themeMode={themeMode}/>
          <Container sx={{ mt: 2 }}>
              {children}
          </Container>
        </NavSideBar>
      </Box>
      <CustomToast/>
    </ThemeProvider>
  );
};

export default Master;