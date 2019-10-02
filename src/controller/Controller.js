import AppState from './State'

var Controller = (function () {
    var dummy,

        init = function () {
            AppState.init();
        };

    return {
        init: init
    };
}());

export default Controller;