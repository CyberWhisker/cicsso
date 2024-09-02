import { alpha, Card } from '@mui/material'
import React from 'react'

function CustomCard({children}) {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        p: 2,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-10px)', // Moves the card up by 10 pixels on hover
          boxShadow: localStorage.getItem('theme') === 'light'
            ? `0 0 24px 16px ${alpha('#9CCCFC', 0.3)}` // Adjust shadow on hover
            : `0 0 36px 18px ${alpha('#033363', 0.3)}`, // Adjust shadow on hover
        },
        height: '100%',
      }}
      elevation={5}
    >
      {children}
    </Card>
  )
}

export default CustomCard