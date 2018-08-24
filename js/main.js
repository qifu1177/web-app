/**
 * Created by q.fu on 15.09.2017.
 */
(function (fn, a, w) {
    fn(a, w);
})(function (a, w) {
    var self = {};
    w.root = {};
    root.setGlobalizeCulture = function (str) {
        if (str.indexOf('_') > 0) {
            var strs = str.split('_');
            str = strs[0] + '-' + strs[1].toUpperCase();
        }
        Globalize.culture(str);
    };
    self.init = function () {
        /*if(typeof config !="undefined")
            root.setGlobalizeCulture(config.language);
        else
            root.setGlobalizeCulture("en-US");*/
        root.control = a.module('app.control', ['app.help']);
        root.control.config(['$controllerProvider', function ($controllerProvider) {
            /*Creating a more synthesized form of service of $ controllerProvider.register*/
            root.control.registerCtrl = $controllerProvider.register;
        }]);
    };
    self.init();

}, angular, window)