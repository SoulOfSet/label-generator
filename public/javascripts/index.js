$( document ).ready(function() {
    $(".loader").show();

    $.get("/items/get_items", {number: 10, offset: 0, sortField: "lTitle"}, function(data){
        console.log(data);
    })
});

var updateTable = function(data){

};