import express from "express";
import fs from "fs";
import type { IFileInfo } from "./types";

const app = express();

app.set("view engine", "ejs");

app.use("/", express.static("public"));

app.get("*", (req, res, next) => {
  const filePath = `files${req.path}`;

  if (fs.existsSync(filePath)) {
    if (fs.statSync(filePath).isDirectory()) {
      res.render("");
    }
    res.send("hi");
  } else {
    return next();
  }
});

//404
app.all("*", (req, res) => {
  res.status(404).render("error", { error: { name: "404 Not Found" } });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).render("error", { error: { name: "500 Internal Server Error", stack: err.stack } });
});

app.listen(80, () => {
  console.log("Server Started on port 80");
});

function getFileInfoInDirectory(dirPath: string): IFileInfo[] {
  const dir = fs.readdirSync(dirPath);

  let fileInfo: IFileInfo[] = [];
  for (let i = 0; i < dir.length; i++) {
    //If the file is an info file
    if (dir[i].endsWith(".json")) {
      const file = JSON.parse(fs.readFileSync(`files${dirPath}/${dir[i]}`, "utf-8"));
      fileInfo.push(file);
    }
  }

  return fileInfo;
}
