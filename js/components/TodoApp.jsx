var React = require("react"),
    Router = require("react-router"),
    Header = require("./Header"),
    Footer = require("./Footer"),
    TodoStore = require("../stores/TodoStore"),
    RouteHandler = Router.RouteHandler;

function getAllTodos() {
    return {
        allTodos: TodoStore.getAll()
    };
}

var TodoApp = React.createClass({
    getInitialState: function () {
        return getAllTodos();
    },

    componentDidMount: function () {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        TodoStore.removeChangeListener(this._onChange);
    },

    render: function () {
        return (
            <div>
                <Header />
                <RouteHandler />
                <Footer
                    todos={this.state.allTodos} />
            </div>
        );
    },

    _onChange: function () {
        this.setState(getAllTodos());
    }
});

module.exports = TodoApp;