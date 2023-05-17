import connectdb from "../../../middleware/connectdb";
import product from "../../../schema/product";


const getProduct = async(req,res) =>{
  connectdb()
    try {
    let items = {}
      if(req.method === 'GET'){
   
        const getProductData = await product.find()
      for (let item of getProductData){

        
            if(item.name in items){
             
            }
             else{
              items[item.name] = JSON.parse(JSON.stringify(item))
            
              
             }
            }
          
        }
       res.status(200).json({items})
      }
        
     catch (error) {
      console.log(error)  
    }
}
export default getProduct
