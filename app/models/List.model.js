const mongoose = require("mongoose");
const Product = require("./Product.model.js");
const ProductSchema = mongoose.model("Product").schema;

const ListSchema = mongoose.Schema(
    {
        uuid: String,
        stores: {
            place_id:{
                name: String,
                products: [
                    ProductSchema
                ]
            }
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("List", ListSchema, "Lists");
