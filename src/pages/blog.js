import { Box, Container , FormControl, InputLabel, MenuItem, Select, Typography  } from '@mui/material'
import React, { useState , useEffect } from 'react'
import { useGlobalContext } from '../../state/context'
import styles from '../styles/Home.module.css'
import LoadingBar from 'react-top-loading-bar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../state/redux/reducer'
import mongoose from 'mongoose'
import Product from '../../schema/product'

const blog = ({ myItems }) => {
  const [getData , setGetData] = useState(myItems.apple)
  const [getSamsung , setGetSamsung] = useState(myItems.samsung)
const [progress, setProgress] = useState(0)


const {isLoading} = useSelector(state=>state.carts)
const dispatch = useDispatch()
    const apple =   getData?.brandmodel.map(e=>e)
    const samsung =   getSamsung?.brandmodel.map(e=>e)
   
   const {data} = useGlobalContext()
 useEffect(()=>{
  dispatch(fetchData())
  setProgress(100)
 },[])


   if(isLoading){
    return <LoadingBar className='loadingbar' height={63}  color='#FFFFFF'  progress={progress} waitingTime={800} onLoaderFinished={() => setProgress(0)}/>

   }
  
    return (   
      <>
     <main >

<div className={styles.bg}>
</div>
<div className={`${styles.main} heading`}>
  <Container>

    <div  className='heading' >{data.heading}</div>
    <Typography variant='h4'>{data.title}</Typography>
  </Container>
</div>
</main>

        <hr />
      <hr className = 'hr'/>
      <hr className = 'hrs'/>

      <div className = 'mobile' >
        <Typography className='typo' variant='h4' > Choose Your Mobile Cover </Typography>
        <Box className = 'box'>Select your model</Box>
        {/* <div className='select'>
        <details>
  <summary className='summary'>{getData.brand}</summary>
  { apple?.map(e=> <p className='p' key={e} >{e}</p> ) }


</details>
<details>
  
  <summary className='summary'>{getSamsung.brand}</summary>
  { samsung?.map(e=> <p className='p' key={e} >{e}</p> ) }

</details>
</div> */}
    
      <FormControl sx={{color:'black', mx: 110, minWidth: 200 , my:1}}>
      <InputLabel id="demo-simple-select-autowidth-label">Apple</InputLabel>
      <Select
    labelId="demo-simple-select-autowidth-label"
    id="demo-simple-select-autowidth"
    value={getData.brand}
    label="Apple"
    color='primary'
    // onChange={handleChange}
  >
   { apple?.map((e,i) =>  <MenuItem  key={i} value={e}>{e}</MenuItem>)}
     </Select>
    </FormControl>
    <FormControl sx={{color:'black', mx: 110, minWidth: 200 , my:1}}>
      <InputLabel id="demo1-simple-select-autowidth-label">Samsung</InputLabel>
      <Select
    labelId="demo1-simple-select-autowidth-label"
    id="demo1-simple-select-autowidth"
    value={getSamsung.brand}
    label="Samsung"
    color='primary'
    // onChange={handleChange}
  >
   { samsung?.map((e,i) =>  <MenuItem  key={i} value={e}>{e}</MenuItem>)}
     </Select>
    </FormControl>
    </div>
      </>
  )
}
export async function getServerSideProps(contaxt){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }  let productdata = await Product.find()
    
  let myItems = {}
  for(let item of  productdata){
   
      if(item.brand in myItems){
        if(!myItems[item.brand].brandmodel.includes(item.brandmodel) && item.availableQty > 0 ){
          myItems[item.brand].brandmodel.push(item.brandmodel)
        }
        if(!myItems[item.brand].image.includes(item.image) && item.availableQty > 0 ){
          myItems[item.brand].image.push(item.image)
        }
      }
      else{
          myItems[item.brand] = JSON.parse(JSON.stringify(item))
          if(item.availableQty > 0 ){
              myItems[item.brand].brandmodel = [item.brandmodel]
              myItems[item.brand].image = [item.image]
             
          }
      }
  }
  

 return{
  props:{myItems:JSON.parse(JSON.stringify(myItems)) }
 }   
}

export default blog
