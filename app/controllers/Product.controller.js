const Product = require("../models/Product.model.js");

exports.create = (req, res) => {
  if (Object.entries(req.body).length === 0 && obj.constructor === Object) {
    return res.status(400).send({
      message: "Product content can not be empty"
    });
  }

  const product = new Product({
    UPC14: req.body.UPC14,
    UPC12: req.body.UPC12,
    Brand: req.body.Brand,
    ProductName: req.body.ProductName,
    Category: req.body.Category,
    SubCategory: req.body.SubCategory
  });

  product
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

exports.findAll = (req, res) => {
  Product.find()
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products."
      });
    });
};

exports.findOne = (req, res) => {
  Product.findById(req.params.productId)
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      res.send(product);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      return res.status(500).send({
        message: "Error retrieving product with id " + req.params.productId
      });
    });
};

exports.update = (req, res) => {
  if (Object.entries(req.body).length === 0 && obj.constructor === Object) {
    return res.status(400).send({
      message: "Product content can not be empty"
    });
  }

  Product.findByIdAndUpdate(
    req.params.productId,
    {
      UPC14: req.body.UPC14,
      UPC12: req.body.UPC12,
      Brand: req.body.Brand,
      ProductName: req.body.ProductName,
      Category: req.body.Category,
      SubCategory: req.body.SubCategory
    },
    { new: true }
  )
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      res.send(product);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      return res.status(500).send({
        message: "Error updating product with id " + req.params.productId
      });
    });
};

exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.productId)
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      res.send({ message: "Product deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id " + req.params.productId
      });
    });
};
