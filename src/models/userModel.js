const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },

    username:{
        type: String,
        required: [true, 'Por favor ingrese un nombre de usuario'],
        unique: true,
        trim: true
    },

    email:{
        type: String,
        required: true, 
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Por favor ingrese un correo valido']
    },

    password:{
        type: String,
        required: [true, 'La contraseña es requerida.']
    },

    role:{
        type: String,
        required: [true, 'El rol es requerido.']
    }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;