
import { Box, Breadcrumbs, Button, Link, Typography } from "@mui/material"
import { DeleteOutline } from "@material-ui/icons"
import { useRouter } from "next/router"
import {useGetproductQuery} from '../../../state/redux/findproducts'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deletedata } from "../../../state/redux/action"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import Image from "next/image"

const cart = () => {


    const {isFetching } = useGetproductQuery()

    const [datas, setDatas] = useState([])
    const [total, setTotal] = useState()
    const [progress, setProgress] = useState(0)
    const router = useRouter()
    const {cart} = useSelector(state=>state.add)
    console.log(cart)
    const dispatch = useDispatch()
    const deleteCart = (e) => {
        dispatch(deletedata(e))
        const url = `https://nextcoverapp.vercel.app/cart?deletedata=${e}`
        window.location = url
        toast.info("your item deleted")
    }

    useEffect(() => {
        setDatas(cart)
        setTotal(JSON.parse(localStorage.getItem('subtotal')))



    }, [])
  
    useEffect(()=>{
  
      setProgress(100)
     },[])
     if(isFetching){
        return <LoadingBar className='loadingbar' height={63}  color='#FFFFFF'  progress={progress} waitingTime={800} onLoaderFinished={() => setProgress(0)}/>
        }    
   
const checkout = () => {
    router.push('checkoutpay') 

}
    return (
        <>
       <ToastContainer />
       <Box display='flex' justifyContent='center'  mt={10}>
            <Breadcrumbs area-label='breadcrumb'>
                <Link underline="hover" href="/">Home</Link>
                <Link underline="hover" href="/case-soft-silicon-cover">Case</Link>
               
                <Typography color='text.primary' >cart</Typography> 
            </Breadcrumbs>

           </Box>
            {datas.length === 0 && <div className="cart_title">No Item in Cart</div>}
            { 
                datas && datas.map((e, i) => {
                    return <div className="cart" key={i}>
                           
                        <div className='cart_image'><Image src={e.image} height={70} width={50} alt='' /></div>
                        <div className='cart_select'>{e.select}</div>
                        <div className="cart_qtyprice">
                        <div className="cart_qty">qty:{e.qty}</div>
                        <div className='cart_price'>₹{e.amount}</div>
                        </div>
                        <div className='cart_name'>{e.name}</div>
                        <div className='cart_icon'>  <DeleteOutline onClick={() => deleteCart(e.select)} /></div>

                    </div>
                })
            }
            {datas.length > 0  && <div className="cart_subtotal">subTotal = ₹{total}</div>}
            {datas.length > 0 && <div onClick={checkout} className='cart_button'><Button color='primary' variant='contained'>checkOut</Button></div>}
           
        </>
    )
}
export default cart     
