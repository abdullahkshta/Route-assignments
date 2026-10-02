const fsp = require("node:fs/promises");
const fs = require("node:fs");
const path = require("node:path");
const event = require("node:events");
const os = require("node:os");
const zlib = require("node:zlib");
const http = require("node:http");

const server = http.createServer((req, res) => {
  const users = JSON.parse(fs.readFileSync("./dataBase.json", "utf-8"));
  const { url, method } = req;
  const id = Number(url.split("/")[2]);
  if (url.startsWith("/user")) {
    switch (method) {
      case "POST": {
        let container = "";
        req.on("data", (chunk) => {
          container += chunk.toString();
        });

        req.on("end", () => {
          try {
            const newContainer = JSON.parse(container);
            const cond = users.findIndex(
              (obj) => obj.email === newContainer.email,
            );

            if (cond === -1) {
              const lastId = users[users.length - 1].id;
              newContainer.id = lastId + 1;

              users.push(newContainer);

              fs.writeFileSync(
                "./dataBase.json",
                JSON.stringify(users),
                "utf-8",
              );

              res.writeHead(201, { "content-type": "application/json" });
              res.end(
                JSON.stringify({
                  message: "User added successfully",
                  user: newContainer,
                }),
              );
            } else {
              res.writeHead(409, { "content-type": "application/json" });
              res.end(JSON.stringify({ message: "Email already exists" }));
            }
          } catch (error) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(
              JSON.stringify({
                message: "this something is in the value worrng ",
                error: error.message,
              }),
            );
          }
        });
        break;
      }
      case "PATCH": {
        let container = "";
        req.on("data", (chunk) => {
          container += chunk.toString();
        });
        req.on("end", () => {
          try {
            const newContainer = JSON.parse(container);

            const target = users.find((obj) => obj.id === id);

            if (!target) {
              res.writeHead(404, { "content-type": "application/json" });
              return res.end(JSON.stringify({ message: "user id not found" }));
            }
            if (newContainer.age !== undefined) {
              target.age = newContainer.age;
            }
            fs.writeFileSync("./dataBase.json", JSON.stringify(users), "utf-8");

            res.writeHead(200, { "content-type": "application/json" });
            res.end(
              JSON.stringify({
                message: "User updated successfully",
                user: target,
              }),
            );
          } catch (error) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(
              JSON.stringify({
                message: "this something is in the value worrng ",
                error: error.message,
              }),
            );
          }
        });
        break;
      }
      case "DELETE": {
        try {
          const index = users.findIndex((obj) => obj.id === id);

          if (index === -1) {
            res.writeHead(404, { "content-type": "application/json" });
            return res.end(JSON.stringify({ message: "User id not found" }));
          }

          const deletedUser = users.splice(index, 1)[0];

          fs.writeFileSync("./dataBase.json", JSON.stringify(users), "utf-8");

          res.writeHead(200, { "content-type": "application/json" });
          res.end(
            JSON.stringify({
              message: "user deleted successfully",
              user: deletedUser,
            }),
          );
        } catch (error) {
          res.writeHead(500, { "content-type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Error in delete user",
              error: error.message,
            }),
          );
        }
        break;
      }
      case "GET": {
        try {
          if (!id) {
            res.writeHead(200, { "content-type": "application/json" });
            return res.end(JSON.stringify(users));
          }

          const user = users.find((obj) => obj.id === id);

          if (!user) {
            res.writeHead(404, { "content-type": "application/json" });
            return res.end(JSON.stringify({ message: "User not found" }));
          }

          res.writeHead(200, { "content-type": "application/json" });
          res.end(JSON.stringify(user));
        } catch (error) {
          res.writeHead(500, { "content-type": "application/json" });
          res.end(
            JSON.stringify({
              message: "Error fetching user",
              error: error.message,
            }),
          );
        }
        break;
      }
    }
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ massage: `this page doesn't exsit 404 ` }));
  }
});
server.listen(3001, () => {});
