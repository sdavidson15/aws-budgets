import Formatters from './../model/Formatters';

var RestApp = (function () {
    var GetAccountBudgets = function () {
        // var req = new XMLHttpRequest()
        // req.open("GET", "/accountbudgets")
        // req.send();

        // return JSON.parse(req.responseText);
        return [
            Formatters.formatAccountBudgetsData(0, '012345678901', 'Monthly AWS Budget Alert io-example 012345678901', 1000, 767.72, 788.99, [])
        ];
    };

    return {
        GetAccountBudgets: GetAccountBudgets
    };
}());

export default RestApp;