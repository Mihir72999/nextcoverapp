import connectdb from "../../../middleware/connectdb";
import product from "../../../schema/product";

const data = async(req,res) =>{
    
  for (let  i = 0; i < req.body.length;  i++){

      const {name,id,brand,brandmodel,price,image,availableQty} = req.body[i]
      try{
          if(req.method === 'POST'){  
              const productData = await new product({
                  name,
                  id,
                  brand,
                  brandmodel,
                  price,
                  image,
                  availableQty
                })
                 await productData.save()
                res.status(200).json({message:"data send succesfuly"})
            }
            
        }catch(error){
            res.status(400).json({message:error.message})
            
        }
    }  
}

export default connectdb(data) 