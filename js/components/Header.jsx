var React = require("react"),
    TodoTextInput = require("./TodoTextInput"),
    TodoActions = require("../actions/TodoActions");

var Header = React.createClass({
    render: function () {
        return (
            <header id="header">
                <h1>todos</h1>
                <TodoTextInput
                    id="new-todo"
                    placeholder="What needs to be done?"
                    onSave={this._onSave} />
            </header>
        );
    },

    _onSave: function (value) {
        TodoActions.create(value);
    }
});

module.exports = Header;