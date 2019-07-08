import { Application, Request, Response } from "express";

function init(app: Application) {
  app.get("/doc/book/webgl-beginners-guide/02-07", (req: Request, res: Response) => {
    res.jsonp(require("../../../../../src/book/webgl-beginners-guide-code/1727_02/models/cone.json"));
  });
}

module.exports = { init };
