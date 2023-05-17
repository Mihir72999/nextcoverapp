import connectdb from "../../../middleware/connectdb";
import product from "../../../schema/product";

const idproduct = async(req,res) =>{
 
  try {
      
      const name =req.query.name
  console.log(name)
      if(req.method === 'GET'){

        const data = await product.findOne({name})
       
        res.status(200).json(data)
          
        }
       
      }
        
     catch (error) {
      console.log(error)  
    }
}
export default  connectdb(idproduct) 


