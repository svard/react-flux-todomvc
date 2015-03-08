var AppDispatcher = require("../dispatcher/AppDispatcher");

var TodoActions = {
    create: function (text) {
        AppDispatcher.handleViewAction({
            actionType: "TODO_CREATE",
            text: text
        });
    },

    destroy: function (id) {
        AppDispatcher.handleViewAction({
            actionType: "TODO_DESTROY",
            id: id
        });
    },

    edit: function (id, text) {
        AppDispatcher.handleViewAction({
            actionType: "TODO_EDIT",
            id: id,
            text: text
        });
    },

    toggleComplete: function (id) {
        AppDispatcher.handleViewAction({
            actionType: "TODO_TOGGLE_COMPLETE",
            id: id
        });
    },

    toggleAllCompleted: function (complete) {
        AppDispatcher.handleViewAction({
            actionType: "TODO_TOGGLE_ALL_COMPLETED",
            complete: complete 
        });        
    },

    clearCompleted: function () {
        AppDispatcher.handleViewAction({
            actionType: "TODO_CLEAR_COMPLETED"
        });        
    }
};

module.exports = TodoActions;