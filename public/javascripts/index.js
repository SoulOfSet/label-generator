var $tableBody;
var numPages;
var numPerPage = 10;
var currPage = 1;

$( document ).ready(function() {
    $tableBody = $('#items-table').find("tbody");
    $(".loader").show();
    getItems(10, 0, "lTitle");

    $("#items-table").on('click', '#item-print', function (data) {
        var $row = $(this).closest("tr"),       // Finds the closest row <tr>
            $tds = $row.find("td");             // Finds all children <td> elements

        var values = {};
        $.each($tds, function() {
            if($(this).attr('value') !== undefined){
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
            "<td style='display: none'>" + item._id + "</td>")
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


