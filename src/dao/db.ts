import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "../routes";
import {User} from "../entity/User";
import {Student} from "../entity/User";



//create db
let connection =null;

export function createdb (){

    createConnection().then(async connection => {
        connection=connection
    
        //
        console.log(" start mysql")
        console.log("Inserting a new user into the database...");
    
    
    }).catch(error => console.log(error));
}



