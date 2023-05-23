import connectdb from "../../../middleware/connectdb"
import Order from "../../../schema/order"


const order = async(req, res)=>{
if(req.method === 'POST'){
    try{
        const {fname ,lname , street,town ,pin ,phone , email , state } = req.body
         const product = req.body.cart 
         const orderId = req.body.id
         
         const data = await  Order({fname ,lname , street,town ,pin ,phone , email ,state,orderId,product })
         
      await data.save()
      res.status(201).json({status:"ok"})
    }catch(error){
        res.status(422).json({message:"went something wrong"})
        console.log(error)
    }
}
}
export default connectdb(order)