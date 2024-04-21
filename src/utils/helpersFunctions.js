const regexEmail= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPassword= /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
const regexUsername= /^[a-zA-Z0-9_]{4,20}$/;

const regexUrl = /^(http|https):\/\/([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}|(1?\d?\d|2[0-4]\d|25[0-5])\.(1?\d?\d|2[0-4]\d|25[0-5])\.(1?\d?\d|2[0-4]\d|25[0-5])\.(1?\d?\d|2[0-4]\d|25[0-5]))(:[0-9]{1,5})?(\/.*)?$/i;


function validateEmail(email){
    return regexEmail.test(email);
}

function validatePassword(password){
    return regexPassword.test(password);
}

function validateUsername(username){
   return regexUsername.test(username)
}

function validateName(name){
    if (name.length > 4 && name.length <= 20) {
        return true
    } else {
        return false
    }
}

function validateTitle(title){
    if(title.length>=4 && title.length<=20){
        return true
    }else{
        return false
    }
}
function validateDescription(str){
    if(str.length>=4 && str.length<=200){
        return true
    }else{
        return false
    }
}
function validateCategory(str){
    if(str === 'Carne' || str === 'Pollo' || str === 'Vegetarianas'){
        return true;
    }else{
        return false;
    }
}

function validateImage(str){    
     if (typeof str === 'string' && regexUrl.test(str)) {
        return true;
    } else {
        return false;
    }
}

function validatePrice(price){
    if(typeof price === 'number' && price >= 0){
        return true;
    }else{
        return false;
    }
}

function validateStock(stock){
    if(typeof stock === 'number' && stock >= 0){
        return true;
    }else{
        return false;
    }
}

module.exports={validateName, validateUsername, validateEmail, validatePassword, validateTitle, validateDescription, validateCategory, validateImage, validatePrice, validateStock}