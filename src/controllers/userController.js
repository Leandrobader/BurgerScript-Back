const UserModel=require('../models/userModel')
const bcrypt = require('bcrypt');
const helpers=require('../utils/helpersFunctions');

class UserController{
    
    async CreateAdmin(name, username, email, password){
        try {
            if (!helpers.validateName(name)) {
                throw new Error('El nombre debe tener entre 4 y 20 caracteres')
            }

            if(!helpers.validateUsername(username)){
                throw new Error('El nombre de usuario debe tener entre 4 y 10 caracteres')
            }

            if (!helpers.ValidateEmail(email)) {
                throw new Error("Formato email invalido")
            }

            if(!helpers.ValidatePassword(password)) throw new Error("Formato password incorrecto");

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

    async DeleteUserById(id){
        try {
            const deletedUser=await UserModel.findByIdAndDelete(id);
            return deletedUser;
        } catch (error) {
            throw error
        }
    }

    
};

module.exports=UserController;