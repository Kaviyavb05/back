import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Bank  from './model.js';
const AddData=(req,res)=>{  
    

    const saltRoute=10;
    bcrypt.hash(req.body.password,saltRoute,function(err,hash){
        var newData={            
            name:req.body.name ,
            email:req.body.email,
            password:hash,
            phone:req.body.phone,
        
        }
    
async function createBank(){
       
         try {
            var existingUser=await Bank.findOne({email:newData.email})
            console.log(existingUser);                   

             if(existingUser===null){
             var insert=await Bank.insertMany([newData])
             res.status(200).send(insert);}
             
            else{
                res.status(400).send("this user is already exists!")}
            }
        catch (error) {
            res.status(400).send(error.message)
         }
}createBank();})

}  


//login
const loginBank=async(req,res)=>{
      
               
                 try {
                    var existingUser=await Bank.findOne({ email: req.body.email})
                    console.log(existingUser);
                    if(existingUser)
                    {
                    bcrypt.compare(req.body.password,existingUser.password,function(err,result){
                        if(result){
                        const token= jwt.sign({_id:existingUser._id,isCustomer:existingUser.isCustomer,email:existingUser.email},"secret")
                        return res.header('x-auth',token).status(200).send(token);
                        
                        }
                        if(!result){
                        return res.status(400).send("invalid password");
                          
                        }
                    })
                    }
                    
                    if(!existingUser){
                    return   res.status(400).send("invalid email");}
                                  
    
                }
                catch (error) {
                   return res.status(400).send(error.message)
                 }
      
    
}



const updateDeposite=async (req,res)=>{  
      
   
    try {
        let updatereg=await  Bank.find({email:req.user.email})
        // console.log(updatereg[0].deposite)
        if(updatereg.length<=0) return res.status(400).send('There is no user with this emailID')             
            let fbal=Number(updatereg[0].balance)
            const value=Number(req.body.deposite);
            const add=value+fbal;
            console.log(value);
                const update=await  Bank.findOneAndUpdate({email:req.user.email},{$set:{deposite:add,balance:add}},{new:true})
        return res.status(200).send(update)
    } 

         catch (error) {
        return res.status(400).send(error.message)
    }
}
//update accept/decline by warden
const updateWithdraw=async (req,res)=>{  
      
   
    try {
        let updatereg=await  Bank.find({email:req.user.email})
        // console.log(updatereg[0].withdraw)
        if(updatereg.length<=0){
            
            return res.status(400).send('There is no user with this emailID')}                
                
        if(updatereg.length>=0){
            const value=Number(req.body.withdraw);
            if(value<updatereg[0].balance)
            {
            const sub=Number(updatereg[0].balance)-Number(value);
                const update=await  Bank.findOneAndUpdate({email:req.user.email},{$set:{withdraw:sub,balance:sub}},{new:true})
        return res.status(200).send(update)
            }
            else{
                res.status(400).send('You do not have a sufficent balance to withdraw');
            }
    } 
    }
         catch (error) {
        return res.status(400).send(error.message)
    }}

//get all student
//view all students
const getAll=(req,res)=>{
    async function Data(){
       
    try{
       
        // console.log(req.user.hostelName);
        
       const result=await Bank.find().select('-password')
         return   res.status(200).send(result);
       

    }
    catch (error) {
      return  res.status(400).send(error.message)
     }
}
Data();
}
export {loginBank,updateDeposite,updateWithdraw,getAll,AddData}
