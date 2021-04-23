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
//初始化express
console.log(" start mysql");
console.log("Inserting a new user into the database...");
// create express app
const app = express();
app.use(morgan("dev"));
//设置跨域
app.use(cors());
//解析body内容
app.use(bodyParser.urlencoded({ extended: false })); // 解析urlencoded 格式参数
app.use(bodyParser.json()); // 解析json格式参数
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(
    expressJwt({
        secret: "123456", // 签名的密钥 或 PublicKey
        algorithms: ["HS256"],
    }).unless({
        path: ["/register","/test"], // 指定路径不经过 Token 解析
    })
);
app.use(function (req, res, next) {
    let auth = req.headers.authorization;
    console.log("   auth ==  ", auth);

    logger.info("获取token值");
    //解析出传进来的token参数
    var u = req.user;
    //将前端请求过来的  参数信息
    // 比如  用户名 或者手机号 什么的  传给下一个中间件
    // 或者在下面的 可以直接使用 s
    //设置请求头 User
    req.headers["User"] = u;
    console.log("   请求头信息  ==  ", req.headers);
    console.log("   请求头信息 User ==  ", req.headers.User);
    next(); //继续下一步路由
});
export default app;
