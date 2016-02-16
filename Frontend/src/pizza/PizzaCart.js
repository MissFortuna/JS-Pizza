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

//HTML element where pizzas situated
var $cart = $("#card");
var need_to_pay=0;
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
    need_to_pay += pizza[size].price;
    $("#totality").text(need_to_pay+" грн.");
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
        //TODO: ...

        var saved_pizza=Storage.get('cart');
        if(saved_pizza){
            Cart=saved_pizza;
        }

        var saved_sum=Storage.get("totality");
        if(saved_sum){
            $("#totality").text(saved_sum+" грн.");
        }

        updateCart();
    }

    function getPizzaInCart() {
        //Повертає піци які зберігаються в кошику

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
                need_to_pay += pricing;
                $("#totality").text( need_to_pay+" грн.");
                updateCart();
            });

            $node.find(".glyphicon-minus").click(function () {
                if (cart_item.quantity == 1) {
                    removeFromCart(cart_item);
                    need_to_pay -= pricing*counter;
                    $("#totality").text( need_to_pay+" грн.");
                }
                else {
                    cart_item.quantity -= 1;
                    need_to_pay -= pricing;
                    $("#totality").text( need_to_pay+" грн.");
                }
                updateCart();
            });
            $node.find(".count-clear").click(function () {
                removeFromCart(cart_item);
                need_to_pay -= pricing*counter;
                $("#totality").text( need_to_pay+" грн.");
            });

            $cart.append($node);
        }

        Cart.forEach(showOnePizzaInCart);

        var nu = $(".sidePanel").find(".allPizzasNumber").text();
        Storage.set("totality", need_to_pay);
        Storage.set("cart",Cart);
    }

$("#clear_all").click(function(){
   Cart=[];
    $cart.html("");
    need_to_pay=0;
   $("#totality").text(need_to_pay+" грн.");
    updateCart();
});


    exports.removeFromCart = removeFromCart;
    exports.addToCart = addToCart;

    exports.getPizzaInCart = getPizzaInCart;
    exports.initialiseCart = initialiseCart;

    exports.PizzaSize = PizzaSize;
