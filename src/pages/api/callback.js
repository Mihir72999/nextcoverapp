
import callbackSchema from '../../../schema/callback'
import connectdb from '../../../middleware/connectdb'
import crypto from "crypto"
const callback = ( req, res) => {
  // connectdb()
  if(req.method === 'POST'){
    
    const {razorpay_payment_id , razorpay_order_id , razorpay_signature } = req.body
    let body= razorpay_order_id + "|" + razorpay_payment_id;
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_KEY_SECRET)
                                  .update(body.toString())
                                  .digest('hex');
                                  
  const isAuthanticate = expectedSignature ===  razorpay_signature                            
    if(isAuthanticate){
          const {razorpay_payment_id , razorpay_order_id , razorpay_signature } = req.body

      await  callbackSchema.create({razorpay_payment_id , razorpay_order_id , razorpay_signature})
     res.redirect(`/redirectrazorpay/page?order_id=${razorpay_order_id}` , 200)
     }else{
       
       res.status(401).json({sucess:'false'})
     }

  }
}

export default callback
