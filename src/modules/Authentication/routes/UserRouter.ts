import express,{ Express,Request,Response } from "express";
import UserController from "../controllers/UserController";
import AuthenticationMiddleware from "../../../Shared/Middleware/AuthenticationMiddleware";
import bookRouter from "./BookRouter";
import multer from "multer";
import FetchUserDataMiddleware from "../../../Shared/Middleware/FetchUserDataMiddleware";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
//for hitting api through postman
//const upload = multer({ storage: storage });

//for hitting api through fetch
const upload = multer();

const userRouter:Express=express();
userRouter.get('/',AuthenticationMiddleware.isAuthenticated,UserController.getUser)
userRouter.get('/searchUser',UserController.searchUser)
userRouter.get('/getUserPaging',UserController.getUserPaging)
userRouter.post('/login',UserController.loginUser)
userRouter.post('/',upload.single('image'),UserController.register)
userRouter.put('/',upload.single('image'),UserController.updateUser)
userRouter.delete('/',UserController.deleteUser)
userRouter.get('/readUserData',UserController.readUserData)
userRouter.post('/writeUserData',UserController.writeUserData)
userRouter.post('/appendUserData',UserController.appendUserData)
userRouter.get('/getAllDataInFile',UserController.getAllUsers)
userRouter.get('/downloadAllUserData',FetchUserDataMiddleware.getAllUserData,UserController.downloadUserData)
userRouter.use('/books',AuthenticationMiddleware.isAuthenticated,bookRouter);

export default userRouter;