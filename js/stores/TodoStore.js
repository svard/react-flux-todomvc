var AppDispatcher = require("../dispatcher/AppDispatcher"),
    EventEmitter = require("events").EventEmitter,
    Immutable = require("immutable"),
    assign = require("object-assign");

var CHANGE_EVENT = "change";

var _todos = Immutable.OrderedMap(),
    TodoRecord = Immutable.Record({
        id: 0,
        text: "",
        complete: false
    });

function create(text) {
    var id = Date.now();

    _todos = _todos.set(id, new TodoRecord({
        id: id,
        text: text
    }));
}

function destroy(id) {
    _todos = _todos.delete(id);
}

function edit(id, text) {
    _todos = _todos.setIn([id, "text"], text);
}

function toggle(id) {
    _todos = _todos.updateIn([id, "complete"], function (complete) {
        return !complete;
    });
}

function toggleAll(complete) {
    _todos = _todos.map(function (todo) {
        return todo.set("complete", complete);
    });
}

function clearCompleted() {
    _todos = _todos.filterNot(function (todo) {
        return todo.complete;
    });
}


var TodoStore = assign({}, EventEmitter.prototype, {
    getAll: function () {
        return _todos;
    },

    getAllCompleted: function () {
        return _todos.filter(function (todo) {
            return todo.complete;
        });
    },

    getAllActive: function () {
        return _todos.filterNot(function (todo) {
            return todo.complete;
        });        
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case "TODO_CREATE":
            if (action.text !== "") {
                create(action.text.trim());
                TodoStore.emitChange();
            }
            break;

        case "TODO_DESTROY":
            destroy(action.id);
            TodoStore.emitChange();
            break;

        case "TODO_EDIT":
            edit(action.id, action.text);
            TodoStore.emitChange();
            break;        

        case "TODO_TOGGLE_COMPLETE":
            toggle(action.id);
            TodoStore.emitChange();
            break;

        case "TODO_TOGGLE_ALL_COMPLETED":
            toggleAll(action.complete);
            TodoStore.emitChange();
            break;

        case "TODO_CLEAR_COMPLETED":
            clearCompleted();
            TodoStore.emitChange();

        default:        
    }

    return true;
});

module.exports = TodoStore;