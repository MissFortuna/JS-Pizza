/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        function filterPizza(filter) {
            //Масив куди потраплять піци які треба показати
            var pizza_shown = [];
            if (filter === "all") pizza_shown = Pizza_List;
            else if (filter === "vega") {
                Pizza_List.forEach(function (pizza) {
                    if (pizza.type === 'Ліза') pizza_shown.push(pizza);
                });
            }
            else if (filter === "meat") {
                Pizza_List.forEach(function (pizza) {
                    if (pizza.type === 'М`ясна піца') pizza_shown.push(pizza);
                });
            }
            else if (filter === "pineapple") {
                Pizza_List.forEach(function (pizza) {
                    if (typeof pizza.content.pineapple) pizza_shown.push(pizza);
                });
            }

            else if (filter === "mushroom") {
                Pizza_List.forEach(function (pizza) {
                    if (pizza.content.mushroom) pizza_shown.push(pizza);
                });
            }

            else if (filter === "ocean") {
                Pizza_List.forEach(function (pizza) {
                    if (pizza.content.ocean) pizza_shown.push(pizza);
                });
            }
        }
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}


$("#all").click(function(){
//    $pizza_list.html("");
//    $("#title").text("Усі піци");
//    $("#titleNumber").text("8");
    initialiseMenu();
});

$("#meat").click(function(){
//   $("#all").addClass("pizzaType");
//    $pizza_list.html("");
//    $("#title").text("М'ясні піци");
//    $("#titleNumber").text("5");
    filterPizza('meat');
});


$("#pineapple").click(function(){
//    $("#all").addClass(".pizzaType");
//    $pizza_list.html("");
//    $("#title").text("Піци з ананасами");
//    $("#titleNumber").text("3");
    filterPizza('pineapple');
});


$("#mushroom").click(function(){
//    $("#all").addClass("pizzaType");
//    $pizza_list.html("");
//    $("#title").text("Піци з грибами");
//    $("#titleNumber").text("3");
    filterPizza('mushroom');
});


$("#ocean").click(function(){
//    $("#all").addClass("pizzaType");
//    $pizza_list.html("");
//    $("#title").text("Піци з морепродуктами");
//    $("#titleNumber").text("2");
    filterPizza('ocean');
});


$("#vega").click(function(){
    $("#all").addClass("pizzaType");
    $pizza_list.html("");
    $("#title").text("Вегетаріанські піци");
    $("#titleNumber").text("1");
    filterPizza('vega');
});




function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;