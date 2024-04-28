const ProductController = require('../controllers/productController');
const Auth = require('../utils/middlewares/auth');

const ProductRoutes = (base, app) => {
 const productController = new ProductController();

 app.post(`${base}/new-product`, Auth.isAuthenticated, Auth.isAdmin ,async(req, res, next)=>{
     try {
         const {title, description, image, price, category, stock}=req.body;
         await productController.Create(title, description, image, price, category, stock);
         return res.status(201).json({message: "Producto creado correctamente"});
     } catch (error) {
         console.error("Error al crear un nuevo producto: ", error);
         return res.status(500).json({message:"Se ha producido un error al intentar crear el producto"})
     }
 });

 app.put(`${base}/update-product/:id`, Auth.isAuthenticated, Auth.isAdmin, async(req, res, next)=>{
     try {
         const productId = req.params.id || "";
         const {title, description, image, price, category, stock}=req.body;
         await productController.UpdateProductById(productId, title, description, image, price, category, stock);
         return res.status(200).json({message: "Producto actualizado correctamente"});
     } catch (error) {
         console.error("Error al actualizar el producto: ", error);
         return res.status(500).json({message:"Se ha producido un error al intentar actualizar el producto"})
     }
 });

 app.delete(`${base}/delete-product/:id`, Auth.isAuthenticated, Auth.isAdmin, async(req, res, next)=>{
     try {
         const productId = req.params.id || "";
         await productController.DeleteProductById(productId);
         return res.status(200).json({message: "Producto eliminado correctamente"});
     } catch (error) {
         console.error("Error al eliminar el producto: ", error);
         return res.status(500).json({message:"Se ha producido un error al intentar eliminar el producto"})
     }
 });

 app.post(`${base}/get-product/:id`, Auth.isAuthenticated,async(req, res, next)=>{
    try {
        const productId = req.params.id || "";
        const product = await productController.ShowProductById(productId);
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error al obtener el producto: ", error);
        return res.status(500).json({message:"Se ha producido un error al intentar obtener el producto"})
    }
 });

 app.get(`${base}/get-products`, async(req, res, next)=>{
    try {
        const products = await productController.ShowAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error al obtener los productos: ", error);
        return res.status(500).json({message:"Se ha producido un error al intentar obtener los productos"})
    }
 });

 app.get(`${base}/get-products-by-category/:category`, async(req, res, next)=>{
    try {
        const category = req.params.category || "";
        const products = await productController.FindProductsByCategory(category);
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error al obtener los productos: ", error);
        return res.status(500).json({message:"Se ha producido un error al intentar obtener los productos"})
    }
 });

 app.get(`${base}/get-products-by-title/:title`, async(req, res, next)=>{
    try {
        const title = req.params.title || "";
        const products = await productController.FindProductsByTitle(title);
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error al obtener los productos: ", error);
        return res.status(500).json({message:"Se ha producido un error al intentar obtener los productos"})
    }
 });

 app.get(`${base}/get-products-by-attributes/:title?/:category?`, async(req, res, next)=>{
    try {
        const title = req.params.title || "";
        const category = req.params.category || "";
        const products = await productController.FindProductsByTitleAndCategory(title, category);
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error al obtener los productos: ", error);
        return res.status(500).json({message:"Se ha producido un error al intentar obtener los productos"})
    }
 });
}

module.exports = ProductRoutes;