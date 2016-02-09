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

//array of busket
var Cart = [];

//HTML element where pizzas situated
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом

        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });


    //add total price of pizzas
    //Оновити вміст кошика на сторінці
    updateCart();
}


    //Після видалення оновити відображення
    function removeFromCart(cart_item) {
        //Видалити піцу з кошика
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
        //$node.find(".remove").click(function(){
        $node.remove();
        //})
        //be very careful!
        Cart.splice(Cart.indexOf(cart_item), 1);

        //Після видалення оновити відображення
        updateCart();
    }

    function initialiseCart() {
        //Фукнція віпрацьвуватиме при завантаженні сторінки
        //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
        //TODO: ...

        //using local starage for nodes
        //localStorage.setItem("lastname", "Smith");
        //document.getElementById("result").innerHTML = localStorage.getItem("lastname");

        var saved_pizza = Storage.get('cart');
        if (saved_pizza) {
            Cart = saved_pizza;
        }
        var saved_number = Storage.get("number_sidePanel");
        if (saved_number) {
            $(".sidePanel").find(".allPizzasNumber").text(saved_number)
        }

        updateCart();
    }

    function getPizzaInCart() {
        //Повертає піци які зберігаються в кошику

        return Cart;
    }

    function updateCart() {
        //Функція викликається при зміні вмісту кошика
        //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

        //localStorage.setItem("lastname", "Smith");
        //document.getElementById("result").innerHTML = localStorage.getItem("lastname");

        //Очищаємо старі піци в кошику
        $cart.html("");

        //Онволення однієї піци
        function showOnePizzaInCart(cart_item) {
            var html_code = Templates.PizzaCart_OneItem(cart_item);

            var $node = $(html_code);

//            $node.find(".plus").click(function () {
//                cart_item.quantity += 1;
//                updateCart();
//            });
//
//            $node.find(".minus").click(function () {
//                if (cart_item.quantity == 1) {
//                    removeFromCart(cart_item);
//                }
//                else {
//                    cart_item.quantity -= 1;
//                }
//                updateCart();
//            });
//            $node.find(".remove").click(function () {
//                removeFromCart(cart_item)
//            });

            $cart.append($node);
        }

        Cart.forEach(showOnePizzaInCart);
        Storage.set("cart", Cart);
    }

    exports.removeFromCart = removeFromCart;
    exports.addToCart = addToCart;

    exports.getPizzaInCart = getPizzaInCart;
    exports.initialiseCart = initialiseCart;

    exports.PizzaSize = PizzaSize;
