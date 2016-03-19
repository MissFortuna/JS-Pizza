/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage=require('../Storage');


//Sizes
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

var Cart = [];
var total=0;

//HTML element where pizzas situated
var $cart = $("#card");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    var add_new=true;
    for( var a=0;a<Cart.length;a++){
        if((pizza===Cart[a].pizza)&&(size===Cart[a].size)) {
            Cart[a].quantity += 1;
            add_new=false;
        }
    }
    if(add_new===true){
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }

    //Оновити вміст кошика на сторінці
    total += pizza[size].price;
    $("#totality").text(total+" грн.");
    updateCart();
}


//Після видалення оновити відображення
function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    var html_code = Templates.PizzaCart_OneItem(cart_item);

    var $node = $(html_code);
    $node.find(".count-clear").click(function(){
        $node.remove();
    });
    Cart.splice(Cart.indexOf(cart_item), 1);
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    var saved_pizza=Storage.get('cart');
    if(saved_pizza){
        Cart=saved_pizza;
    }

    var saved_sum=Storage.get('totality');
    if(saved_sum){
        $("#totality").text(saved_sum+" грн.");
        total=parseInt($("#totality").text());
    }

    updateCart();
}

function getPizzaInCart() {
    return Cart;
}


function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміcт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        var $node = $(html_code);
        var pricing=parseInt($node.find(".pricing").text());
        var counter=parseInt($node.find("#quantity").text());

        $node.find(".glyphicon-plus").click(function () {
            cart_item.quantity += 1;
            total += pricing;
            $("#totality").text(total+" грн.");
            updateCart();
        });

        $node.find(".glyphicon-minus").click(function () {
            if (cart_item.quantity == 1) {
                removeFromCart(cart_item);
                total -= pricing*counter;
            }
            else {
                cart_item.quantity -= 1;
                total -= pricing;
            }
            $("#totality").text(total+" грн.");
            updateCart();
        });
        $node.find(".count-clear").click(function () {
            removeFromCart(cart_item);
            total -= pricing*counter;
            $("#totality").text(total+" грн.");
            updateCart();
        });

        var url=window.location.toString();

        if(url.indexOf('/order.html')+1){
            $node.find('.mms').hide();
            $node.find('.mmp').hide();
            $node.find('.count-clear').hide();
            $("#clear_all").hide();
            $('.pay-me').hide();
            $('.edit-me').show();
        }
        else{
            $node.find('.mms').show();
            $node.find('.mmp').show();
            $node.find('.count-clear').show();
            $("#clear_all").show();
            $('.pay-me').show();
            $('.edit-me').hide();
        }

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    Storage.set("totality",total);
    Storage.set("cart",Cart);
}

$("#clear_all").click(function(){
    Cart=[];
    $cart.html("");
    total=0;
    $("#totality").text(total+" грн.");
    updateCart();

});

$(".pay-me").click(function(){
    window.location = "/order.html";
});

$(".edit-me").click(function(){
    window.location="/";
});
exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
