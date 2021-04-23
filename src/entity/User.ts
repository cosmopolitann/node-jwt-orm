import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
// Student


@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Stuname: string;

    @Column()
    Age: string;

    @Column()
    School: string;

}

//用户 信息

@Entity()
export class UserInfo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    UserName: string;

    @Column()
    Tel: string;

    @Column()
    Age: number;

}