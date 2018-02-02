var $tableBody;
var numPages;
var numPerPage = 10;
var currPage = 1;

$( document ).ready(function() {

    $(window).keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    $tableBody = $('#items-table').find("tbody");
    $(".loader").show();
    getItems(10, 0, "lTitle", null);

    $("#items-table").on('click', '#item-print', function () {
        var $row = $(this).closest("tr"),       // Finds the closest row <tr>
                $tds = $row.find("td");             // Finds all children <td> elements

            var values = {};
            $.each($tds, function() {
                if($(this).attr('value') !== "_id"){
                    values[$(this).attr('value')] = $(this).text();
                }

        });
        printData(values);

    });
});


var checkNullUndef = function(value){
    return value == null || value === undefined ? ""  : value;
};

var printData = function(row){

    for(var key in row){
         $("#" + 'p' + key).html(row[key]);
    }
    $("#pbarcode").JsBarcode(row['PLU']);
    $("#print-section").show();
    window.print();
    $("#print-section").hide();
};

var updateTable = function(data, count){
    $tableBody.empty();
    $.each(data, function(index, item){
        $tableBody.append("<tr>" +
            "<td><input id='item-print' type='button' value='Print'/></td>" +
            "<td value='boldTitle'>" + item.lBoldTitle + "</td>" +
            "<td value='title'>" + item.lTitle + "</td>" +
            "<td value='price'>" + item.lPrice + "</td>" +
            "<td value='ingredients'>" + item.lIngredients + "</td>" +
            "<td value='usedBy'>" + makeDate(checkNullUndef(item.lUsedBy)) + "</td>" +
            "<td value='PLU'>" + item.lPLU + "</td>" +
            "<td><input id='item-select' type='checkbox' value='Print'/></td>" +
            "<td value='_id' style='display: none'>" + item._id + "</td>")
    });
    $(".loader").hide();
};

var getItems = function(number, offset, sortField, query){

    $.get("/items/get_items", {number: number, offset: offset, sortField: sortField, query: query}, function(data){
        updateTable(data.items, data.count);
        numPages = Math.ceil(data.count/number);
        numPerPage = number;
    })
};

var makeDate = function(dateString){
    var currentDt = new Date(dateString);
    if(isNaN(currentDt.getTime())){
        return '';
    }
    var mm = currentDt.getMonth() + 1;
    var dd = currentDt.getDate();
    var yyyy = currentDt.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
};

var addItem = function(){
    var values = $("#add-new-form").serializeArray();
    var items = {};
    for(var i in values){
        items[values[i].name] = values[i].value;
    }

    $.post("items/add_item", items, function(data, status){
        alert("Success");
        $('#addNew').modal('hide');
        getItems(10, 0, "lTitle")

    }).fail(function(data){
        err = JSON.parse(data.responseText);
        alert(err.error.errmsg);
    })
};

var search = function(){
    var query = $('#query-input').val();
    if(query === "" || query === undefined || query === null){
        console.log("Empty form");
    }
    else{
        getItems(numPerPage, 1, "lTitle", query);
    }
};

var deleteItems = function(){
    $('#items-table tr').filter(':has(:checkbox:checked)').each(function() {
        $tds = $(this).find("td");             // Finds all children <td> elements

        var data = [];
        $.each($tds, function() {
            if($(this).attr('value') === "_id"){
                data[data.length] = $(this).text();
            }
        });

        var ids = JSON.stringify(data);
        $.post("items/delete_items", {items: ids}, function(){
            alert("Success");
            getItems(10, 0, "lTitle")

        }).fail(function(data){
            err = JSON.parse(data.responseText);
            alert(err.error.errmsg);
        })
    });
};


