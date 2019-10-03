var RestApp = (function () {
    var GetAccountBudgets = function () {
        // var req = new XMLHttpRequest()
        // req.open("GET", "/accountbudgets")
        // req.send();

        // return JSON.parse(req.responseText);
        return [];
    };

    return {
        GetAccountBudgets: GetAccountBudgets
    };
}());

export default RestApp;