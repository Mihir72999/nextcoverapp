import connectdb from "../../../middleware/connectdb";
import product from "../../../schema/product";


const getProduct = async(req,res) =>{
  try {
      

      if(req.method === 'GET'){
        const getProductData = await product.find()
        
        res.status(200).json(getProductData)
        
          
        }
       
      }
        
     catch (error) {
      console.log(error)  
    }
}
export default  connectdb(getProduct) 
