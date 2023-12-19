const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        products:[
            {
                productId:{
                    type:String,
                    require:true
                },
                quantity:{
                        type:Number,
                        default:1
                }
            }
        ],
        totalPrice:{
            type:Number
            },
            status:{
                type: String ,
                default : 'Pending' 
            },
            address:{
                    type:String
            },
        },
        {timestamps:true}
)
module.exports=mongoose.model("Order",orderSchema);