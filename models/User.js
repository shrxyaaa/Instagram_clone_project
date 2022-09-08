const mongoose= require("mongoose")
const {ObjectId}=mongoose.Schema.Types


const userSchema={
   name:{
    type:String,
    required:true
   },
   username:{
      type:String,
      required:true
     },
   bio:{
      type:String,
      default:""
     },
     dp:{
      type:String,
      default:""
     },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   followers:[{
     type:ObjectId,
     ref:"User"

   }],
   following:[{
     type:ObjectId,
     ref:"User"

   }]
}
mongoose.model("User",userSchema);