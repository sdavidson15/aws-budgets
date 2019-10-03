import Formatters from './../model/Formatters';

var RestApp = (function () {
    var GetAccountBudgets = function () {
        // var req = new XMLHttpRequest()
        // req.open("GET", "/accountbudgets")
        // req.send();
        //
        // return JSON.parse(req.responseText);

        jsonString = '[{"AccountId":"12345678901","BudgetName":"Monthly AWS Budget io-example 012345678901","BudgetAmount":1000,"CurrentSpend":80.271,"ForecastedSpend":928.309,"BudgetHistory":[{"Oct 2018":1341.6929034101},{"Nov 2018":1115.2895790472},{"Dec 2018":1275.5580376787},{"Jan 2019":357.5720840603},{"Feb 2019":170.1858490943},{"Mar 2019":191.5292855813},{"Apr 2019":412.8101261191},{"May 2019":385.7035050857},{"Jun 2019":399.7783428706},{"Jul 2019":446.476819497},{"Aug 2019":554.9417428173},{"Sep 2019":788.3058580062}]},{"AccountId":"01928374651","BudgetName":"Monthly AWS Budget io-mock 01928374651","BudgetAmount":1000,"CurrentSpend":80.271,"ForecastedSpend":928.309,"BudgetHistory":[{"Oct 2018":1341.6929034101},{"Nov 2018":1115.2895790472},{"Dec 2018":1275.5580376787},{"Jan 2019":357.5720840603},{"Feb 2019":170.1858490943},{"Mar 2019":191.5292855813},{"Apr 2019":412.8101261191},{"May 2019":385.7035050857},{"Jun 2019":399.7783428706},{"Jul 2019":446.476819497},{"Aug 2019":554.9417428173},{"Sep 2019":788.3058580062}]},{"AccountId":"56473829101","BudgetName":"Monthly AWS Budget io-dummy 56473829101","BudgetAmount":500,"CurrentSpend":17.562,"ForecastedSpend":97.723,"BudgetHistory":[{"Oct 2018":168.9404204657},{"Nov 2018":52.1018288736},{"Dec 2018":37.4018701709},{"Jan 2019":125.7457572174},{"Feb 2019":110.4206228626},{"Mar 2019":88.5922547753},{"Apr 2019":223.5907487246},{"May 2019":79.5709528803},{"Jun 2019":49.1750958589},{"Jul 2019":44.0490313481},{"Aug 2019":43.7490914808},{"Sep 2019":57.7509120721}]}]';
        return JSON.parse(jsonString);
    };

    return {
        GetAccountBudgets: GetAccountBudgets
    };
}());

export default RestApp;