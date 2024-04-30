const regexEmail= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPassword= /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;
const regexUsername= /^[a-zA-Z0-9_]{4,20}$/;

// const regexUrl = /((([A-Za-z]{3,9}:(?://)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:/[+~%/.\w-]*)???(?:[-+=&;%@.\w])#?(?:[\w]))?)/;


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
    if(str.length>=4 && str.length<=400){
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
     if (typeof str === 'string') {
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