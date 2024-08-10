import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Popper, Paper, ClickAwayListener, useTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

function DropDown({ children }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <MoreVertIcon onClick={handleClick} sx={{ cursor: 'pointer' }} />
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom"
                onClose={handleClose}
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8],
                        },
                    },
                ]}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <Paper
                        sx={{
                            backgroundColor: theme.palette.mode === 'dark' ? blueGrey[900] : '#fff',
                            color: theme.palette.mode === 'dark' ? '#fff' : blueGrey[900],
                            boxShadow: theme.shadows[3],  // Elevation effect for better visibility
                            borderRadius: 1,  // Slightly round the corners
                        }}
                    >
                        <Box sx={{ minWidth: 120 }}>
                            {React.Children.map(children, (child) =>
                                React.cloneElement(child, {
                                    onClick: () => {
                                        if (child.props.onClick) {
                                            child.props.onClick();
                                        }
                                        handleClose();
                                    },
                                })
                            )}
                        </Box>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </div>
    );
}

export default DropDown;
