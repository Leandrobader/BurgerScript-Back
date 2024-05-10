const UserModel=require('../models/userModel')
const bcrypt = require('bcrypt');
const helpers=require('../utils/helpersFunctions');
const jwt=require("jsonwebtoken");

class UserController{
    
    async CreateAdmin(name, username, email, password){
        try {
            if (!helpers.validateName(name)) {
                throw new Error('El nombre debe tener entre 4 y 20 caracteres')
            }

            if(!helpers.validateUsername(username)){
                throw new Error('El nombre de usuario debe tener entre 4 y 10 caracteres')
            }

            if (!helpers.validateEmail(email)) {
                throw new Error("Formato email invalido")
            }

            if(!helpers.validatePassword(password)) throw new Error("Formato password incorrecto");

            const SALT=parseInt(process.env.BCRYPT_SALT);
            const hash=await bcrypt.hash(password, SALT);
            const newUser=new UserModel({
                name:name,
                username:username,
                email:email,
                password:hash,
                role:"Admin"
            });

            const savedUser=await newUser.save();
            return savedUser;
        } catch (error) {
            throw error;
        }
    };

    async CreateUser(name, username, email, password){
        try {
            if (!helpers.validateName(name)) {
                throw new Error('El nombre debe tener entre 4 y 20 caracteres')
            }

            if(!helpers.validateUsername(username)){
                throw new Error('El formato de nombre de usuario no coinicide')
            }

            if (!helpers.validateEmail(email)) {
                throw new Error("Formato email invalido")
            }

            if(!helpers.validatePassword(password)) throw new Error("Formato password incorrecto");

            const SALT=parseInt(process.env.BCRYPT_SALT);
            const hash=await bcrypt.hash(password, SALT);
            const newUser=new UserModel({
                name:name,
                username,
                email:email,
                password:hash,
                role:"User"
            });

            const savedUser=await newUser.save();
            return savedUser;
        } catch (error) {
            throw error;
        }
    };

    async Login(req, res){
        try {
            const body=req.body

            if(body.email === "" || body.email===undefined){
                throw new Error("Debe enviar un email")
            }
            if(body.password === "" || body.password===undefined){
                throw new Error("Debe enviar un password")
            }

            const user = await UserModel.findOne({email:body.email});

            if(user===null){
                return res.status(404).json({message: "Email y/o password incorrecto"})
            }

            const compare=await bcrypt.compare(body.password, user.password)

            if(!compare){
                return res.status(404).json({message: "Email y/o password incorrecto"})
            }

            const token=jwt.sign({
                _id:user._id,
                role:user.role
            }, process.env.SECRET_KEY, {expiresIn:"1D"})

            return res.status(200).json({email:user.email, role:user.role, token:token, username:user.username});
        } catch (error) {
            throw error
        }
    }

    async DeleteUserById(id){
        try {
            const deletedUser=await UserModel.findByIdAndDelete(id);
            return deletedUser;
        } catch (error) {
            throw error
        }
    };

    async ShowAllUsers() {
        try {
            const users = await UserModel.find().select("-password");
            return users;
        } catch (error) {
            throw error;
        }
    }


    
};

module.exports=UserController;