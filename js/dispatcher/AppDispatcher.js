import Dispatcher from "./Dispatcher";
import assign from "object-assign";

export default assign({}, Dispatcher.prototype, {
    handleViewAction(action) {
        this.dispatch({
            source: "VIEW_ACTION",
            action: action
        });
    }
});