import mongoose from "mongoose";
import Joi from "joi";

const BankSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
     
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    deposite:{
        type:Number,
        default:0
    },
    withdraw:{
        type:Number,
        default:0
    },
    balance:{
        type:Number,
        default:0
    },
    isCustomer:{
        type:Boolean,
        default:true
    }

})

const Bank=mongoose.model('Bank',BankSchema);



export default Bank;