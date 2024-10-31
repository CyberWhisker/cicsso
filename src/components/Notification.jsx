import { Badge, Button, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Check, Message, Notifications, Pending, Warning } from '@mui/icons-material'
import { fetchTransactionByUserId, fetchTransactions } from '../api/TransactionApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { fetchNotification, fetchNotificationByUserId, updateNotification } from '../api/NotificationApi';


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

    const handleUpdateNotificationUser = async (dataNotif) => {
        const newData = {
            _id: dataNotif._id,
            userStatus: false,
        }
        const {notifData: data, error} = await updateNotification(newData)
        if (error) {
            toast.error(error)
        }
    }

    const handleUpdateNotificationAdmin = async (dataNotif) => {
        const newData = {
            _id: dataNotif._id,
            adminStatus: false,
        }
        const {notifData: data, error} = await updateNotification(newData)
        if (error) {
            toast.error(error)
        }
    }

    const handleClickNotification = async (dataNotif) => {

        if (auth.user.role == 'user') {
            await handleUpdateNotificationUser(dataNotif)
            navigate('/transaction')
        } else {
            await handleUpdateNotificationAdmin(dataNotif)
            navigate(`/transaction/${dataNotif._id}`)
        }

    }

    const handleGetNotification = async () => {
        if (auth.user.role == 'user') {
            const {data, error} = await fetchNotificationByUserId(auth.user._id);
            if (error) {
                toast.error(error)
            } else {
                setData(data)

                setDataCount(data.filter(item => item.userStatus).length)
            }
        } else {
            const {data, error} = await fetchNotification();
            if (error) {
                toast.error(error)
            } else {
                setData(data)
                setDataCount(data.filter(item => item.adminStatus).length)
            }
        }
    }

    useEffect(() => {
        handleGetNotification();
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
            {data.map((item, index) => {
                let isActive;
                if (auth.user.role == 'user') {
                    isActive = item.userStatus
                } else {
                    isActive = item.adminStatus
                }
                return (
                    <MenuItem key={index} onClick={() => handleClickNotification(item)} selected={isActive}>
                        <ListItemIcon>
                            <Message/>
                        </ListItemIcon>
                        <ListItemText>
                            <Stack>
                                <Typography variant='h6'>
                                    {item.transactionId?.collectionId?.collectionName || 'Removed'}
                                </Typography>
                                <Typography variant='caption'>
                                    {item.message}
                                </Typography>
                            </Stack>
                        </ListItemText>
                    </MenuItem>
                )
            })}
        </Menu>
      </>
    )
}

export default Notification