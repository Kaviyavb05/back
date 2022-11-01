import express from "express";
import bodyParser from 'body-parser';
import { getAll, loginBank, AddData,updateDeposite, updateWithdraw } from "./controller.js";
import auth from "./auth.js";
import Bank from "./bank.js";

const App=express();
App.use(bodyParser.json())
App.use(bodyParser.urlencoded({extended:true}))
App.use(bodyParser.text())
const router=express.Router();

//register route
router.post('/register',AddData);
router.post('/login',loginBank);
router.get('/get/:emailId',auth,Bank,getAll)
router.post('/update',auth,Bank,updateDeposite)
router.post('/withdraw',auth,Bank,updateWithdraw)
router.get('/getall',getAll)
export default router;
    


