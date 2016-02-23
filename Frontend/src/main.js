/**
 * Created by chaika on 25.01.16.
 */

$(function() {
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    //var html_element
    //var map=

    var API = require('./API');

    API.getPizzaList(function(err, pizza_list){
if(err){
    return console.error(err);
}
        console.log("Pizza List", pizza_list);
        PizzaCart.initialiseCart();
        PizzaMenu.initialiseMenu();
    });

    $(".pay-me").click(function(){
        window.location = "/order.html";

//
//phone: "Phone",
//pizza: Cart.getPizzaInCart()
// function (err, result){
//if(err)
// alert("Can`t create order");
// else{
//        LiqPayCheckout.init({
//            data:result.data,
//            signature:result.signature,
//            embedTo: "#liqpay",
//            mode: "popup" // embed || popup
//        }).on("liqpay.callback", function(data){
//            console.log(data.status);
//            console.log(data);
//        }).on("liqpay.ready", function(data){
//            // ready
//        }).on("liqpay.close", function(data){
//            // close
//        });
    });



    google.maps.event.addDomListener(
        window,
        'load',
        initialize);
    require('./GoogleMap');
});

//


