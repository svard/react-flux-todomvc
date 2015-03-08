var React = require("react/addons"),
    PureRenderMixin = React.addons.PureRenderMixin,
    TodoListItem = require("./TodoItem"),
    TodoActions = require("../actions/TodoActions"),
    ReactPropTypes = React.PropTypes;

var MainSection = React.createClass({
    mixins: [PureRenderMixin],
    
    propTypes: {
        todos: ReactPropTypes.object.isRequired
    },

    render: function () {
        var todos = [];

        if (this.props.todos.size < 1) {
            return null;
        }

        this.props.todos.forEach(function (todo) {
            todos.push(<TodoListItem key={todo.id} todo={todo} />);
        });

        return (
            <section id="main">
                <input 
                    id="toggle-all" 
                    type="checkbox"
                    onChange={this._onChange} />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul id="todo-list">{todos}</ul>
            </section>
        );
    },

    _onChange: function (event) {
        TodoActions.toggleAllCompleted(event.target.checked);
    }
});

module.exports = MainSection;