import { Response } from "express";

export default{
    sendSuccessMessage:(
        res:Response,
        body:any={},
        message:string="Action Performed Successfully",
        status:number=200,
    )=>{
        return res.send({body,message,status})
    },
    sendErrorMessage:(
        res:Response,
        description={},
        message:string="Action Could not be performed",
        status:number=500
    )=>{
        return res.send({description,message,status})
    }
}