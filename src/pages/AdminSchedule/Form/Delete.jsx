import React from 'react'
import { Card, Typography } from '@mui/material'

function Delete() {
  return (
    <Card>
      <Typography variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </Card>
  )
}

export default Delete