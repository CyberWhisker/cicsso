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
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 15,
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 15
      },
    },
  },
});

const MasterAuth = ({ children }) => {
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
          <Container>
              {children}
          </Container>
      </Box>
      <CustomToast/>
    </ThemeProvider>
  );
};

export default MasterAuth;