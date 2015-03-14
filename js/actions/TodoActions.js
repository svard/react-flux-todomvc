import AppDispatcher from "../dispatcher/AppDispatcher";

export default {
    create(text) {
        AppDispatcher.handleViewAction({
            actionType: "TODO_CREATE",
            text: text
        });
    },

    destroy(id) {
        AppDispatcher.handleViewAction({
            actionType: "TODO_DESTROY",
            id: id
        });
    },

    edit(id, text) {
        AppDispatcher.handleViewAction({
            actionType: "TODO_EDIT",
            id: id,
            text: text
        });
    },

    toggleComplete(id) {
        AppDispatcher.handleViewAction({
            actionType: "TODO_TOGGLE_COMPLETE",
            id: id
        });
    },

    toggleAllCompleted(complete) {
        AppDispatcher.handleViewAction({
            actionType: "TODO_TOGGLE_ALL_COMPLETED",
            complete: complete 
        });        
    },

    clearCompleted() {
        AppDispatcher.handleViewAction({
            actionType: "TODO_CLEAR_COMPLETED"
        });        
    }
};