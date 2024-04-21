const UserController = require('../controllers/userController');
const Auth = require('../utils/middlewares/auth');

const UserRoutes = (base, app) => {
    const userController = new UserController();
    
    app.post(`${base}/new-admin`, async(req, res, next)=>{
        try {
            const {name, username, email, password}=req.body;
            await userController.CreateAdmin(name, username, email, password);
            return res.status(201).json({message: "Usuario creado exitosamente"});
        } catch (error) {
            console.error("Error al crear un nuevo usuario: ", error);
            if (error.code === 11000) {
                return res.status(400).json({message: "El nombre de usuario o correo ya existe"})
            }
            return res.status(500).json({message:"Se ha producido un error al intentar crear el usuario"})
        }
    });

    app.post(`${base}/new-user`, Auth.isAuthenticated, Auth.isAdmin, async(req, res, next)=>{
        try {
            const {name, username, email, password}=req.body;
            await userController.CreateUser(name, username, email, password);
            return res.status(201).json({message: "Usuario creado correctamente"});
        } catch (error) {
            console.error("Error al crear un nuevo usuario: ", error);
            return res.status(500).json({message:"Se ha producido un error al intentar crear el usuario"})
        }
    });

    app.delete(`${base}/delete-user/:id`, async(req, res, next)=>{
        try {
            const userId = req.params.id;
            await userController.DeleteUserById(userId);
            return res.status(200).json({message: "Usuario eliminado correctamente"});
        } catch (error) {
            console.error("Error al eliminar el usuario: ", error);
            return res.status(500).json({message:"Se ha producido un error al intentar eliminar el usuario"})
        }
    });     

    // app.post(`${base}/login`, async(req, res, next)=>{
    //     try {
    //         const response=await userController.Login(req, res);
    //         return response;
    //     } catch (error) {
    //         next(error);
    //     }
    // })

}

module.exports = UserRoutes;