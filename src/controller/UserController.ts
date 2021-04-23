import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Student } from "../entity/User";
import { UserInfo } from "../entity/User";
import { exploring } from "../server/Test";
const jwt = require("jsonwebtoken");
//jwt
import logger from "../log/log";
//var jwtAuth1 = require('./jwt')
export class UserController {
  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
  }
}

export class StudentController {
  //stuRepository = getRepository(Student);

  async all(request: Request, response: Response, next: NextFunction) {
    const st = await getRepository(Student).findOne(11);

    console.log(" 打印  请求 信息 ", Request);
    console.log(" 打印  返回 信息 ", Response);
    //插入数据库信息
    //查询数据库信息
    // exploring()
    //逻辑 操作
    await getRepository(Student).save(st);
    var ss = new Student();
    ss.Age = "18";
    ss.School = "上海";
    ss.Stuname = "关晓彤";

    console.log("ss ==", ss);
    // const ti = await getRepository(Student).create(ss)
    //存储数据
    await getRepository(Student).save(ss);
    console.log(" st = ", st);
    try {
      const st1 = await getRepository(Student).findOne(11);
      console.log(" st = ", st1);
      var s2 = new Student();
      s2.Age = "20";
      s2.School = "香港";
      s2.Stuname = "李嘉欣";
      console.log("ss ==", ss);
      // const ti = await getRepository(Student).create(ss)
      //存储数据
      await getRepository(Student).save(s2);
      console.log(" s2 = ", s2);
    } catch (e) {
      console.log(" err := ", e);
    }

    return st;
  }
}
//hello
export class HelloController {
  // stuRepository = getRepository(Student);

  // get 请求  参数  加 在 后面  可以用  request.query.参数名字  直接获取
  // eg   http://localhost:3000/hello?a=123
  //       request.query.a    就可以获取到  a 的参数信息  a=123

  async hello(request: Request, response: Response, next: NextFunction) {
    var req = request.query;

    console.log(" req ", req);

    var ho = request.host;
    console.log(" 获取 主机 名字 ：", ho);
    var path = request.path;
    console.log(" 获取 路径 名字 ：", path);
    var ab = request.query.a;
    console.log(" 获取 参数  名字  a b ：", ab);
    var res = exploring();
    console.log(" res ", res);

    return res;
  }

  // 这个是  post 请求   如何获取参数信息

  async hellopost(request: Request, response: Response, next: NextFunction) {
    //能收到    x-www.form.urlencoded 的 参数信息 但是 收不到 body 的信息
    // 在这里需要 加载 两个包 才行
    ///app.use(bodyParser.urlencoded({extended:false}))  // 解析urlencoded 格式参数
    // app.use(bodyParser.json())
    //
    let username = request.body.username;
    let password = request.body.password;
    console.log(" username ", username);
    console.log(" password ", password);
    var com = request.body;
    console.log(" com ", com);

    return "Hello,world!";
  }
}

//jwt route

//hello
export class HelloControllerJwt {
  // stuRepository = getRepository(Student);

  // get 请求  参数  加 在 后面  可以用  request.query.参数名字  直接获取
  // eg   http://localhost:3000/hello?a=123
  //       request.query.a    就可以获取到  a 的参数信息  a=123

  async hello(request: Request, response: Response, next: NextFunction) {
    var req = request.query;

    console.log(" req ", req);

    var ho = request.host;
    console.log(" 获取 主机 名字 ：", ho);
    var path = request.path;
    console.log(" 获取 路径 名字 ：", path);
    var ab = request.query.a;
    console.log(" 获取 参数  名字  a b ：", ab);
    var res = exploring();
    console.log(" res ", res);

    return "Jwt 鉴权路由  hello ";
  }

  async hello1(request: Request, response: Response, next: NextFunction) {
    var req = request.query;

    console.log(" req ", req);

    var ho = request.host;
    console.log(" 获取 主机 名字 ：", ho);
    var path = request.path;
    console.log(" 获取 路径 名字 ：", path);
    var ab = request.query.a;
    console.log(" 获取 参数  名字  a b ：", ab);
    var res = exploring();
    console.log(" res ", res);

    return "Jwt 鉴权路由   Hello 1";
  }
  // 这个是  post 请求   如何获取参数信息
  //登录接口
  async login(request: Request, response: Response, next: NextFunction) {
    logger.info(" Login 请求 ");
    logger.info(" 请求 参数 信息 body : ", request.body);
    logger.info(" 请求头信息  : ", request.headers);

    logger.info(" 请求头信息 User 信息  : ", request.headers.User);
    logger.info(" 获取 参数 手机号 信息  Name =: ", request.body.Name);
    logger.info(" 获取 参数 用户名 信息  Tel =: ", request.body.Tel);
    // 从数据库 查询 是否已经注册  如果有这个用户 则 存在  否则 不存在  请先注册
    //查询 数据   查询 name=Nick 的信息
    //等于  select * from user_info where UserName='Nick' limit 1;
    //+----+----------+--------------+-----+
    //| id | UserName | Tel          | Age |
    //+----+----------+--------------+-----+
    //| 1  | Nick     | 181000011111 | 20  |
    //+----+----------+--------------+-----+

    let userInfoRepository = getRepository(UserInfo);

    let meAndBearsPhoto = await userInfoRepository.findOne({
      UserName: "Nick",
    });
    console.log("取出来的数据信息: ", meAndBearsPhoto);
    //UserInfo { id: 1, UserName: 'Nick', Tel: '181000011111', Age: 20 }

    if (meAndBearsPhoto.UserName == "") {
      return { code: 40001, messge: "  登录不成功，用户不存在，请先注册 " };
    }
    return { code: 200, messge: "  登录成功！ " };
  }

  //注册接口
  async register(request: Request, response: Response, next: NextFunction) {
    //这是 POST 请求     获取 body 信息
    //获取前端发来的参数信息
    //例如
    /*
                 {Username:"Nick",Tel:181000000}
                 */
    let username = request.body.Username;
    let tel = request.body.Tel;
    console.log(" username ", username);
    console.log(" tel ", tel);
    var params = request.body;
    console.log(" 这是 body  params 信息 =", params);
    const token =
      "Bearer " +
      jwt.sign({ uername: username }, "123456", { expiresIn: 3600 * 24 * 3 });
    console.log("  打印  Token 的 值 为 :  ", token);

    //保存到 数据库中
    //保存到 user 用户
    var userInfo = new UserInfo();
    userInfo.Age = 20;
    userInfo.Tel = tel;
    userInfo.UserName = username;

    console.log(" 信息  ", userInfo);

    //存储数据
    try {
      await getRepository(UserInfo).save(userInfo);
      console.log(" userInfo = ", userInfo);
    } catch (error) {
      console.log(" 插入胡数据失败 err := ", error);
    }

    return { token: token, code: 200, messge: "  注册成功  " };
  }
}

// 测试 数据库 增删查改
export class MysqlTestController {
  //测试的话 就用 user 表  增删查改
  private userRepository = getRepository(User);

  async test(request: Request, response: Response, next: NextFunction) {
    let user = new User();
    user.firstName = "Tim";
    user.age = 20;
    user.lastName = "BigTim";
    // 增加一条数据
    var delId = 0;

    try {
      let addone = await this.userRepository.save(user);
      console.log(" 插入的 user 信息 = ", user);
      delId = addone.id;
    } catch (error) {
      console.log(" 插入数据 err := ", error);
    }
    //查找一条数据

    try {
      let findone = await this.userRepository.findOne({ firstName: "Tim" });
      console.log(" 查询的 user 信息 = ", findone);
    } catch (error) {
      console.log(" 插入数据失败 err := ", error);
    }

    // 更新一条数据

    try {
      let findone = await this.userRepository.findOne({ id: delId });
      console.log(" 查询 的 信息  =", findone);

      user.firstName = "Hkuke";

     let saveone= await this.userRepository.save(user);
      delId = findone.id;

      console.log(" 更新的 user 信息 = ",saveone);
    } catch (error) {
      console.log(" 更新数据失败 err := ", error);
    }

    //删除一条数据
    //  测试的时候 删除数据  id =  多少 要 换一个  不然是失败 因为已经删除了 不存在了
    console.log(" 要删除数据的id 是 = ", delId);

    let photoToRemove = await this.userRepository.findOne({ id: delId });
    await this.userRepository.remove(photoToRemove);

    return "success.";
  }
}
