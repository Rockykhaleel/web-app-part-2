const mongoose= require('mongoose');
const Products= mongoose.model('Products');

module.exports={
    top:async (req,res)=>{
        try {
            const docs=await Products.find().sort({price:-1}).limit(5);
            res.status(200).send(docs);
        } catch (error) {
            res.status(500).send({message:"Error Occured",error:error})
        }
        
    },
    all:async (req,res)=>{
        try {
            const docs=await Products.find().sort({price:-1});
            res.status(200).send(docs);
        } catch (error) {
            res.status(500).send({message:"Error Occured",error:error})
        }
        
    },
    postproducts:async (req,res)=>{
        const { pname, price,quantity } = req.body;
        const newProduct = new Products({
            pname,
            price,quantity
          });
          try {
            const resp = await newProduct.save();
            res.status(201).send({ message: "New Product Added", resp });
          } catch (error) {
            res.status(500).send({ message: "Some Internal Server Error" });
          }
        
    },
    aggregate:async (req, res) => {
        try {
            const result = await Products.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: "$price"
                        },
                        // Add more columns as needed
                    }
                }
            ]);
    
            res.json(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}