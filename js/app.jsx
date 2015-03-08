var React = require("react"),
    Router = require("react-router"),
    TodoApp = require("./components/TodoApp"),
    MainSection = require("./components/MainSection"),
    TodoStore = require("./stores/TodoStore"),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

function makeMainSection() {
    return React.createClass({
        render: function () {
            return (<MainSection todos={TodoStore.getAll()} />);
        }
    });
}

function makeCompletedMainSection() {
    return React.createClass({
        render: function () {
            return (<MainSection todos={TodoStore.getAllCompleted()} />);
        }
    });
}

function makeActiveMainSection() {
    return React.createClass({
        render: function () {
            return (<MainSection todos={TodoStore.getAllActive()} />);
        }
    });
}

var routes = (
    <Route name="app" path="/" handler={TodoApp}>
        <Route name="completed" path="/completed" handler={makeCompletedMainSection()} />
        <Route name="active" path="/active" handler={makeActiveMainSection()} />
        <DefaultRoute handler={makeMainSection()} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.getElementById("todoapp"));
});