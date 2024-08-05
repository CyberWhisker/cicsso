import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

function ToggleColorMode({ themeMode, toggleColorMode }) {
  return (
    <Box sx={{ maxWidth: '32px' }}>
      <Button
        variant="contained"
        onClick={toggleColorMode}
        size="small"
        aria-label="button to toggle theme"
        sx={{ minWidth: '32px', height: '32px', p: '4px', color: (t) => (t.palette.themeMode === 'light' ? 'black' : '')}}
        
      >
        {themeMode === 'dark' ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small"/>
        )}
      </Button>
    </Box>
  );
}

ToggleColorMode.propTypes = {
  themeMode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;