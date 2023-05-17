'use client'
import { Button, Stack , Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const redirectrazorpay = () => {
  const router = useRouter()
  const data = router.query
  const id = data.order_id
  const goBack = () =>{
    url = '/'
    window.location = url;
    }
  return (
    <div>
        <Stack sx={{
          margin:'20% 40%'
        }} display='flex' flexDirection='row' alignItems='center'>
        <Stack direction='column'  spacing={4}>
        <Typography variant='h5'>your payment is successfuly done</Typography>
        <Typography>your order id is:{id}</Typography>
        <Button color='secondary' onClick={goBack}>GO back</Button>
        </Stack>
        </Stack>
    </div>
  )
}

export default redirectrazorpay