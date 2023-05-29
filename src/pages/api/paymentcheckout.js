
import Razorpay from "razorpay";
const paymentcheckout = async(req ,res) => {
 
try{
if(req.method === 'POST'){
    var instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY_ID,
        key_secret: process.env.RAZORPAY_API_KEY_SECRET
      });
      var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        
        receipt: `#${Math.ceil(Math.random() * 1234 * 159)}`,
    
      };
      const order = await instance.orders.create(options)
      console.log(order.id)
      res.status(200).json({sucess:true , order})
    
}

}catch(error){
  console.log(error.message)
}

}

export default paymentcheckout
