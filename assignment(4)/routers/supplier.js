const express = require("express");
const router = express.Router();
const db = require("../config_db");

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const [result] = await db.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = DATABASE()`,
      ["supplier"],
    );
    let properties = [];
    for await (let obj of result) {
      const name = obj["COLUMN_NAME"];
      if (name === "id") continue;
      properties.push(name);
    }
    if (Object.keys(body).length !== properties.length) {
      return res.status(400).json({
        success: false,
        message: `product doesn't added because the you have this field {${properties.join(", ")}} and you send this {${Object.keys(body).join(", ")}}`,
      });
    }
    let prametars = properties.map(() => "?").join(", ");
    let query = `INSERT INTO supplier (${properties.join(", ")}) VALUES(${prametars})`;
    let values = properties.map((item) => body[item]);
    const [status] = await db.execute(query, values);
    if (status.affectedRows > 0) {
      return res.json({
        success: true,
        message: "product added successfully",
      });
    }
  } catch (error) {
    if (error.errno === 1062) {
      return res.json({
        success: false,
        message: "there is supplier's number here",
      });
    }
    res.status(500).json({ massage: "there is a problem in the server" });
  }
});
router.get("/byName", async (req, res) => {
  try {
    let { Name } = req.query;
    Name = `${Name.toLowerCase()}%`;
    const [rows] = await db.execute(
      `SELECT * FROM supplier where LOWER(name) like LOWER(?)`,
      [Name],
    );
    if (rows.length) {
      return res.json({ success: true, data: rows });
    }
  } catch (err) {
    return res.json({
      success: false,
      message: "there is something worrng in the server " + err,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const [result] = await db.execute(`SELECT * FROM supplier`);
    if (result.length) {
      return res.json({
        success: true,
        message: "data fetching",
        data: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "suppliers not found",
      });
    }
  } catch {
    res.status(500).json({ massage: "there is a problem in the server" });
  }
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [row] = await db.execute("SELECT * FROM supplier WHERE id = ? ", [
      id,
    ]);
    if (!row.length) {
      return res.status(400).json({
        success: false,
        message: `there is no id -> (${id})`,
      });
    }
    const body = req.body;
    const [result] = await db.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = DATABASE()`,
      ["supplier"],
    );
    let properties = [];
    for await (let obj of result) {
      const name = obj["COLUMN_NAME"];
      if (name === "id") continue;
      properties.push(name);
    }
    const traget_properties = Object.keys(body);
    traget_properties.map((pro) => {
      if (!properties.includes(pro)) {
        return res.status(400).json({
          success: false,
          message: `there is no column name (${pro}) like you send`,
        });
      }
    });
    let query = `UPDATE supplier SET ${traget_properties.join(" = ? , ")} = ?  WHERE id = ?`;
    let values = Object.values(body);
    values.push(id);
    const [status] = await db.execute(query, values);
    if (status.affectedRows > 0) {
      return res.json({
        success: true,
        message: "supplier updated successfully",
      });
    }
  } catch (error) {
    if (error.errno === 1062) {
      return res.json({
        success: false,
        message: "there is supplier's number exists",
      });
    }
    res.status(500).json({ massage: "there is a problem in the server" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute(`DELETE FROM supplier WHERE id = ?`, [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    } else {
      return res.json({
        success: true,
        message: "Product Delete",
      });
    }
  } catch {
    return res.status(500).json({
      success: false,
      message: `there is a problem in the server`,
    });
  }
});
module.exports = router;
