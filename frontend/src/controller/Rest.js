var RestApp = (function () {
    var restApiUrl = 'http://' + window.location.hostname + ':8000',
    
    GetAccountBudgets = function () {
        return makeRequest('GET', '/accountbudgets');
    },

    UpdateAccountBudgets = function (budgets) {
        return makeRequest('PUT', '/updateaccountbudgets', budgets);
    },

    makeRequest = function(method, path, data=null) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(method, restApiUrl.concat(path), true);
            req.onload = function () {
                if (req.status === 200) {
                    var resp = JSON.parse(req.responseText);
                    resolve(resp);
                } else if (req.status === 500) {
                    alert('Something went wrong. Continue to reload.');
                    window.location.reload();
                } else {
                    reject(req.status);
                }
            };
            if (data === null) req.send();
            else req.send(JSON.stringify(data));
        });
    };

    return {
        GetAccountBudgets: GetAccountBudgets,
        UpdateAccountBudgets: UpdateAccountBudgets,
    };
}());

export default RestApp;