/**
 * Created by chaika on 09.02.16.
 */
exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'Вибір Піци',
        ShowOrderButton:false
    });
};

exports.orderPage = function(req, res) {
    //TODO: implement
    res.render('orderPage', {
        pageTitle: 'Замовлення',
        ShowOrderButton:true
    });
};