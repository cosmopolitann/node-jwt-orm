import { UserController } from "./controller/UserController";
import { StudentController } from "./controller/UserController";
import { HelloController } from "./controller/UserController";
import { HelloControllerJwt } from "./controller/UserController";
import { MysqlTestController } from "./controller/UserController";

export const Routes = [{ method: "get", route: "/users", controller: UserController, action: "all" },
{ method: "get", route: "/users/:id", controller: UserController, action: "one" },
{method: "post",route: "/users",controller: UserController,action: "save"},
{method: "delete", route: "/users/:id",controller: UserController,action: "remove"},
{ method: "get", route: "/test", controller: MysqlTestController, action: "test" },
{
    method: "get",
    route: "/stu",
    controller: StudentController,
    action: "all"
},
{
    method: "get",
    route: "/hello",
    controller: HelloController,
    action: "hello"
},
{
    method: "post",
    route: "/hello",
    controller: HelloController,
    action: "hellopost"
},
{
    method: "get",
    route: "/hello1",
    controller: HelloControllerJwt,
    action: "hello"
},
{
    method: "post",
    route: "/hello2",
    controller: HelloControllerJwt,
    action: "hellopost"
},
{
    method: "post",
    route: "/register",
    controller: HelloControllerJwt,
    action: "register"
},
{
    method: "post",
    route: "/login",
    controller: HelloControllerJwt,
    action: "login"
}
];

