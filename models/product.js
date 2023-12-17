const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const productSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    composicion: {
        type: String,
        required: true
    },
    talles: {
        type: Array,
        required: true,
    },
    imageOneUrl:{
        type: String,
        required: true
    },
    imageTwoUrl:{
        type: String,
        required: true
    },
    imageThreeUrl:{
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;