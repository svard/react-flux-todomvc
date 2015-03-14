import AppDispatcher from "../dispatcher/AppDispatcher";
import {EventEmitter} from "events";
import Immutable from "immutable";
import assign from "object-assign";

const CHANGE_EVENT = "change";

let _todos = Immutable.OrderedMap(),
    TodoRecord = Immutable.Record({
        id: 0,
        text: "",
        complete: false
    });

function create(text) {
    let id = Date.now();

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
    _todos = _todos.updateIn([id, "complete"], complete => {
        return !complete;
    });
}

function toggleAll(complete) {
    _todos = _todos.map(todo => {
        return todo.set("complete", complete);
    });
}

function clearCompleted() {
    _todos = _todos.filterNot(todo => {
        return todo.complete;
    });
}


let TodoStore = assign({}, EventEmitter.prototype, {
    getAll() {
        return _todos;
    },

    getAllCompleted() {
        return _todos.filter(todo => {
            return todo.complete;
        });
    },

    getAllActive() {
        return _todos.filterNot(todo => {
            return todo.complete;
        });        
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(payload => {
    let action = payload.action;

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

export default TodoStore;