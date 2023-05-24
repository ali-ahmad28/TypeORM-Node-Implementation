import express,{Express} from 'express';
import userRouter from './modules/Authentication/routes/UserRouter';

const router:Express= express();

router.use('/user',userRouter);

export default router;