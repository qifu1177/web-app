/**
 * Created by q.fu on 22.11.2017.
 */

function data() {
    this.load_test = function (data, config, fn, errorFn, logger) {
        try{
            console.log("dt=" + data.dt);
            fn({val: Math.random(data.dt)})
        }catch (ex){
            errorFn(ex)
        }

    };
}
module.exports = new data();