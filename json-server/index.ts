import { Application } from "express";

const jsonServer = require("json-server");

const app: Application = jsonServer.create();

app.use(jsonServer.defaults());
app.use(jsonServer.bodyParser);
app.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  }),
);

// region 自定义的接口

require("./api/doc/book/webgl-beginners-guide/02-07").init(app);

// endregion

/*
 * 启动模拟服务
 */
const port = 3003;
app.listen(port, () => {
  console.log("--------------------------------------------------");
  console.log(`json-server is running at http://localhost:${port}`);
  console.log("--------------------------------------------------");
});
