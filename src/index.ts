import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { Student } from "./entity/User";
var morgan = require("morgan");
//import jwtAuth = require('./jwt/jwt')
const cors = require("cors");
const expressJwt = require("express-jwt");
import logger from "./log/log";
import app from "./app";

//路由
Routes.forEach((route) => {
  (app as any)[route.method](
    route.route,
    (req: Request, res: Response, next: Function) => {
      const result = new (route.controller as any)()[route.action](
        req,
        res,
        next
      );
      if (result instanceof Promise) {
        result.then((result) =>
          result !== null && result !== undefined ? res.send(result) : undefined
        );
      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    }
  );
});

// setup express app heresad.
// start express server
//启动监听  port 可以更改
// 或者 写在配置文件中
logger.info("Example app listening on port 3000!");
app.listen(3000, () => console.log("Example app listening on port 3000!"));

//连接数据库
//connect mysql
createConnection()
  .then(async () => {
    console.log("Connected to DB is Successful !");
  })
  .catch((error) => console.log("Connected is Failed!",error));

/*
createConnection().then(async  => {




    // insert new users for test
    /*
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
    }));
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
    }));

    //insert data
    await connection.manager.save(connection.manager.create(Student, {
      Stuname:"黎明",
      Age:"10",
      School:"香港"
    }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));

*/
