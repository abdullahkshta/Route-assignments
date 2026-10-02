const express = require("express");
const router = express.Router();
const db = require("../config_db");

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const { name, price, brand, stock_qty } = body;
    const [result] = await db.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = DATABASE()`,
      ["product"],
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
    const [supplierID] = await db.execute(
      "SELECT sup.id FROM supplier sup WHERE id = ?",
      [body["supplier_Id"]],
    );
    if (!supplierID.length) {
      return res.status(400).json({
        success: false,
        message: "there is no supplier_id",
      });
    }
    const [rows] = await db.execute(
      `SELECT * FROM product WHERE LOWER(name) = LOWER(?) AND price = ? AND LOWER(brand) = LOWER(?)`,
      [name, price, brand],
    );
    if (rows.length) {
      const UP_status = await db.execute(
        `UPDATE product SET stock_qty = (product.stock_qty + ${stock_qty}) WHERE id = ? `,
        [rows[0]["id"]],
      );
      return res.json({
        success: true,
        message: "The quantity is updated because this product is exist",
      });
    }

    let prametars = properties.map(() => "?").join(", ");
    let query = `INSERT INTO product (${properties.join(", ")}) VALUES(${prametars})`;
    let values = properties.map((item) => body[item]);
    const [status] = await db.execute(query, values);
    if (status.affectedRows > 0) {
      return res.json({
        success: true,
        message: "product added successfully",
      });
    }
  } catch {
    return res.status(500).json({
      success: false,
      message: `there is a problem in the server`,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    if (body["supplier_Id"]) {
      const [supplierID] = await db.execute(
        "SELECT sup.id FROM supplier sup WHERE id = ?",
        [body["supplier_Id"]],
      );
      if (!supplierID.length) {
        return res.status(400).json({
          success: false,
          message: "there is no supplier_id like you send",
        });
      }
    }

    const [result] = await db.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = DATABASE()`,
      ["product"],
    );
    let properties = [];
    for await (let obj of result) {
      const name = obj["COLUMN_NAME"];
      if (name === "id") continue;
      properties.push(name);
    }
    console.log(properties);
    const traget_properties = Object.keys(body);
    traget_properties.map((pro) => {
      if (!properties.includes(pro)) {
        return res.status(400).json({
          success: false,
          message: `there is no column name (${pro}) like you send`,
        });
      }
    });
    let query = `UPDATE product SET ${traget_properties.join(" = ? , ")} = ?  WHERE id = ?`;
    let values = Object.values(body);
    values.push(id);
    const [status] = await db.execute(query, values);
    if (status.affectedRows > 0) {
      return res.json({
        success: true,
        message: "product updated successfully",
      });
    }
  } catch {
    return res.status(500).json({
      success: false,
      message: `there is a problem in the server`,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute(`DELETE FROM product WHERE id = ?`, [id]);
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
router.get("/highStock", async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id AS product_id, name AS product_name, stock_qty AS stock FROM product ORDER BY stock_qty DESC LIMIT 1`,
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
router.get("/neverSold", async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id AS product_id , name AS product_name, stock_qty As stock FROM product p WHERE id NOT IN (SElECT product_id FROM sales)`,
    );
    res.send(rows);
  } catch (err) {
    return res.json({
      success: false,
      message: "there is something worrng in the server " + err,
    });
  }
});
router.get("/{:id}", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const [result] = await db.execute(`SELECT * FROM product where id = ?`, [
        id,
      ]);
      if (result.length) {
        return res.json(result);
      } else {
        return res.status(400).json({ massage: "There is no Id product" });
      }
    }
    const [result] = await db.execute("SELECT * FROM product");
    if (result.length) {
      return res.json(result);
    } else {
      return res.status(400).json({ massage: "There is no product" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ massage: "there is a problem in the server" });
  }
});

module.exports = router;
