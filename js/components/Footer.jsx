var React = require("react/addons"),
    PureRenderMixin = React.addons.PureRenderMixin,
    Router = require("react-router"),
    Link = Router.Link,
    TodoActions = require("../actions/TodoActions"),
    ReactPropTypes = React.PropTypes;

var Footer = React.createClass({
    mixins: [PureRenderMixin],
    
    propTypes: {
        todos: ReactPropTypes.object.isRequired
    },

    render: function () {
        var itemLeft = this.props.todos.reduce(function (sum, todo) {
            if (!todo.complete) {
                return sum + 1;
            }

            return sum;
        }, 0);

        return (
            <footer id="footer">
                <span id="todo-count"><strong>{itemLeft}</strong> item left</span>
                <ul id="filters">
                    <li>
                        <Link to="app">All</Link>
                    </li>
                    <li>
                        <Link to="completed">Completed</Link>
                    </li>
                    <li>
                        <Link to="active">Active</Link>
                    </li>
                </ul>
                <button 
                    id="clear-completed"
                    onClick={this._onClick}>
                </button>
            </footer>
        );
    },

    _onClick: function () {
        TodoActions.clearCompleted();
    }
});

module.exports = Footer;