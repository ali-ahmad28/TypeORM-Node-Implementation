import express, {Express, NextFunction, Request, Response} from 'express';
import { dataSource } from './connections/connection';
import router from './routes';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from "./Swagger.json";
import cors from 'cors';
const app:Express=express()
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

dotenv.config();
router.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/',router)

// router.use((req:Request, res:Response, next:NextFunction) => {
//     // set the CORS policy
//     res.header('Access-Control-Allow-Origin', '*');
//     // set the CORS headers
//     res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
//     // set the CORS method headers
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
//         return res.status(200).json({});
//     }
//     next();
// });



router.use((req:Request, res:Response, next:NextFunction) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

const PORT:any=process.env.PORT??3000;
dataSource.initialize().then(
    ()=>{app.listen(
        PORT,()=>{
            console.log(`The server is running on port ${PORT}`)
        })
    }).catch((error)=>{
        console.log(error.message)
    })

export default app;