function isInt(input){
    if(input % 1 === 0){
        return true;
    }
    else{
        return false;
    }
}

function isNumeric(input){
    if(Number(input) === jsonObject.price){
        return true;
    }
    else{
        return false;
    }
}

function product(jsonObject){
    // if spaghetti
    if (jsonObject.productName.length > 25){
        return `productName is too long: maximum 25 characters; got ${jsonObject.productName.length} characters`;
    }
    else if(jsonObject.productName.length < 6){
        return `productName is too short: minimum 6 characters; got ${jsonObject.productName.length} characters`;
    }

    if (jsonObject.productDesciption.length > 100){
        return `productDesction is too long: maximum 100 characters; got ${jsonObject.productDescription.length} characters`;
    }

    if (jsonObject.productImage.length > 30){
        return `productDesction is too long: maximum 30 characters; got ${jsonObject.productImage.length} characters.`;
    }

    if(jsonObject.subCatagoryId = null){
        return `subCatagoryId cannot be null; got ${jsonObject.subCatagoryId}.`;
    }
    else if(!isInt(jsonObject.subCatagoryId)){
        return `subCatagoryId is not int; got ${jsonObject.subCatagoryId}.`;
    }
    else if(jsonObject.subCatagoryId < 1){
        return `reviewScore too small; minimum 1 got ${jsonObject.reviewScore}.`;
    }

    if(jsonObject.price = null){
        return `price cannot be null; got ${jsonObject.price}.`;
    }
    else if(!isNumeric(jsonObject.price)){
        return `price is not a float; got ${jsonObject.price}.`;
    }

    if(!isInt(jsonObject.discountPercent) && jsonObject.discountPercent != null){
        return `discountPercent is not int; got ${jsonObject.discountPercent}.`;
    }    

    if(!isNumeric(jsonObject.discountPrice)){
        return `discountPrice is not a float; got ${jsonObject.discountPrice}.`;
    }

    if(!isInt(jsonObject.reviewScore) && jsonObject.reviewScore != null){
        return `reviewScore is not int; got ${jsonObject.reviewScore}.`;
    }
    else if(jsonObject.reviewScore > 100){
        return `reviewScore too large, maximum 100; got ${jsonObject.reviewScore}.`;
    }
    else if(jsonObject.reviewScore < 0){
        return `reviewScore too small, minimum 0; got ${jsonObject.reviewScore}.`;
    }

    if(!isInt(jsonObject.stock) && jsonObject.stock != null){
        return `reviewScore is not int; got ${jsonObject.reviewScore}.`;
    } 
    else if (jsonObject.stock < 0){
        return `stock too small, minimum 0; got ${jsonObject.stock}.`;
    }
    
}   




function login(){

};