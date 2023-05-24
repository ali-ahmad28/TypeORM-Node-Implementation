import Book from "../modules/Authentication/models/Book";
import { User } from "../modules/Authentication/models/User";
import { DataSource} from "typeorm";

export const dataSource = new DataSource({
    type:"postgres",
    host:process.env.HOST,
    port:5432,
    username:process.env.USER_NAME,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    entities:[User,Book],
    synchronize: true,
    logging: false
})