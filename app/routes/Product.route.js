module.exports = app => {
  const products = require("../controllers/Product.controller.js");
  app.post("/products", products.create);
  app.get("/products", products.findAll);
  app.get("/products/categories/", products.findAllCategories);
  app.get("/products/categories/:categoryName", products.findProductsByCategory);
  app.get("/products/categories/:categoryName/subcategories", products.findSubcategoriesByCategory);
  app.get("/products/subcategories/", products.findAllSubcategories);
  app.get("/products/subcategories/:subCategoryName", products.findProductsBySubcategory);
  app.get("/products/:productId", products.findOne);
  app.put("/products/:productId", products.update);
  app.delete("/products/:productId", products.delete);
};
