/**
 * Created by q.fu on 22.11.2017.
 */
function setting() {
    this.save_config = function (data, config, fn, errorfn,logger) {
        config.language = data.language;
        config.connectionstring = data.connectionstring;
        var str = 'var config = ' + JSON.stringify(config) + ";\n" + 'module.exports = config;';
        var fs = require('fs');
        fs.writeFile("config.js", str, function (err) {
            if (err) {
                errorfn(err);
            }
            fn('OK');
        });
    };
    this.load_config = function (data, config, fn, errorfn,logger) {
        fn(config);
    };
}
module.exports = new setting();