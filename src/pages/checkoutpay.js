import { Link , Button,Autocomplete, Stack, TextField, Typography,  Box, Grid , Breadcrumbs, Paper  } from '@mui/material'
import {useGetproductQuery} from '../../state/redux/findproducts'
import LoadingBar from 'react-top-loading-bar'
import React, { useState , useEffect } from 'react'
import Script from 'next/script'
import axios from 'axios'
import { useSelector } from 'react-redux'




  const initialState = {
   fname:'',
  lname:'',
  street:'',
  town:'',
  pin:'',
  phone:'',
  email:'',
  state:null
  }
  
  const states = ['Gujarat','Rajasthan', 'Hariyana','Maharastra' ]
const checkoutpay = () => {
  const [amounts , setAmounts] = useState(0)
  const [progress, setProgress] = useState(0)
 
  const [detail , setDetail] = useState(initialState)
  const {isFetching } = useGetproductQuery()
  const {cart} = useSelector(state=>state.add)


  const handleChange = (e) =>{
    const name = e.target.name
    const value = e.target.value
    setDetail({...detail , [name]:value})
  }
  
  console.log(detail)
  useEffect(()=>{
   
    setAmounts(JSON.parse(localStorage.getItem('subtotal')))
    setProgress(100)
  },[])
  const handlePayment = async() => {

   const {email , fname , phone} = detail
   
    let amount = amounts * 100

    const { data: {order}} = await axios.post('api/paymentcheckout',{amount   })
    

    var options = {
      key: process.env.RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: '',
      description: " Transaction",
      image: "/myLogo.jpeg",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `/api/callback`,
    prefill: {
        name: fname,
        email:email,
        contact: phone
    },
    notes: {
        "address": "Razorpay Corporate Office"
    },
    theme: {
        "color": "#3399cc"
    }
  };
  var rzp1 = new  window.Razorpay(options);
    rzp1.open();

  }
  if(isFetching){
    return <LoadingBar className='loadingbar' height={63}  color='#FFFFFF'  progress={progress} waitingTime={800} onLoaderFinished={() => setProgress(0)}/>
    }
  return (
    <>
    
   
   <Script src="https://checkout.razorpay.com/v1/checkout.js" />
   <div className='checkout_main'>
  
     <Box display='flex' justifyContent='start' mb={2} mt={15}>
            <Breadcrumbs area-label='breadcrumb'>
                <Link underline="hover" href="/">Home</Link>
            
               
                <Typography  color='text.primary' >cart</Typography> 
            </Breadcrumbs>

           </Box>
      
     
 
    <hr />
    <div className='checkout_billing'>BILLING & SHIPPING</div>
    <div className='checkout_stack'>
    <Stack spacing={4}  sx={{ }} >
      <Stack direction='row'  spacing={2}>
        <TextField onChange={handleChange}  name='fname' value={detail.fname}  style={{width:'350px'}}   size='small' label='First Name' color="secondary"variant='outlined' />
        <TextField onChange={handleChange} name='lname' value={detail.lname}  style={{width:'350px'}}   size='small' label='Last Name' color="secondary"variant='outlined' />

      </Stack>
      <Typography>Country / india</Typography>
      <Stack direction='column'  spacing={4}>
        <TextField onChange={handleChange} name='street' value={detail.street}  fullWidth  size='small' label='Street address' color="secondary"variant='outlined' />
        <TextField onChange={handleChange} name='town' value={detail.town}  fullWidth   size='small' label='Town / City' color="secondary"variant='outlined' />
        <Autocomplete options={states}
        name = 'state' 
        value={detail.state}
        color='secondary'
        onChange={(e , i)=>setDetail({...detail , state:i})}
        renderInput = {(params)=><TextField {...params}    label=' State'  />}    
        />
        <TextField onChange={handleChange} name='pin' value={detail.pin}  fullWidth   size='small' label='Pin Code' color="secondary"variant='outlined' />
        <TextField onChange={handleChange}  name='phone' value={detail.phone} fullWidth   size='small' label='Phone Number' color="secondary"variant='outlined' />
        <TextField onChange={handleChange} name='email' value={detail.email}  fullWidth   size='small' label='Email' color="secondary"variant='outlined' />

       
      </Stack>
    </Stack>
    
        <Paper sx={{margin:'20px 0'}}>
        <Typography variant='h6'>your order</Typography>
       <Grid container>
        <Grid margin='20px' item xs={9}>
          <Box>product</Box>
        </Grid>
        <Grid margin='20px' item xs={1}>
          <Box>subTotal</Box>
        </Grid>
        <Grid margin='20px' item xs={9}>
          <Box>{cart[0].name} + {cart[0].select} * {cart[0].qty}</Box>
        </Grid>
        <Grid margin='20px' item xs={1}>
          <Box>₹{cart[0].amount}</Box>
        </Grid>
        <Grid margin='20px' item xs={9}>
          <Box>shiping</Box>
        </Grid>
        <Grid margin='20px' item xs={1}>
          <Box>₹30</Box>
        </Grid>
        </Grid>
        </Paper>
     
    
  <Stack sx={{marginTop:'20px'}} spacing={4}>

    <Button onClick={()=>handlePayment()}  variant='contained' color='primary' >Place Order</Button>
  </Stack>

    </div>
    </div>
    </>
  )
}

export default checkoutpay
