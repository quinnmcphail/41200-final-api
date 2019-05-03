const mongoose = require("mongoose");
const Product = require("./Product.model.js");
const ProductSchema = mongoose.model("Product").schema;

const ListSchema = mongoose.Schema(
    {
        uuid: String,
        stores: [{
                name: String,
                place_id: String,
                products: [
                    ProductSchema
                ]
            }
        ],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("List", ListSchema, "Lists");
