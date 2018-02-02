var itemsModel = require("../models/items.model");



var itemsData = new itemsModel();

/**
 * This function pulls in all registration data from the client, validates it,
 * and commits a user to the db if there are no errors. Once the process is over
 * the passed callback function is ran
 *
**/
exports.getItemData = function(query, callback) {
    var errorData = null;

    if(!query.number) {
        errorData = "number";
    } else if(!query.sortField){
        errorData = "sortField";
    } else if(!query.offset){
        errorData = "offset";
    }

    if(errorData){
        callback({status: false, message:"Missing field: " + errorData});
    } else{
        if(query.query !== null || query.query !== undefined){
            itemsData.getItemsByTitle(parseInt(query.number), query.sortField, parseInt(query.offset), query.query, null,
                                  function(err, count, items){
                if(err){
                    callback({status: false, message: err});
                    console.log("Unable to retrieve items: " + err);
                    callback({status: false, message:"Unable to retrieve items: " + err});
                } else{
                    data = {count: count, items: items};
                    callback({status: true}, data);
                }
            });
        }
        else{
            itemsData.getItems(parseInt(query.number), query.sortField, parseInt(query.offset), function(err, count, items){
                if(err){
                    callback({status: false, message: err});
                    console.log("Unable to retrieve items: " + err);
                    callback({status: false, message:"Unable to retrieve items: " + err});
                } else{
                    data = {count: count, items: items};
                    callback({status: true}, data);
                }
            });
        }

    }
};

exports.addItem = function(itemData, callback){
    item = new itemsModel();
    item.lBoldTitle = itemData.boldTitle;
    item.lTitle = itemData.title;
    item.lPrice = itemData.price;
    item.lIngredients = itemData.ingredients;
    item.lUsedBy = itemData.usedBy;
    item.lPLU = itemData.PLU;

    itemsData.addItem(item, function(err, item){
        if(err){
            console.log("Unable to add item: " + err);
            callback({status: false, message: err});
        } else{
            callback({status: true}, item);
        }
    });
};

exports.deleteItems = function(itemIDs, callback){
    itemsData.deleteItems(itemIDs, function(err) {
        if(err){
            callback({status: false, message: err});
        } else{
            callback({status: true});
        }
    });
};