module.exports = app => {
  const products = require("../controllers/Product.controller.js");
  // app.post("/products", products.create);
  app.get("/products", products.findAll);
  app.get("/products/:productId", products.findOne);
  // app.put("/products/:productId", products.update);
  // app.delete("/products/:productId", products.delete);
};
