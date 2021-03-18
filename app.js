import { App } from "@tinyhttp/app";
import { logger } from "@tinyhttp/logger";
import { parse, serialize } from "@tinyhttp/cookie";
import sirv from "sirv";
import bodyParser from "body-parser";
import path from "path";

const parser = bodyParser.urlencoded({ extended: false });
const app = new App();

app.use("/get-cookies", parser);
app.use("/cookie", sirv("public"));

app
  .get("/", (req, res) => {
    // console.log(req.headers);
    const { name } = parse(req.headers.cookie || "");
    console.log(name);
    if (name) {
      res.send(`Hello ${name}`);
    } else {
      res.redirect("/cookie/");
    }
  })
  .post("/get-cookies", (req, res) => {
    const name = req.body.name;
    console.log(name);
    res.set(
      "Set-Cookie",
      serialize("name", name, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })
    );
    res.redirect("/cookie/", 304);
    // res.send("You are done");
  })
  .listen(3000);
