/**
 * Created by q.fu on 15.09.2017.
 */
(function (factory) {
    factory();
})(
    function () {
        Date.prototype.getWeek = function () {
            var date = new Date(this.getTime());
            date.setHours(0, 0, 0, 0);
            // Thursday in current week decides the year.
            date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
            // January 4 is always in week 1.
            var week1 = new Date(date.getFullYear(), 0, 4);
            // Adjust to Thursday in week 1 and count number of weeks from date to week1.
            return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
            - 3 + (week1.getDay() + 6) % 7) / 7);
        };
        function isFileType(name, fileTypes) {
            var ps = '';
            if (angular.isArray(fileTypes))
                ps = "(" + fileTypes.join('|') + ")$";
            else {
                fileTypes = fileTypes.replace(/\,/g, '|');
                ps = "(" + fileTypes + ")$";
            }
            //var patt = /^\S+(.pdf|.png|.jpg)$/i;
            var patt = new RegExp(ps, "i");
            return patt.test(name);
        }

        function isImage(name) {
            var fileTypes = root.uploadImgtype;
            return isFileType(name, fileTypes);
        }

        function getImageSize(url) {
            var img = $('<img>').appendTo("body")
                .attr({'src': url, 'style': 'display:none;'});
            var imgElement = img.get();
            var size = {width: imgElement[0].width, height: imgElement[0].height};
            img.remove();
            return size;
        }

        function convertLanguageKey(str) {
            if (str.indexOf('_') > 0) {
                var strs = str.split('_');
                str = strs[0] + '-' + strs[1].toUpperCase();
            }
            return str;
        }

        angular.module('app.help', [])
            .service('appScreen', function () {
                return {
                    height: function () {
                        var body = document.body,
                            html = document.documentElement;
                        return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                    }
                }
            })
            .service('server', ['$http', function ($http) {
                this.updateObj = function (obj) {
                    var o = {};
                    if (typeof obj !== "object")
                        return o;
                    if (obj)
                        o = angular.extend(o, obj);
                    return o;
                };
                this.load = function (cn, m, params) {
                    var str = 'load/' + cn + '/' + m;
                    if (typeof params == "undefined")
                        return $http.get(str, {});
                    var para = this.updateObj(params);
                    var s = 1;
                    for (var k in para) {
                        if (s == 1) {
                            str += '?' + k + "=" + para[k];
                            s = 0;
                        } else
                            str += '&' + k + "=" + para[k];
                    }
                    return $http.get(str, {});
                };

                this.save = function (cn, m, data) {
                    var para = {'cn': cn, "m": m, 'data': data};
                    return $http.post("save", para, {});
                };

            }])
            .provider('tFilter', function () {
                this.$get = function () {
                    return function (str, language, list) {
                        var nstr = '';
                        if (angular.isArray(list) && 'keyword' == language) {
                            nstr = getDescriptionWithkeyword(str, list);
                        }
                        else if (angular.isString(language) && language.length > 1) {
                            language = convertLanguageKey(language);
                            nstr = Globalize(language).localize(str);
                        }
                        else
                            nstr = Globalize.localize(str);
                        if (!nstr)
                            nstr = str;
                        return nstr;
                    };
                };
            })
            .provider('formatFilter', function () {
                this.$get = function () {
                    return function (str, formatStr, language) {
                        if (angular.isString(language) && language.length > 1) {
                            language = convertLanguageKey(language);
                            return Globalize(language).format(str, formatStr);
                        }
                        else
                            return Globalize.format(str, formatStr);
                    };
                };
            })
        ;

    }
);