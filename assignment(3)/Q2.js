const express = require("express");
const fs = require("node:fs");
const app = express();
const users = JSON.parse(fs.readFileSync("./dataBase.json"));
app.use(express.json());

app.post("/user", (req, res) => {
  const body = req.body;
  const targetUser = users.findIndex((user) => user["email"] === body["email"]);
  if (targetUser === -1) {
    const id = users.length > 0 ? users[users.length - 1]["id"] + 1 : 1;
    const newUser = { id: id, ...body };
    users.push(newUser);
    fs.writeFileSync("./dataBase.json", JSON.stringify(users));
    return res.status(201).json({ message: "User added successfully." });
  }
  return res.status(400).json({ message: "Email already exists" });
});

app.patch("/user/:id", (req, res) => {
  const id = Number(req.params["id"]);
  const data = req.body;
  const target = users.find((obj) => obj["id"] === id);
  if (target) {
    let keys = [];
    for (let key in data) {
      if (data[key] !== target[key]) {
        target[key] = data[key];
        keys.push(key);
      }
    }
    fs.writeFileSync("./dataBase.json", JSON.stringify(users));
    return res.json({
      message: `User ${keys.length === 1 ? keys[0] : `properties ( ${keys.join(", ")} ) are`} updated successfully`,
    });
  } else {
    return res.json({ message: "User Id not found" });
  }
});

app.delete("/user{/:id}", (req, res) => {
  const id = Number(req.params?.id) || Number(req.body?.id) || -1;
  const target = users.findIndex((obj) => obj["id"] === id);
  if (target !== -1 && id !== -1) {
    users.splice(target, 1);
    fs.writeFileSync("./dataBase.json", JSON.stringify(users));
    return res.json({ message: "User deleted successfully" });
  } else {
    return res.status(400).json({ message: "User Id not found" });
  }
});
// API Get filter Minmum Age
app.get("/user/filter", (req, res) => {
  const minAge = Number(req.query["minAge"]);
  if (minAge) {
    const filterUsers = users.filter((user) => user["age"] >= minAge);
    if (filterUsers.length === 0) {
      return res.status(400).json({ message: "no User found" });
    }
    return res.json(filterUsers);
  }
});
// API Get User By His Name
app.get("/user/getByName", (req, res) => {
  const name = req.query["name"];
  if (name) {
    const targetUser = users.findIndex((user) => user["name"] === name);
    if (targetUser === -1) {
      return res.status(400).json({ message: "User Name Not Found" });
    }
    return res.json(users[targetUser]);
  }
});
// API Get User By His Id
app.get("/user{/:id}", (req, res) => {
  const userId = req.params["id"];
  if (!userId) {
    return res.json(users);
  }
  const userTarget = users.findIndex((obj) => obj["id"] === Number(userId));
  if (userTarget !== -1) {
    return res.json(users[userTarget]);
  } else {
    return res.status(400).json({
      message: "User not found.",
    });
  }
});
const server = app.listen(3000, () => {});
// server.close(() => {});
