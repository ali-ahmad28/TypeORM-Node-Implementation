import {Request, Response} from "express";
import { User } from "../models/User";
import Book from "../models/Book";
import RequestResponseMappings from "../../../Shared/utils/Mappings/RequestResponseMappings";

export default {
    addBook:async(req:Request,res:Response)=>{
        
        //console.log("the body in add book is",req.body)
        //console.log("the body in add book is",req.body.email)
        let bookNames=req.body.bookNames;
        let user = req.body.user;
        
        // console.log("user", user);
        // console.log(req.body.email);
        
        let currentUser = await User.findOne({where: {email:user.email}});
        console.log("Im current user",currentUser);
        
        if(currentUser){
            let books=[];
            for(const singleBook of bookNames){
                let book = Book.create({bookName:singleBook,user: currentUser});
                await book.save();
                books.push(book);
            }
            // currentUser.books=books;
            // await currentUser.save();
            return RequestResponseMappings.sendSuccessMessage(res,currentUser);
        }

    },
    getBooks:async(req:Request,res:Response)=>{
        try{
            if(req.params&&req.params.id){
                let book = await Book.findOne({
                    where:{
                        id:parseInt(req.params.id)
                    },
                    relations:{
                        user:true
                    }
                });
                return RequestResponseMappings.sendSuccessMessage(res,book);
            }else{
                let book = await Book.find({
                    relations:{
                        user:true
                    }
                });
                return RequestResponseMappings.sendSuccessMessage(res,book);
            }
        }
        catch(e:any){
            return RequestResponseMappings.sendErrorMessage(res,e.message);
        }
    }
    
}