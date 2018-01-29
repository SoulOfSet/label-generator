var $tableBody;
var numPages;
var numPerPage;
var currPage;

$( document ).ready(function() {
    $tableBody = $('#items-table').find("tbody");
    $(".loader").show();
    getItems(10, 0, "lTitle");
});


var checkNullUndef = function(value){
    return value == null || value === undefined ? ""  : value;
};

var updateTable = function(data, count){
    console.log(count);
    $tableBody.empty();
    $.each(data, function(index, item){
        $tableBody.append("<tr>" +
            "<td><input type='checkbox'/>&nbsp;</td>" +
            "<td>" + item.lBoldTitle + "</td>" +
            "<td>" + item.lTitle + "</td>" +
            "<td>" + item.lPrice + "</td>" +
            "<td>" + item.lIngredients + "</td>" +
            "<td>" + checkNullUndef(item.lUsedBy) + "</td>" +
            "<td>" + item.lPLU + "</td>" +
            "<td>" + checkNullUndef(item.lNumRequired) + "</td>")
    });
    $(".loader").hide();
};

var getItems = function(number, offset, sortField){

    $.get("/items/get_items", {number: number, offset: offset, sortField: sortField}, function(data){
        updateTable(data.items, data.count);
        numPages = Math.ceil(data.count/number);
        numPerPage = number;
    })
};


