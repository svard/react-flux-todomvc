import assign from "object-assign";
    
let _callbacks = [],
    _promises = [];

let Dispatcher = function () {};

Dispatcher.prototype = assign({}, Dispatcher.prototype, {
    register(callback) {
        _callbacks.push(callback);
        return _callbacks.length - 1;
    },

    dispatch(payload) {
        var resolves = [],
            rejects = [];

        _promises = _callbacks.map((_, i) => {
            return new Promise((resolve, reject) => {
                resolves[i] = resolve;
                rejects[i] = reject;
            });
        });

        _callbacks.forEach((callback, i) => {
            Promise.resolve(callback(payload)).then(() => {
                resolves[i](payload);
            }, () => {
                rejects[i](new Error("Dispatcher callback unsuccessful"));
            });
        });

        _promises = [];
    }
});

export default Dispatcher;