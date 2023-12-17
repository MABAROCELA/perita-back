const Product = require('../models/product');


//OBTENER LISTA DE PRODUCTOS (READ)
const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json({
        products: products
    });
    console.log('Lista de productos obtenido exitosamente');
};

// CREAR PRODUCTO (CREATE)
const createProduct = async (req, res) => {
    try {
        const { nombre, precio, descripcion, composicion, talles, imageOneUrl, imageTwoUrl, imageThreeUrl } = req.body;
        console.log(req.body);

        const product = new Product({
            nombre,
            precio,
            descripcion,
            composicion,
            talles,
            imageOneUrl,
            imageTwoUrl,
            imageThreeUrl
        });

        await Product.create(product);

        res.status(201).json({ message: 'Producto creado exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error al crear el producto'
        });
    };
};

// ACTUALIZAR PRODUCTO (UPDATE)
const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const { nombre, precio, descripcion, composicion, talles, imageOneUrl, imageTwoUrl, imageThreeUrl } = req.body;

    try {
        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        };

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                nombre,
                precio,
                descripcion,
                composicion,
                talles,
                imageOneUrl,
                imageTwoUrl,
                imageThreeUrl
            },
            { new: true }
        );

        if (updatedProduct) {
            res.json({ success: true, message: 'Producto actualizado exitosamente', product: updatedProduct });
        } else {
            res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};


// ELIMINAR PRODUCTO (DELETE)
const deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (deletedProduct) {
            res.json({ success: true, message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

//BUSCAR PRODUCTO POR ID

const findProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    findProductById
};