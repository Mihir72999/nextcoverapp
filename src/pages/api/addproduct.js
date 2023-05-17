import connectdb from "../../../middleware/connectdb";
import product from "../../../schema/product";

const addproduct = async(req,res) =>{
  
 try{
  if(req.method === 'GET'){  
    let productdata = await product.find()
    
    let myItems = {}
    for(let item of  productdata){
     
        if(item.brand in myItems){
          if(!myItems[item.brand].brandmodel.includes(item.brandmodel) && item.availableQty > 0 ){
            myItems[item.brand].brandmodel.push(item.brandmodel)
          }
          if(!myItems[item.brand].image.includes(item.image) && item.availableQty > 0 ){
            myItems[item.brand].image.push(item.image)
          }
        }
        else{
            myItems[item.brand] = JSON.parse(JSON.stringify(item))
            if(item.availableQty > 0 ){
                myItems[item.brand].brandmodel = [item.brandmodel]
                myItems[item.brand].image = [item.image]
               
            }
        }
    }
    res.status(200).json({myItems})
    }
 }catch(error){
   console.log(error)

 }
  

}

export default connectdb(addproduct)