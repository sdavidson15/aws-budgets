var RestApp = (function () {
    var restApiUrl = 'http://' + window.location.hostname + ':8000',
    
    GetAccountBudgets = function () {
        return makeRequest('GET', '/accountbudgets');
    },

    makeRequest = function(method, path) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(method, restApiUrl.concat(path), true);
            req.onload = function () {
                if (req.status === 200) {
                    var resp = JSON.parse(req.responseText);
                    resolve(resp);
                }
                else
                    reject(req.status);
            };
            req.send();
        });
    };

    return {
        GetAccountBudgets: GetAccountBudgets
    };
}());

export default RestApp;