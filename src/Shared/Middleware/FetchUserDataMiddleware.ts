import { Request,Response,NextFunction } from "express";
import { User } from "../../modules/Authentication/models/User";
import * as fs from 'fs';

export default{
    getAllUserData:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            let data = await User.find();
            fs.writeFileSync("C://Development//typescript-typeorm-crud-app//src//Shared//ServerFiles//userData.txt",JSON.stringify(data));
            next();
        }
        catch(e:any){
            console.log(e.message)
        }
    }
}