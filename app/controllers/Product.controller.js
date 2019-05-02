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
  Product.find().limit(50)
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

exports.findAllCategories = (req, res) => {
  Product.aggregate([
    {
      '$project': {
        'Category': 1
      }
    }, {
      '$group': {
        '_id': '$Category'
      }
    }, {
      '$group': {
        '_id': '1',
        'categories': {
          '$addToSet': '$_id'
        }
      }
    }, {
      '$project': {
        '_id': 0
      }
    }
  ]).then(categories => {
    res.send(categories[0]);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the Categories."
      });
    });
};

exports.findAllSubcategories = (req, res) => {
  Product.aggregate([
    {
      '$project': {
        'SubCategory': 1
      }
    }, {
      '$group': {
        '_id': '$SubCategory'
      }
    }, {
      '$group': {
        '_id': '1',
        'subcategories': {
          '$addToSet': '$_id'
        }
      }
    }, {
      '$project': {
        '_id': 0
      }
    }
  ]).then(subcategories => {
    res.send(subcategories[0]);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the Subcategories."
      });
    });
}

exports.findProductsByCategory = (req, res) => {
  Product.where('Category').equals(req.params.categoryName).limit(50).then((products) => {
    res.send(products);
  }).catch(err => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Products not found with category " + req.params.categoryName
      });
    }
    return res.status(500).send({
      message: "Error gettings products with category " + req.params.categoryName
    });
  });
}

exports.findProductsBySubcategory = (req, res) => {
  Product.where('SubCategory').equals(req.params.subCategoryName).limit(50).then((products) => {
    res.send(products);
  }).catch(err => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Products not found with subcategory " + req.params.subCategoryName
      });
    }
    return res.status(500).send({
      message: "Error gettings products with subcategory " + req.params.subCategoryName
    });
  });
}

exports.findSubcategoriesByCategory = (req, res) => {
  Product.aggregate([
    {
      '$match': {
        'Category': req.params.categoryName
      }
    },
    {
      '$project': {
        'SubCategory': 1
      }
    }, {
      '$group': {
        '_id': '$SubCategory'
      }
    }, {
      '$group': {
        '_id': '1',
        'subcategories': {
          '$addToSet': '$_id'
        }
      }
    }, {
      '$project': {
        '_id': 0
      }
    }
  ]).then(subcategories => {
    res.send(subcategories[0]);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while getting the Subcategories."
      });
    });
}
