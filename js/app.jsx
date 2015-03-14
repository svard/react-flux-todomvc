import React from "react";
import Router from "react-router";
import TodoApp from "./components/TodoApp";
import MainSection from "./components/MainSection";
import TodoStore from "./stores/TodoStore";

let Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

function makeMainSection() {
    return React.createClass({
        render() {
            return (<MainSection todos={TodoStore.getAll()} />);
        }
    });
}

function makeCompletedMainSection() {
    return React.createClass({
        render() {
            return (<MainSection todos={TodoStore.getAllCompleted()} />);
        }
    });
}

function makeActiveMainSection() {
    return React.createClass({
        render () {
            return (<MainSection todos={TodoStore.getAllActive()} />);
        }
    });
}

var routes = 
    <Route name="app" path="/" handler={TodoApp}>
        <Route name="completed" path="/completed" handler={makeCompletedMainSection()} />
        <Route name="active" path="/active" handler={makeActiveMainSection()} />
        <DefaultRoute handler={makeMainSection()} />
    </Route>

Router.run(routes, Handler => {
    React.render(<Handler />, document.getElementById("todoapp"));
});