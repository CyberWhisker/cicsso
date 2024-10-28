import { Alert, Avatar, Badge, Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Check, Notifications, Pending, PersonAdd, Warning } from '@mui/icons-material'
import { fetchTransactionByUserId, fetchTransactions } from '../api/TransactionApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';


function Notification () {
    const {auth} = useAuthContext();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [dataCount, setDataCount] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = (collectionId) => {
      setAnchorEl(null);
    };

    const handleClickNotification = (collectionId) => {
        if (auth.user.role == 'user') {
            navigate('/transaction')
        } else {
            navigate(`/transaction/${collectionId}`)
        }

    }
    
    const handleGetTransaction = async () => {
        let count = 0;
        if (auth.user.role == 'user') {
            const {data, error} = await fetchTransactionByUserId(auth.user._id);
            if (error) {
                toast.error(error)
            } else {
                setData(data)
                data.map((item) => {
                    if (item.status == 'decline') {
                        count ++
                    }
                })
                setDataCount(count)
            }
        } else {
            const {data, error} = await fetchTransactions();
            if (error) {
                toast.error(error)
            } else {
                setData(data)
                data.map((item) => {
                    if (item.status == 'pending') {
                        count ++
                    }
                })
                setDataCount(count)
            }
        }
    }

    useEffect(() => {
        handleGetTransaction();
    }, [])

    return (
      <>
        <Button
          onClick={handleClick}
          size='small'
          sx={{ minWidth: '32px', height: '32px', p: '4px', color: (t) => (t.palette.themeMode === 'light' ? 'black' : '')}}
        >
          <Badge badgeContent={dataCount} color="secondary">
            <Notifications/>
          </Badge>
        </Button>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {data.length == 0 && (
                <MenuItem>
                    <ListItemText>
                        No Record Found
                    </ListItemText>
                </MenuItem>
            )}
            {data.map((item, index) => (
                <MenuItem key={index} onClick={() => handleClickNotification(item.collectionId._id)}>
                    <ListItemIcon>
                        {item.status == "pending" && (
                            <Pending /> 
                        )}
                        {item.status == "confirm" && (
                            <Check /> 
                        )}
                        {item.status == "decline" && (
                            <Warning /> 
                        )}
                    </ListItemIcon>
                    <ListItemText>
                        <Stack>
                            <Typography variant='h6'>
                                {item.collectionId.collectionName}
                            </Typography>
                            <Typography variant='caption'>
                                {item.userId.name}
                            </Typography>
                        </Stack>
                    </ListItemText>
                </MenuItem>
            ))}
        </Menu>
      </>
    )
}

export default Notification