'use client'
import { Button } from "@mui/material"
import { DeleteOutline } from "@material-ui/icons"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { deletedata } from "../../state/redux/action"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import Image from "next/image"
const cart = () => {



    const [datas, setDatas] = useState([])
    const [total, setTotal] = useState()
    const [progress, setProgress] = useState(0)
    const router = useRouter()
    const dispatch = useDispatch()
    const deleteCart = (e) => {
        dispatch(deletedata(e))
        const url = `http://localhost:3000/cart?deletedata=${e}`
        window.location = url
        toast("your item deleted")
    }


    useEffect(() => {
        setDatas(JSON.parse(localStorage.getItem('cart')))
        setTotal(JSON.parse(localStorage.getItem('subtotal')))



    }, [])
  
    useEffect(()=>{
  
      setProgress(100)
     },[])
    
    const goBack = () => {
        router.push('case-soft-silicon-cover') 
        
    }
const checkout = () => {
    router.push('checkoutpay') 

}
    return (
        <>
         <LoadingBar className='loadingbar' height={63}  color='#FFFFFF'  progress={progress} waitingTime={800} onLoaderFinished={() => setProgress(0)}/>
       <ToastContainer />
            {datas < 1 && <div className="cart_title">No Item in Cart</div>}
            {
                datas && Object.values(datas).map((e, i) => {
                    return <div className="cart" key={i}>
                        <div className='cart_image'><Image src={e.image} height={70} width={50} alt='' /></div>
                        <div className='cart_select'>{e.select}</div>
                        <div className="cart_qtyprice">
                        <div className="cart_qty">qty:{e.qty}</div>
                        <div className='cart_price'>₹{e.amount}</div>
                        </div>
                        <div className='cart_name'>{e.name.slice(0, 20)}...</div>
                        <div className='cart_icon'>  <DeleteOutline onClick={() => deleteCart(e._id)} /></div>

                    </div>
                })
            }
            {datas  && <div className="cart_subtotal">subTotal = ₹{total}</div>}
            {datas && <div onClick={checkout} className='cart_button'><Button color='primary' variant='contained'>checkOut</Button></div>}
            {datas < 1 && <Button onClick={goBack} style={{ margin: '0 40%' }} color='secondary' variant='contained'>Go back</Button>}
        </>
    )
}
export default cart     