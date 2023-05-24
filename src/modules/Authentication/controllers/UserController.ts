import { Request, Response } from "express";
import * as streamifier from 'streamifier';
import { User } from "../models/User";
import { userSchema } from "../utils/Validators/UserValidator";
import RequestResponseMappings from "../../../Shared/utils/Mappings/RequestResponseMappings";
import jsonwebtoken from 'jsonwebtoken';
import UserController from "./UserController";
import Joi from "joi";
import bcrypt from 'bcrypt';
import { ILike } from "typeorm";
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import { PassThrough, Readable } from "stream";

interface _User {
    password: string;
    email: string;
    image: string;
}
function configureCloudinary() {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    return cloudinary;
}
export default {
    getUser: async (req: Request, res: Response) => {
        let user = await User.findOne({
            where: {
                email: req.body.user.email
            },
            relations: {
                books: true
            }
        })
        return RequestResponseMappings.sendSuccessMessage(res, user)
    },
    getAllUsers: async (req: Request, res: Response) => {

        try {
            let data = await User.find();
            fs.writeFileSync("C://Development//typescript-typeorm-crud-app//src//Shared//ServerFiles//userData.txt", JSON.stringify(data));
            res.send("success");
        }
        catch (e: any) {
            console.log(e.message)
        }
    },
    register: async (req: Request, res: Response) => {
        try {
            let userToValidate = {
                email: req.body.email,
                password: req.body.password,
                image: req.file
            }
            let userValidationError: Boolean | Joi.ValidationError | undefined = UserController.errorValidateUserSchema(userToValidate)
            if (userValidationError && "details" in userValidationError) {
                return RequestResponseMappings
                    .sendErrorMessage(
                        res,
                        userValidationError?.details
                    )
            }
            let cloudinary = configureCloudinary();
            let file = req.file;
            const base64Img = file!.buffer.toString('base64');
            let imageLink = (await cloudinary.uploader.upload(`data:image/jpg;base64,${base64Img}`)).secure_url;
            let user = User.create(
                {
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, await bcrypt.genSalt(10)),
                    image: imageLink
                });
            await user.save();
            return UserController.sendTokenWithPayload(res, user);
        } catch (e: any) {
            return RequestResponseMappings.sendErrorMessage(res, {}, e.message)
        }
    },
    loginUser: async (req: Request, res: Response) => {

        let user = await User.findOneBy({ email: req.body.email });
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            return UserController.sendTokenWithPayload(res, user);
        }
        return RequestResponseMappings.sendErrorMessage(res);
    },
    updateUser: async (req: Request, res: Response) => {
        try {
            let cloudinary = configureCloudinary();
            let file = req.file;
            let imageLink = (await cloudinary.uploader.upload(file!.path)).secure_url;
            let userValidationError: Boolean | Joi.ValidationError | undefined = UserController.errorValidateUserSchema(req.body)
            if (userValidationError && "details" in userValidationError) {
                return RequestResponseMappings
                    .sendErrorMessage(
                        res,
                        userValidationError?.details
                    )
            }
            let user = await User.update(req.body.id, { id: req.body.id, password: bcrypt.hashSync(req.body.password, await bcrypt.genSalt(10)), image: imageLink, email: req.body.email })
            return RequestResponseMappings.sendSuccessMessage(res, user, "User updated successfully")
        }
        catch (e: any) {
            return res.send(e.message);
        }
    },
    deleteUser: async (req: Request, res: Response) => {
        let id: number = +req.query.id!
        await User.delete(id).then((result) => {
            if (result.affected! > 0) {
                return RequestResponseMappings.sendSuccessMessage(res, "User deleted successfully")
            }
            return RequestResponseMappings.sendErrorMessage(res, "User not found")
        })

    },
    errorValidateUserSchema: (incomingUser: any): Boolean | Joi.ValidationError | undefined => {

        let userValidationError = userSchema.validate(incomingUser).error;
        if (!userValidationError) {
            return false;
        }
        return userValidationError;
    },
    sendTokenWithPayload: (res: Response, user: _User) => {
        let refreshToken = jsonwebtoken.sign(
            { email: user.email, password: user.password },
            process.env.JWT_SECRET_KEY!
        )
        return RequestResponseMappings.sendSuccessMessage(res, {
            token: jsonwebtoken.sign(
                { email: user.email, password: user.password },
                process.env.JWT_SECRET_KEY!),
            refreshToken: refreshToken,
            user: user
        })
    },
    searchUser: async (req: Request, res: Response) => {

        let email = req.body.email;
        let user = await User.find({
            where: [
                { email: ILike(`%${email}%`) }
            ]
        })
        return RequestResponseMappings.sendSuccessMessage(res, user)
    },
    getUserPaging: async (req: Request, res: Response) => {

        let pageNumber = req.body.pageNumber
        let recordPerPage = req.body.recordPerPage
        const skip = (pageNumber - 1) * recordPerPage;
        const take = recordPerPage;
        let user = await User.find({ skip, take })
        return RequestResponseMappings.sendSuccessMessage(res, user)
    },
    readUserData: async (req: Request, res: Response) => {

        try {
            let data = fs.readFileSync("C://Development//typescript-typeorm-crud-app//src//Shared//ServerFiles//data.txt", 'utf8');
            res.send(data);
        }
        catch (e: any) {
            console.log(e.message)
        }
    },
    writeUserData: async (req: Request, res: Response) => {

        try {
            fs.writeFileSync("C://Development//typescript-typeorm-crud-app//src//Shared//ServerFiles//data.txt", req.body.data);
            res.send("success");
        }
        catch (e: any) {
            console.log(e.message)
        }
    },
    appendUserData: async (req: Request, res: Response) => {

        try {
            fs.appendFileSync("C://Development//typescript-typeorm-crud-app//src//Shared//ServerFiles//data.txt", `\n${req.body.data}`);
            res.send("success");
        }
        catch (e: any) {
            console.log(e.message)
        }
    },
    downloadUserData: async (req: Request, res: Response) => {

        res.download('src//Shared//ServerFiles//userData.txt')
    }
}