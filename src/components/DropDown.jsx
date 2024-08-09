import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import { Box } from '@mui/material';

function DropDown({ children }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <MoreVertIcon onClick={handleClick} />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                <Box sx={{ minWidth: 100 }}>
                    {React.Children.map(children, (child) =>
                        React.cloneElement(child, { onClick: () => { child.props.onClick(); handleClose(); } })
                    )}
                </Box>
            </Menu>
        </div>
    );
}

export default DropDown;
