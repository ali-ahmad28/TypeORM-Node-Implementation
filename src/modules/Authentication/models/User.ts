import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Book from "./Book";


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    email!: string;
    
    @Column()
    password!: string;

    @Column()
    image!: string

    @OneToMany(()=>Book,(books)=>books.user)
    books:Book[]

}