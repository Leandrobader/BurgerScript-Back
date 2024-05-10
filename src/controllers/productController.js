const productModel = require('../models/productModel');
const helpers = require('../utils/helpersFunctions');

class ProductController {
    async Create(title, description, image, price, category, stock, distinguish) {
        try {
            if (!helpers.validateTitle(title)) {
                throw new Error('El titulo debe tener entre 4 y 20 caracteres')
            }

            if (!helpers.validateDescription(description)) {
                throw new Error('La descripcion debe tener entre 4 y 200 caracteres')
            }

            if (!helpers.validateImage(image)) {
                throw new Error('La imagen no es valida')
            }

            if (!helpers.validatePrice(price)) {
                throw new Error('El precio no es valido')
            }

            if (!helpers.validateCategory(category)) {
                throw new Error('La categoria no es valida')
            }

            if (!helpers.validateStock(stock)) {
                throw new Error('El stock no es valido')
            }

            if(!helpers.validateDistinguish(distinguish)){
                throw new Error('El valor no es valido')
            }

            const newProduct = new productModel({
                title,
                description,
                image,
                price,
                category,
                stock,
                distinguish
            });

            const savedProduct = await newProduct.save();
            return savedProduct;
        } catch (error) {
            throw error;
        }
    }

    async UpdateProductById(productId, title, description, image, price, category, stock, controlStock, distinguish) {
        try {
            if (!helpers.validateTitle(title)) {
                throw new Error('El titulo debe tener entre 4 y 20 caracteres')
            }

            if (!helpers.validateDescription(description)) {
                throw new Error('La descripcion debe tener entre 4 y 200 caracteres')
            }

            if (!helpers.validateImage(image)) {
                throw new Error('La imagen no es valida')
            }

            if (!helpers.validatePrice(price)) {
                throw new Error('El precio no es valido')
            }

            if (!helpers.validateCategory(category)) {
                throw new Error('La categoria no es valida')
            }

            if (!helpers.validateStock(stock)) {
                throw new Error('El stock no es valido')
            }

            if(!helpers.validateDistinguish(distinguish)){
                throw new Error('El valor no es valido')
            }
            

            const updatedProduct = await productModel.findByIdAndUpdate(productId, {
                title,
                description,
                image,
                price,
                category,
                stock,
                controlStock,
                distinguish,
            }, { new: true });

            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    async DeleteProductById(productId) {
        if (!productId) {
            throw new Error('El id del producto es requerido');
        }
        try {
            const deletedProduct = await productModel.findByIdAndDelete(productId);
            return deletedProduct;
        } catch (error) {
            throw error;
        }
    }

    async ShowAllProducts(search) {
        try {
            let finalResponse = [];
            let query = {};
            if (search !== undefined) {
                query["title"]={$regex:search, $options:"i"}
            }

            finalResponse= await productModel.find(query)
            return finalResponse;
        } catch (error) {
            throw error;
        }
    }

    async ShowProductById(productId) {
        if (!productId) {
            throw new Error('El id del producto es requerido');
        }
        try {
            const product = await productModel.findById(productId);
            return product;
        } catch (error) {
            throw error;
        }
    }
    
    async FindProductsByCategory(category){
        if (!category && category !== 'Carne' && category !== 'Pollo' && category !== 'Vegetarianas') {
            throw new Error('La categoria es requerida');
        }
        try {
            const products = await productModel.find({ category: { $regex: category, $options: 'i' } });

            return products;
        } catch (error) {
            throw error;
        }
    }

    async FindProductsByTitle(title){
        if (!title) {
            throw new Error('El titulo es requerido');
        }
        try {
            const products = await productModel.find({ title: { $regex: title, $options: 'i' } });
            return products;
        } catch (error) {
            throw error;
        }
    }

    async FindProductsByTitleAndCategory(title, category){
        try {
            const products = await productModel.find({
                $and: [
                    { title: { $regex: title, $options: 'i' } },
                    { category: { $regex: category, $options: 'i' } }
                ]
            });
            return products;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = ProductController;