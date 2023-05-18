
import { Button, makeStyles, Typography } from '@material-ui/core'
import { Add,Remove, ArrowDownward } from '@material-ui/icons'
import Link from 'next/link'
import { useState ,useEffect } from 'react'
import {useGetproductQuery} from '../../../state/redux/findproducts'
import LoadingBar from 'react-top-loading-bar'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../../state/redux/action'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Image from 'next/image'
import mongoose from 'mongoose'
import Product from '../../../schema/product'

const useStyle = makeStyles(()=>({
  App:{
    margin: '0 35%',
    borderRadius:'20px 20px 20px 20px',
    background: "#c6e2ff",
  
  },
 Button:{
  cursor:'pointer'
 }
  
}))


const product = ({moredata }) => {

  console.log(moredata)
const classes = useStyle()
  const {data , isFetching ,isError} = useGetproductQuery()
  const [qty , setQty] = useState(1)
  const [getbrand ,setGetbrand] = useState([])
const [progress, setProgress] = useState(0)
const [select , setSelect] = useState('')
console.log(select)
const dispatch = useDispatch()
const router = useRouter()
const {product} = router.query
 const sam = data && Object.keys(data).map(e=>data[e]['samsung'])
 const s = sam?.map(e=>e.brand)
  const app = data && Object.keys(data).map(e=>data[e]['apple'])
const a = app?.map(e=>e.brand)
const apples = data && data?.myItems?.apple
const samsungs = data && data?.myItems?.samsung


useEffect(()=>{
 
  setProgress(100)
  },[100])
   
if(isFetching){
 
  return <LoadingBar className='loadingbar' height={63}  color='#FFFFFF'  progress={progress} waitingTime={800} onLoaderFinished={() => setProgress(0)}/>
}
if(isError){
  return <div>you have to bad request check your internet connection</div>
}

console.log(product)
const {availableQty , image , name , price  , _id , brand} = moredata
const amount = qty * price
const handleClick = (e) =>{
  if(select === ''){
  toast.warn('please select brand and model')
  }
  else{
    dispatch(addProduct(e))
    
    toast("your item has been added in cart!")
  }
}
  return (
    <>
           <ToastContainer />
    <div className='final'>
       <div className='final-img' >
     
        <div className='product-img'>
          <Image height={600} width={400} className='productimg' src={moredata.image} alt={moredata.brandmodel}/></div>
      </div>
        <div className='font'>
          <div className='d-none' ><Link  href='/'>HOME</Link> / {moredata.name}</div>
          <div><Typography className='text-m mt-10' variant='h5'>{moredata.name}</Typography></div>
       <div> <Typography className='' variant='h6'><del className='mx-10'>₹{moredata.price * 2 - 40}</del>₹{moredata.price}</Typography></div>
          <div className='free-delivery '><Typography variant='h5'>Order above upto ₹ 300.00 and get <span className='span'> FREE DELIVERY</span>  </Typography>
          <p>just add items worth ₹300 or more at across all over the store in cart you will get diivery free</p>
          </div>
          <div className='d-flex gap mt-5'><div className='h-20 '><Image height={12} width={1} className='h-10' src='https://zapvi.in/wp-content/uploads/2021/04/feather.png' alt=''/></div><p>Thin & Soft Silicone Rubber case</p></div>
          <div className='d-flex gap '><div className='h-20 '><Image height={12} width={1} className='h-10' src='https://zapvi.in/wp-content/uploads/2021/04/mobile.png' alt=''/></div><p>Full Camera Protective Case</p></div>
          <div className='d-flex gap '><div className='h-20 '><Image height={12} width={1} className='h-10' src='https://zapvi.in/wp-content/uploads/2022/03/rating-1.png' alt=''/></div><p>Half edge Smooth Printing on Side</p></div>
          <div className='d-flex gap '><div className='h-20 '><Image height={12} width={1} className='h-10' src='https://zapvi.in/wp-content/uploads/2021/04/photography.png' alt=''/></div><p>Photo-realistic print quality</p></div>
          <div className='d-flex gap '><div className='h-20 '><Image height={12} width={1} className='h-10' src='https://zapvi.in/wp-content/uploads/2021/04/return-box.png' alt=''/></div><p>Hassle-free replacements</p></div>
          <div className='d-flex gap '><div className='h-20 '><Image height={12} width={1} className='h-10' src='https://zapvi.in/wp-content/uploads/2021/04/shipping-and-delivery.png' alt=''/></div><p>Delivery in 5-7 working days</p></div>
       
      <div className='section'>
          <select onChange={e=>setGetbrand(e.target.value)} >
      <option required >select brand</option>

        <option  value={a} >{a}</option>
        <option  value = {s} >{s}</option>

        </select>
      <ArrowDownward className='down'/>
        
        <select onChange={e=>setSelect(e.target.value)} >
          <option required >select brand model</option>
        

          {getbrand.includes(a) && apples?.brandmodel?.map(e=> <option value={e.brandmodel}  key={e} >{e}</option> ) }
       
       {getbrand.includes(s) && samsungs?.brandmodel?.map(e=> <option  key={e} value={e.brandmodel}>{e}</option> ) }
      
      
      </select>
      <ArrowDownward className='down'/>

      </div>
      <div className="cart_add"><p>availableQty:<strong>{moredata.availableQty}</strong></p><div className='cart_add_Qty'><Remove className={classes.Button}   onClick={()=>setQty(qty > 1 ? qty - 1 : qty)}/><span>{qty}</span><Add className={classes.Button} onClick={()=>setQty(moredata.availableQty > qty ? qty + 1 : moredata.availableQty)} /></div></div>
      <Button className={classes.App} onClick={()=>handleClick({ brand , image , amount , _id ,name, select ,availableQty , qty})}  color='primary'   variant='outlined'>Add To Cart</Button>
      </div>
      </div>
      </>
  )
}
export async function getStaticPaths(context) { 
  try{
  
    if(!mongoose.connections[0].readyState){
      await mongoose.connect(process.env.MONGO_URI)
    }

  
  
  const data = await Product.find()
  
const paths = await data.map((e)=>{
 
  return{
    params:{product:`${e.name}`}
  } 
})
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}catch(error){
  console.log(error)
}

}

export async function getStaticProps({params} ) {

  try{
    if(!mongoose.connections[0].readyState){
      await mongoose.connect(process.env.MONGO_URI)
    }

  const name = params.product
  const moredata = await Product.findOne({name})

  return {
 
    props: { moredata:JSON.parse(JSON.stringify(moredata)) }
    
  }
}catch(error){
  console.log(error)
}
}



export default product
