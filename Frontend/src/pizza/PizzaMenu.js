/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");


    //Онволення однієї піци
    function showPizzaList(list) {
        //Очищаємо старі піци в кошику
        $pizza_list.html("");

        //Онволення однієї піци
        function showOnePizza(pizza) {
            var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

            var $node = $(html_code);
            //var need_to_pay=0;

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
    var total_in_type=0;
            if (filter === "all")pizza_shown = Pizza_List;
            else if (filter === "vega") {
                Pizza_List.forEach(function (pizza) {
                    if (pizza.type === 'Вега') {
                        pizza_shown.push(pizza);
                        total_in_type++;
                    }
                });
            }
            else if (filter === "meat") {
                Pizza_List.forEach(function (pizza) {
                    if (pizza.type === 'М’ясна піца'){
                        pizza_shown.push(pizza);
                        total_in_type++;
                    }
                });
            }
            else if (filter === "pineapple") {
                Pizza_List.forEach(function (pizza) {
                    if (pizza.content.pineapple){
                        pizza_shown.push(pizza);
                        total_in_type++;
                    }
                });
            }

            else if (filter === "mushroom") {
                Pizza_List.forEach(function (pizza) {
                    if (pizza.content.mushroom){
                        pizza_shown.push(pizza);
                        total_in_type++;
                    }
                });
            }

            else if (filter === "ocean") {
                Pizza_List.forEach(function (pizza) {
                    if (pizza.content.ocean){
                        pizza_shown.push(pizza);
                        total_in_type++;
                    }
                });
            }
    showPizzaList(pizza_shown);

}


$("#all").click(function(){
    $(".allPizzas").text("Усі піцци:"+8);
  //  $("#IK").text(5);
    filterPizza('all');
});

$("#meat").click(function(){
   $(".allPizzas").text("М'ясні піци:"+5);
    filterPizza("meat");
});


$("#pineapple").click(function(){
    $(".allPizzas").text("Піци з ананасами:"+3);
    filterPizza('pineapple');
});


$("#mushroom").click(function(){
    $(".allPizzas").text("Піци з грибами:"+3);
    filterPizza('mushroom');
});


$("#ocean").click(function(){
    $(".allPizzas").text("Піци з морепродуктами:"+2);
    filterPizza('ocean');
});


$("#vega").click(function(){
    $(".allPizzas").text("Вегетаріанські піци:"+1);
    filterPizza('vega');
});




function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;