import React from "react";
import TodoTextInput from "./TodoTextInput";
import TodoActions from "../actions/TodoActions";

export default React.createClass({
    render() {
        return <header id="header">
                    <h1>todos</h1>
                    <TodoTextInput
                        id="new-todo"
                        placeholder="What needs to be done?"
                        onSave={this._onSave} />
                </header>
    },

    _onSave(value) {
        TodoActions.create(value);
    }
});