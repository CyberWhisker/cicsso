import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem, Stack } from '@mui/material';
import Navlist from './Navlist';
import ToggleColorMode from './ToggleColorMode';
import ToggleAuth from './ToggleAuth';

export default function AppDrawer({toggleColorMode, themeMode}) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <Navlist/>
        </Box>
    );

    return (
        <Box>
            <MenuItem onClick={toggleDrawer(true)}>
                <MenuIcon/>
            </MenuItem>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                <Box sx={{display: 'flex', justifyContent: 'right', p: 2}}>
                    <ToggleColorMode toggleColorMode={toggleColorMode} themeMode={themeMode}/>
                </Box>
                <Divider/>
                {DrawerList}
                <Divider/>
                <Stack gap={1} p={2}>
                    <ToggleAuth/>
                </Stack>
            </Drawer>
        </Box>
    )
}