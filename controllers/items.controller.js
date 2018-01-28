var itemsModel = require("../models/items.model");
var mongoose = require('mongoose');
var itemsSchema = require('../models/items.model').schema;


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
        itemsData.getProducts(parseInt(query.number), query.sortField, parseInt(query.offset), function(err, items){
            if(err){
                console.log("Unable to retrieve items: " + err);
                callback({status: false, message:"Unable to retrieve items: " + err});
            } else{
                callback({status: true}, items);
            }
        })
    }


};