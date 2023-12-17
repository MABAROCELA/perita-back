const express = require('express');
const productRouter = express.Router();
const { 
    getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productControllers');


productRouter.get('/', getProducts);
productRouter.post('/newProduct', createProduct);
productRouter.put('/edit/:productId', updateProduct);
productRouter.delete('/delete/:productId',deleteProduct);

module.exports = productRouter;