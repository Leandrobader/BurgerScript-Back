const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    title:{
        type: String,
        required: true, 
        unique: true, 
        trim: true
    },

    description:{
        type: String,
        required: true,
        trim: true
    },

    image :{
        type: String,
        required: true,
        trim: true
    },

    price:{
        type: Number,
        required: true,
        min: 0
    },

    category:{
        type: String,
        required: true, 
        enum: ['Carne', 'Pollo', 'Vegetarianas']
    },

    stock:{
        type: Number,
        required: true,
        min: 0
    },

    controlStock:{
        timestamp:{
            type: Date,
            default: Date.now
        }
    },

    distinguish:{
        type: String,
        required: true,
    }
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;