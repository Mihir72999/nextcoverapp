import { Box, Container , Typography  } from '@mui/material'
import React, { useState , useEffect } from 'react'
import { useGlobalContext } from '../../state/context'
import styles from '../styles/Home.module.css'
import LoadingBar from 'react-top-loading-bar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../state/redux/reducer'

const blog = ({moredata}) => {
  const [getData , setGetData] = useState(moredata.myItems.apple)
  const [getSamsung , setGetSamsung] = useState(moredata.myItems.samsung)
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
        <div className='select'>
        <details>
  <summary className='summary'>{getData.brand}</summary>
  { apple?.map(e=> <p className='p' key={e} >{e}</p> ) }


</details>
<details>
  
  <summary className='summary'>{getSamsung.brand}</summary>
  { samsung?.map(e=> <p className='p' key={e} >{e}</p> ) }

</details>
</div>
    
      </div>
       
    
      </>
  )
}
export async function getServerSideProps(contaxt){
 const data = await fetch(`${process.env.PORT}/api/addproduct`)
 const moredata = await data.json()
 return{
  props:{moredata:moredata}
 }   
}

export default blog